const mongoRules = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.0.3",
      skipMD5: true,
    },
    instance: {
      dbName: "jest",
    },
    autoStart: true,
  },
};

export default mongoRules;
