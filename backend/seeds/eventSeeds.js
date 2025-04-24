import connectDB from "../config/db.js";
import { Event } from "../models/index.js";

const eventData = [
  {
    chineseName: "长拳",
    pinyinName: "Changquan",
    englishName: "Longfist",
    pinyinAcronym: "CQ",
    style: "Northern",
  },
  {
    chineseName: "剑术",
    pinyinName: "Jianshu",
    englishName: "Straightsword",
    pinyinAcronym: "JS",
    style: "Northern",
  },
  {
    chineseName: "刀术",
    pinyinName: "Daoshu",
    englishName: "Broadsword",
    pinyinAcronym: "DS",
    style: "Northern",
  },
  {
    chineseName: "棍术",
    pinyinName: "Gunshu",
    englishName: "Staff",
    pinyinAcronym: "GS",
    style: "Northern",
  },
  {
    chineseName: "枪术",
    pinyinName: "Qiangshu",
    englishName: "Spear",
    pinyinAcronym: "QS",
    style: "Northern",
  },
  {
    chineseName: "南拳",
    pinyinName: "Nanquan",
    englishName: "Southern fist",
    pinyinAcronym: "NQ",
    style: "Southern",
  },
  {
    chineseName: "南刀",
    pinyinName: "Nandao",
    englishName: "Southern broadsword",
    pinyinAcronym: "ND",
    style: "Southern",
  },
  {
    chineseName: "南棍",
    pinyinName: "Nangun",
    englishName: "Southern staff",
    pinyinAcronym: "NG",
    style: "Southern",
  },
  {
    chineseName: "太极拳",
    pinyinName: "Taijiquan",
    englishName: "Taichi fist",
    pinyinAcronym: "TQ",
    style: "Taichi",
  },
  {
    chineseName: "太极剑",
    pinyinName: "Taijijian",
    englishName: "Taichi sword",
    pinyinAcronym: "TJ",
    style: "Taichi",
  },
];

const seedEvents = async () => {
  try {
    await connectDB();

    await Event.deleteMany();
    console.log("Cleared existing events");

    const createdEvents = await Event.insertMany(eventData);
    console.log(`Successfully seeded ${createdEvents.length} events`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedEvents();
