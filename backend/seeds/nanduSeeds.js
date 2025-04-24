import connectDB from "../config/db.js";
import { Nandu } from "../models/index.js";

const northernNandu = [
  {
    chinese: "搬腿朝天直立",
    pinyin: "Bān Tuǐ Cháo Tiān Zhí Lì",
    englishDescription:
      "Grasp the foot and bring it to head level with the leg held vertically while remaining standing",
    code: "111A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "侧踢抱脚直立",
    pinyin: "Cè Tī Bào Jiǎo Zhí Lì",
    englishDescription:
      "Side kick up to catch the foot at head level with the leg held vertically while remaining standing",
    code: "112A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "仰身平衡",
    pinyin: "Yǎng Shēn Píng Héng",
    englishDescription: "Backward Leaning Balance",
    code: "123A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "探海平衡",
    pinyin: "Tàn Hǎi Píng Héng",
    englishDescription: "Exploring the Ocean Balance",
    code: "153A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "望月平衡",
    pinyin: "Wàng Yuè Píng Héng",
    englishDescription: "Gazing at the Moon Balance",
    code: "163A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "十字平衡",
    pinyin: "Shí Zì Píng Héng",
    englishDescription: "Forward Leaning Balance with Arms Outspread",
    code: "133B",
    grade: "B",
    techniqueType: "Balance",
  },
  {
    chinese: "前扫腿 540°",
    pinyin: "Qián Sǎo Tuǐ 540°",
    englishDescription: "Front Sweep 540°",
    code: "244A",
    grade: "A",
    techniqueType: "Leg",
  },
  {
    chinese: "前扫腿 900°",
    pinyin: "Qián Sǎo Tuǐ 900°",
    englishDescription: "Front Sweep 900°",
    code: "244B",
    grade: "B",
    techniqueType: "Leg",
  },
  {
    chinese: "腾空飞脚",
    pinyin: "Téng Kōng Fēi Jiǎo",
    englishDescription: "Jumping Front Slap Kick",
    code: "312A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "斜飞脚",
    pinyin: "Téng Kōng Xié Fēi Jiǎo",
    englishDescription: "Jumping Slant Kick",
    code: "312A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "双飞脚",
    pinyin: "Téng Kōng Shuāng Fēi Jiǎo",
    englishDescription: "Jumping Double Front Slap Kick",
    code: "312A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空正踢腿",
    pinyin: "Téng Kōng Zhèng Tī Tuǐ",
    englishDescription: "Jumping Front Straight Kick",
    code: "312B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 360°",
    pinyin: "Xuàn Fēng Jiǎo 360°",
    englishDescription: "Tornado Kick 360°",
    code: "323A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 540°",
    pinyin: "Xuàn Fēng Jiǎo 540°",
    englishDescription: "Tornado Kick 540°",
    code: "323B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 630°(女)/720°",
    pinyin: "Xuàn Fēng Jiǎo 630°(F)/720°",
    englishDescription: "Tornado Kick 630°(F)/720°",
    code: "323C",
    grade: "C",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空摆莲 360°",
    pinyin: "Téng Kōng Bǎi Lián 360°",
    englishDescription: "Jumping Lotus Kick 360°",
    code: "324A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空摆莲 540°",
    pinyin: "Téng Kōng Bǎi Lián 540°",
    englishDescription: "Jumping Lotus Kick 540°",
    code: "324B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空摆莲 630°(女)/720°",
    pinyin: "Téng Kōng Bǎi Lián 630°(F)/720°",
    englishDescription: "Jumping Lotus Kick 630°(F)/720°",
    code: "324C",
    grade: "C",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋子",
    pinyin: "Xuànzi",
    englishDescription: "Butterfly Kick",
    code: "333A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋子转体 360°",
    pinyin: "Xuàn Zǐ Zhuǎn Tǐ 360°",
    englishDescription: "Butterfly Twist 360°",
    code: "353B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋子转体 720°",
    pinyin: "Xuàn Zǐ Zhuǎn Tǐ 720°",
    englishDescription: "Butterfly Twist 720°",
    code: "353C",
    grade: "C",
    techniqueType: "Jumping",
  },
  {
    chinese: "侧空翻",
    pinyin: "Cè Kōng Fān",
    englishDescription: "Aerial Cartwheel",
    code: "335A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "侧空翻转体 360°",
    pinyin: "Cè Kōng Fān Zhuǎn Tǐ 360°",
    englishDescription: "Aerial Cartwheel Twist 360°",
    code: "355B",
    grade: "B",
    techniqueType: "Jumping",
  },
];

