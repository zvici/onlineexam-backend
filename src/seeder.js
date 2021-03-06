import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";
import users from "./data/users.js";
import User from "./models/user.model.js";

import questions from "./data/questions.js";
import Questions from "./models/questions.model.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);

    await Questions.deleteMany();
    await Questions.insertMany(questions);

    const adminUser = createdUsers[0]._id;
    console.log("๐ Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log("๐งจ Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
