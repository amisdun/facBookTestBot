import mongoose from "mongoose";
import sinon from "sinon";
import { Message, User } from "../models/index.js";
import { UUID } from "bson";
import request from "request";
import { differenceInCalendarDays, parseISO, setYear, getYear } from "date-fns";
import { handleWebHookEvent } from "../services/index.js";
import requestApi from "supertest";
import app from "../server.js";
import { config } from "dotenv";
config();

describe("Facebook Test Bot", () => {
  const senderId = new UUID();
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterEach(function () {
    sinon.restore();
  });

  it("Should return 'What is your First Name' if 'message.text === hi'", async () => {
    const user = new User({ user: senderId.toHexString() });
    const newMessage = await Message.create({ message: "hi" });
    user.messages.push(newMessage);
    await user.save();
    sinon.mock(User).expects("findOne").returns(user);
    sinon.mock(Message).expects("create").returns(newMessage);
    sinon.mock(User).expects("findOneAndUpdate").returns(true);
    const response = sinon.replace(
      request,
      "post",
      sinon.fake.returns({ text: "What is your First Name?" })
    );
    const body = {
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: senderId.toHexString(),
              },
              message: { text: "hi" },
              postback: null,
            },
          ],
        },
      ],
    };
    handleWebHookEvent(body);
    expect(response().text).toBe("What is your First Name?");
  });

  it("Should return 'What is your date of birth? Please Provide in this format YYYY-MM-DD' if 'message.text is not of type date'", async () => {
    const newMessage = await Message.create({ message: "mikel" });
    const userFound = await User.findOneAndUpdate(
      { user: senderId.toHexString() },
      { userName: "mikel", $push: { messages: [newMessage?._id] } },
      { new: true }
    );
    sinon.mock(User).expects("findOne").returns(userFound);
    sinon.mock(Message).expects("create").returns(newMessage);
    sinon.mock(User).expects("findOneAndUpdate").twice().returns(true);
    const response = sinon.replace(
      request,
      "post",
      sinon.fake.returns({
        text: "What is your date of birth? Please Provide in this format YYYY-MM-DD",
      })
    );
    const body = {
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: senderId.toHexString(),
              },
              message: { text: "mikel" },
              postback: null,
            },
          ],
        },
      ],
    };
    handleWebHookEvent(body);
    expect(response().text).toBe(
      "What is your date of birth? Please Provide in this format YYYY-MM-DD"
    );
  });

  it("Should return 'Do you want to know how many days to your birthday?' if 'message.text is of type date'", async () => {
    const newMessage = await Message.create({ message: "1997-02-25" });
    const userFound = await User.findOneAndUpdate(
      { user: senderId.toHexString() },
      {
        dateOfBirth: parseISO("1997-02-25"),
        $push: { messages: [newMessage?._id] },
      },
      { new: true }
    );
    sinon.mock(User).expects("findOne").returns(userFound);
    sinon.mock(Message).expects("create").returns(newMessage);
    sinon.mock(User).expects("findOneAndUpdate").twice().returns(true);
    const response = sinon.replace(
      request,
      "post",
      sinon.fake.returns({
        text: "Do you want to know how many days to your birthday?",
      })
    );
    const body = {
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: senderId.toHexString(),
              },
              message: { text: "1997-02-25" },
              postback: null,
            },
          ],
        },
      ],
    };
    handleWebHookEvent(body);
    expect(response().text).toBe(
      "Do you want to know how many days to your birthday?"
    );
  });

  it("Should return 'Days to your birthday?' if 'responded with yes'", async () => {
    const newMessage = await Message.create({ message: "yes" });
    const userFound = await User.findOneAndUpdate(
      { user: senderId.toHexString() },
      {
        $push: { messages: [newMessage?._id] },
      },
      { new: true }
    );
    sinon.mock(User).expects("findOne").returns(userFound);
    sinon.mock(Message).expects("create").returns(newMessage);
    sinon.mock(User).expects("findOneAndUpdate").returns(true);
    const response = sinon.replace(
      request,
      "post",
      sinon.fake.returns({
        text: `There are ${differenceInCalendarDays(
          setYear(userFound.dateOfBirth, getYear(new Date())),
          new Date()
        )} days left until your next birthday`,
      })
    );
    const body = {
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: senderId.toHexString(),
              },
              message: null,
              postback: { payload: "yes" },
            },
          ],
        },
      ],
    };
    handleWebHookEvent(body);
    expect(response().text).toBe(
      `There are ${differenceInCalendarDays(
        setYear(userFound.dateOfBirth, getYear(new Date())),
        new Date()
      )} days left until your next birthday`
    );
  });

  it("Should return 'Goodbye!!!' if 'responded with no'", async () => {
    const newMessage = await Message.create({ message: "no" });
    const userFound = await User.findOneAndUpdate(
      { user: senderId.toHexString() },
      {
        $push: { messages: [newMessage?._id] },
      },
      { new: true }
    );
    sinon.mock(User).expects("findOne").returns(userFound);
    sinon.mock(Message).expects("create").returns(newMessage);
    sinon.mock(User).expects("findOneAndUpdate").returns(true);
    const response = sinon.replace(
      request,
      "post",
      sinon.fake.returns({
        text: "Goodbye!!!",
      })
    );
    const body = {
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: senderId.toHexString(),
              },
              message: null,
              postback: { payload: "no" },
            },
          ],
        },
      ],
    };
    handleWebHookEvent(body);
    expect(response().text).toBe("Goodbye!!!");
  });

  it("should fetch all messages", async () => {
    const response = await requestApi(app).get("/messages");
    expect(response.body.data.length).toBe(5);
    expect(response.status).toBe(200);
  });

  it("should fetch all summary", async () => {
    const response = await requestApi(app).get("/summary");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].messages.length).toBe(5);
    expect(response.status).toBe(200);
  });

  it("should fetch message by ID", async () => {
    const message = await Message.create({ message: "This is a test message" });
    const response = await requestApi(app).get(
      `/messages/${message._id.toHexString()}`
    );
    expect(response.body.data._id).toBe(message._id.toHexString());
    expect(response.body.data.message).toBe("This is a test message");
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await Message.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });
});
