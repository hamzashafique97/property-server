const mongooose = require("mongoose");

module.exports = async () => {
  try {
    await mongooose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