const southernNandu = [
  {
    chinese: "前扫腿 540°",
    pinyin: "Qián Sǎo Tuǐ 540°",
    englishDescription: "Front Sweep 540°",
    code: "244A",
    grade: "A",
    techniqueType: "Leg",
  },
  {
    chinese: "前扫腿 900°",
    pinyin: "Qián Sǎo Tuǐ 900°",
    englishDescription: "Front Sweep 900°",
    code: "244B",
    grade: "B",
    techniqueType: "Leg",
  },
  {
    chinese: "腾空飞脚",
    pinyin: "Téng Kōng Fēi Jiǎo",
    englishDescription: "Jumping Front Slap Kick",
    code: "312A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 360°",
    pinyin: "Xuàn Fēng Jiǎo 360°",
    englishDescription: "Tornado Kick 360°",
    code: "323A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 540°",
    pinyin: "Xuàn Fēng Jiǎo 540°",
    englishDescription: "Tornado Kick 540°",
    code: "323B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 630°(女)/720°",
    pinyin: "Xuàn Fēng Jiǎo 630°(F)/720°",
    englishDescription: "Tornado Kick 630°(F)/720°",
    code: "323C",
    grade: "C",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空外摆腿 360°",
    pinyin: "Téng Kōng Wài Bǎi Tuǐ 360°",
    englishDescription: "Jumping Lotus Kick 360°",
    code: "324A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空外摆腿 540°",
    pinyin: "Téng Kōng Wài Bǎi Tuǐ 540°",
    englishDescription: "Jumping Lotus Kick 540°",
    code: "324B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空外摆腿 630°(女)/720°",
    pinyin: "Téng Kōng Wài Bǎi Tuǐ 630°(F)/720°",
    englishDescription: "Jumping Lotus Kick 630°(F)/720°",
    code: "324C",
    grade: "C",
    techniqueType: "Jumping",
  },
  {
    chinese: "侧空翻",
    pinyin: "Cè Kōng Fān",
    englishDescription: "Aerial Cartwheel",
    code: "335A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "原地后空翻",
    pinyin: "Yuán Dì Hòu Kōng Fān",
    englishDescription: "No-Step Back Flip",
    code: "346A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "单跳后空翻",
    pinyin: "Dān Tiào Hòu Kōng Fān",
    englishDescription: "Single Step Back Flip",
    code: "346B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空双侧踹",
    pinyin: "Téng Kōng Shuāng Cè Chuài",
    englishDescription: "Jumping Double Side Kick",
    code: "415A",
    grade: "A",
    techniqueType: "Tumbling",
  },
  {
    chinese: "腾空盘腿 360°侧扑",
    pinyin: "Téng Kōng Pán Tuǐ 360° Cè Pū",
    englishDescription: "Flying Cross Legged 360° Kick to Falling on Side",
    code: "423A",
    grade: "A",
    techniqueType: "Tumbling",
  },
  {
    chinese: "鲤鱼打挺",
    pinyin: "Lǐ Yú Dǎ Tǐng",
    englishDescription: "Carp Kip-Up",
    code: "447A",
    grade: "A",
    techniqueType: "Tumbling",
  },
];

