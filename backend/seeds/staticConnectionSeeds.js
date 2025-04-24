import connectDB from "../config/db.js";
import { StaticConnection } from "../models/index.js";

const staticConnections = [
  {
    chinese: "仆步",
    pinyin: "Pū Bù",
    englishDescription: "Crouching Stance",
    englishName: "Drop Stance",
    pinyinAcronym: "PB",
    code: "0",
  },
  {
    chinese: "马步",
    pinyin: "Mǎ Bù",
    englishDescription: "Horse Stance",
    englishName: "Horse Stance",
    pinyinAcronym: "MB",
    code: "1",
  },
  {
    chinese: "蝶步",
    pinyin: "Dié Bù",
    englishDescription: "Butterfly Stance",
    englishName: "Butterfly Stance",
    pinyinAcronym: "DB",
    code: "2",
  },
  {
    chinese: "提膝独立",
    pinyin: "Tí Xī Dú Lì",
    englishDescription: "Single Raised-Knee Stance",
    englishName: "Single Leg Stance",
    pinyinAcronym: "TXDL",
    code: "3",
  },
  {
    chinese: "跌竖叉",
    pinyin: "Diē Shù Chā",
    englishDescription: "Falling Front Split",
    englishName: "Split",
    pinyinAcronym: "DSC",
    code: "4",
  },
  {
    chinese: "跌叉",
    pinyin: "Diē Chā",
    englishDescription: "Hurdler's Split Position",
    englishName: "Taichi Split",
    pinyinAcronym: "DC",
    code: "5",
  },
  {
    chinese: "坐盘",
    pinyin: "Zuò Pán",
    englishDescription: "Cross-Legged Sitting",
    englishName: "Sit Stance",
    pinyinAcronym: "ZP",
    code: "6",
  },
  {
    chinese: "弓步",
    pinyin: "Gōng Bù",
    englishDescription: "Bow Stance",
    englishName: "Bow Stance",
    pinyinAcronym: "GB",
    code: "7",
  },
  {
    chinese: "起跳脚落地",
    pinyin: "Qi Tiào Jiǎo Luò Di",
    englishDescription: "Landing on Takeoff Foot",
    englishName: "Single Foot Landing",
    pinyinAcronym: "QTJLD",
    code: "8",
  },
  {
    chinese: "抛+接",
    pinyin: "Pāo + Jiē",
    englishDescription: "Throw + Catch",
    englishName: "Throw and Catch",
    pinyinAcronym: "PJ",
    code: "9",
  },
  {
    chinese: "剪势",
    pinyin: "Jiǎn Shì",
    englishDescription: "Scissor Position",
    englishName: "Scissor Position",
    pinyinAcronym: "JS",
    code: "10",
  },
  {
    chinese: "蝎势",
    pinyin: "Xiē Shì",
    englishDescription: "Scorpion Stance",
    englishName: "Scorpion Stance",
    pinyinAcronym: "XS",
    code: "11",
  },
];

const seedStaticConnections = async () => {
  try {
    await connectDB();

    // Clear existing data
    await StaticConnection.deleteMany();
    console.log("Cleared existing static connections");

    // Insert new data
    const result = await StaticConnection.insertMany(staticConnections);
    console.log(`Successfully seeded ${result.length} static connections`);

    // Verify some entries
    const sampleStances = await StaticConnection.find().limit(3);
    console.log("\nSample static connections:");
    sampleStances.forEach((stance) => {
      console.log(`- ${stance.chinese} (${stance.englishName}): ${stance.code}`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedStaticConnections();
