# FaceBook Test Bot

## Project setup

```
You must setup your facebook webhooks and get your token after setting up your facebook page, see https://developers.facebook.com/apps/

NB: You use an Ngrok to expose your local server to be able to configure your callback url on facebook app settings

```

```
Clone the repo
cd facBookTestBot and run npm install OR yarn install

Create a .env file in the root of facBookTestBot path /facBookTestBot/.env

In the .env file you will need the following variables in other to run the project
PORT
MONGODB_URI
FACEBOOK_VERIFY_CODE
PAGE_ACCESS_TOKEN
```

### Running app

```
Run the following commands to start the up
cd facBookTestBot and npm run dev OR yarn run dev

 1. Open your web browser and type http://localhost:8081/ to see the application

```

You can view gif image of the working project below
![](https://drive.google.com/file/d/1wm5dLYxgTfvzyvYHFShoEtc8lhDWKudn/view)