const taichiNandu = [
  {
    chinese: "低势前蹬踩脚平衡",
    pinyin: "Dīshì Qián Dēng Cǎi Jiǎo Píng Héng",
    englishDescription: "Forward Stepping Kick with Low Step Balance",
    code: "142A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "前举腿低势平衡",
    pinyin: "Qián Jǔ Tuǐ Dī Shì Píng Héng",
    englishDescription: "Low Balance with Leg Stretched Forward",
    code: "143A",
    grade: "A",
    techniqueType: "Balance",
  },
  {
    chinese: "后插腿低势平衡",
    pinyin: "Hòu Chā Tuǐ Dī Shì Píng Héng",
    englishDescription: "Low Balance with Leg Crossed Behind",
    code: "143B",
    grade: "B",
    techniqueType: "Balance",
  },
  {
    chinese: "分脚",
    pinyin: "Fēn Jiǎo",
    englishDescription: "Parting Kick",
    code: "212A",
    grade: "A",
    techniqueType: "Leg",
  },
  {
    chinese: "蹬脚",
    pinyin: "Dēng Jiǎo",
    englishDescription: "Heel Kick",
    code: "212A",
    grade: "A",
    techniqueType: "Leg",
  },
  {
    chinese: "腾空飞脚",
    pinyin: "Téng Kōng Fēi Jiǎo",
    englishDescription: "Jumping Front Slap Kick",
    code: "312A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空正踢腿",
    pinyin: "Téng Kōng Zhèng Tī Tuǐ",
    englishDescription: "Jumping Front Straight Kick",
    code: "312B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 180°",
    pinyin: "Xuàn Fēng Jiǎo 180°",
    englishDescription: "Tornado Kick 180°",
    code: "323A",
    grade: "A",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 360°",
    pinyin: "Xuàn Fēng Jiǎo 360°",
    englishDescription: "Tornado Kick 360°",
    code: "323B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "旋风脚 450°(女)/540°",
    pinyin: "Xuàn Fēng Jiǎo 450°(F)/540°",
    englishDescription: "Tornado Kick 450°(F)/540°",
    code: "323C",
    grade: "C",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空摆莲 360°",
    pinyin: "Téng Kōng Bǎi Lián 360°",
    englishDescription: "Jumping Lotus Kick 360°",
    code: "324B",
    grade: "B",
    techniqueType: "Jumping",
  },
  {
    chinese: "腾空摆莲 450°(女)/540°",
    pinyin: "Téng Kōng Bǎi Lián 450°(F)/540°",
    englishDescription: "Jumping Lotus Kick 450°(F)/540°",
    code: "324C",
    grade: "C",
    techniqueType: "Jumping",
  },
];

const calculateDifficulty = (grade) => {
  const values = { A: 0.2, B: 0.3, C: 0.4 };
  return values[grade] || 0.2; // Default to 0.2 if grade not found
};

// Transform data with explicit difficultyValue
const transformData = (items, style) =>
  items.map((item) => ({
    ...item,
    style,
    difficultyValue: calculateDifficulty(item.grade),
    createdAt: new Date(),
    lastModified: new Date(),
  }));

const seedDB = async () => {
  try {
    await connectDB();

    await Nandu.deleteMany();
    console.log("Cleared existing Nandu collection");

    await Nandu.insertMany([
      ...transformData(northernNandu, "Northern"),
      ...transformData(southernNandu, "Southern"),
      ...transformData(taichiNandu, "Taichi"),
    ]);

    const total = await Nandu.countDocuments();
    const northernCount = await Nandu.countDocuments({ style: "Northern" });
    const southernCount = await Nandu.countDocuments({ style: "Southern" });
    const taichiCount = await Nandu.countDocuments({ style: "Taichi" });

    console.log(`Successfully seeded:
      - Total: ${total}
      - Northern: ${northernCount}
      - Southern: ${southernCount}
      - Taichi: ${taichiCount}`);

    const duplicateCodes = await Nandu.aggregate([
      {
        $group: {
          _id: "$code",
          count: { $sum: 1 },
          styles: { $addToSet: "$style" },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    console.log("\nTechniques with same code across styles:");
    duplicateCodes.forEach((doc) => {
      console.log(`- Code ${doc._id} appears in: ${doc.styles.join(", ")}`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
