import connectDB from "../config/db.js";
import { Connection, Nandu, StaticConnection } from "../models/index.js";

const possibleNorthernConnections = [
  {
    grade: "B",
    firstPart: "244A",
    secondPart: "6",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "6",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "323A",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "324A",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "353B",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "1",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "4",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "6",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "323A",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "353B",
  },
  {
    grade: "A",
    firstPart: "324A",
    secondPart: "1",
  },
  {
    grade: "A",
    firstPart: "324A",
    secondPart: "4",
  },
  {
    grade: "A",
    firstPart: "324A",
    secondPart: "6",
  },
  {
    grade: "A",
    firstPart: "324A",
    secondPart: "7",
  },
  {
    grade: "A",
    firstPart: "333A",
    secondPart: "353B",
  },
  {
    grade: "A",
    firstPart: "333A",
    secondPart: "6",
  },
  {
    grade: "A",
    firstPart: "335A",
    secondPart: "4",
  },
  {
    grade: "A",
    firstPart: "335A",
    secondPart: "353B",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "9",
  },
  {
    grade: "A",
    firstPart: "445A",
    secondPart: "9",
  },
  {
    grade: "B",
    firstPart: "312A",
    secondPart: "335A",
  },
  {
    grade: "B",
    firstPart: "312A",
    secondPart: "323B",
  },
  {
    grade: "B",
    firstPart: "312A",
    secondPart: "324B",
  },
  {
    grade: "B",
    firstPart: "323A",
    secondPart: "3",
  },
  {
    grade: "B",
    firstPart: "323A",
    secondPart: "324B",
  },
  {
    grade: "B",
    firstPart: "323B",
    secondPart: "1",
  },
  {
    grade: "B",
    firstPart: "323B",
    secondPart: "4",
  },
  {
    grade: "B",
    firstPart: "323B",
    secondPart: "6",
  },
  {
    grade: "B",
    firstPart: "324A",
    secondPart: "3",
  },
  {
    grade: "B",
    firstPart: "324B",
    secondPart: "1",
  },
  {
    grade: "B",
    firstPart: "324B",
    secondPart: "6",
  },
  {
    grade: "B",
    firstPart: "333A",
    secondPart: "244A",
  },
  {
    grade: "B",
    firstPart: "353B",
    secondPart: "4",
  },
  {
    grade: "B",
    firstPart: "353B",
    secondPart: "323B",
  },
  {
    grade: "B",
    firstPart: "335A",
    secondPart: "323B",
  },
  {
    grade: "B",
    firstPart: "323A",
    secondPart: "9",
  },
  {
    grade: "B",
    firstPart: "324A",
    secondPart: "9",
  },
  {
    grade: "C",
    firstPart: "312A",
    secondPart: "323C",
  },
  {
    grade: "C",
    firstPart: "312A",
    secondPart: "324C",
  },
  {
    grade: "C",
    firstPart: "312A",
    secondPart: "353C",
  },
  {
    grade: "C",
    firstPart: "323A",
    secondPart: "353C",
  },
  {
    grade: "C",
    firstPart: "323B",
    secondPart: "3",
  },
  {
    grade: "C",
    firstPart: "323B",
    secondPart: "324B",
  },
  {
    grade: "C",
    firstPart: "323C",
    secondPart: "1",
  },
  {
    grade: "C",
    firstPart: "323C",
    secondPart: "6",
  },
  {
    grade: "C",
    firstPart: "324B",
    secondPart: "0",
  },
  {
    grade: "C",
    firstPart: "324B",
    secondPart: "3",
  },
  {
    grade: "C",
    firstPart: "324C",
    secondPart: "6",
  },
  {
    grade: "C",
    firstPart: "333A",
    secondPart: "353C",
  },
  {
    grade: "C",
    firstPart: "353B",
    secondPart: "323C",
  },
  {
    grade: "C",
    firstPart: "335A",
    secondPart: "323C",
  },
  {
    grade: "C",
    firstPart: "335A",
    secondPart: "353C",
  },
  {
    grade: "D",
    firstPart: "323B",
    secondPart: "324C",
  },
  {
    grade: "D",
    firstPart: "323C",
    secondPart: "4",
  },
  {
    grade: "D",
    firstPart: "324C",
    secondPart: "1",
  },
  {
    grade: "D",
    firstPart: "353C",
    secondPart: "4",
  },
];

const possibleSouthernConnections = [
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "3",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "1",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "2",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "312A",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "324A",
  },
  {
    grade: "A",
    firstPart: "324A",
    secondPart: "1",
  },
  {
    grade: "A",
    firstPart: "324A",
    secondPart: "346A",
  },
  {
    grade: "A",
    firstPart: "335A",
    secondPart: "10",
  },
  {
    grade: "A",
    firstPart: "346A",
    secondPart: "2",
  },
  {
    grade: "B",
    firstPart: "312A",
    secondPart: "346B",
  },
  {
    grade: "B",
    firstPart: "323A",
    secondPart: "324B",
  },
  {
    grade: "B",
    firstPart: "323B",
    secondPart: "1",
  },
  {
    grade: "B",
    firstPart: "323B",
    secondPart: "2",
  },
  {
    grade: "B",
    firstPart: "324A",
    secondPart: "346B",
  },
  {
    grade: "B",
    firstPart: "324B",
    secondPart: "1",
  },
  {
    grade: "B",
    firstPart: "346B",
    secondPart: "2",
  },
  {
    grade: "B",
    firstPart: "447A",
    secondPart: "2",
  },
  {
    grade: "C",
    firstPart: "323A",
    secondPart: "3",
  },
  {
    grade: "C",
    firstPart: "323A",
    secondPart: "346B",
  },
  {
    grade: "C",
    firstPart: "323B",
    secondPart: "324B",
  },
  {
    grade: "C",
    firstPart: "324A",
    secondPart: "3",
  },
  {
    grade: "C",
    firstPart: "324B",
    secondPart: "0",
  },
  {
    grade: "C",
    firstPart: "324B",
    secondPart: "346B",
  },
  {
    grade: "C",
    firstPart: "346B",
    secondPart: "11",
  },
  {
    grade: "D",
    firstPart: "323C",
    secondPart: "1",
  },
  {
    grade: "D",
    firstPart: "324C",
    secondPart: "1",
  },
  {
    grade: "D",
    firstPart: "324B",
    secondPart: "323C",
  },
];

const possibleTaichiConnections = [
  {
    grade: "A",
    firstPart: "142A",
    secondPart: "3",
  },
  {
    grade: "A",
    firstPart: "143A",
    secondPart: "3",
  },
  {
    grade: "A",
    firstPart: "143A",
    secondPart: "212A",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "3",
  },
  {
    grade: "A",
    firstPart: "312A",
    secondPart: "324B",
  },
  {
    grade: "A",
    firstPart: "323A",
    secondPart: "3",
  },
  {
    grade: "A",
    firstPart: "323B",
    secondPart: "8",
  },
  {
    grade: "A",
    firstPart: "324B",
    secondPart: "8",
  },
  {
    grade: "B",
    firstPart: "143B",
    secondPart: "3",
  },
  {
    grade: "B",
    firstPart: "143B",
    secondPart: "212A",
  },
  {
    grade: "B",
    firstPart: "312A",
    secondPart: "324C",
  },
  {
    grade: "B",
    firstPart: "312B",
    secondPart: "8",
  },
  {
    grade: "B",
    firstPart: "324B",
    secondPart: "5",
  },
  {
    grade: "C",
    firstPart: "323B",
    secondPart: "3",
  },
  {
    grade: "C",
    firstPart: "324B",
    secondPart: "3",
  },
  {
    grade: "C",
    firstPart: "324C",
    secondPart: "5",
  },
  {
    grade: "D",
    firstPart: "323C",
    secondPart: "3",
  },
  {
    grade: "D",
    firstPart: "324C",
    secondPart: "3",
  },
];

const DIFFICULTY_VALUES = { A: 0.1, B: 0.15, C: 0.2, D: 0.25 };

const seedConnections = async () => {
  try {
    await connectDB();

    // Clear existing connections
    await Connection.deleteMany();
    console.log("Cleared existing connections");

    // Helper function to create connections
    const createConnections = async (connections, style) => {
      const connectionDocs = [];

      for (const conn of connections) {
        // First part always references Nandu
        const firstElement = await Nandu.findOne({
          code: conn.firstPart,
          style,
        });

        if (!firstElement) {
          console.warn(`Skipping - First part not found: ${conn.firstPart} for ${style}`);
          continue;
        }

        // Determine second part reference
        let secondElement, secondType;
        if (/^\d{3}[A-C]$/.test(conn.secondPart)) {
          secondType = "Nandu";
          secondElement = await Nandu.findOne({
            code: conn.secondPart,
            style,
          });
          if (!secondElement) {
            console.warn(
              `Skipping - Second part (Nandu) not found: ${conn.secondPart} for ${style}`
            );
            continue;
          }
        } else {
          secondType = "StaticConnection";
          secondElement = await StaticConnection.findOne({
            code: `${conn.secondPart}`,
          });
          if (!secondElement) {
            console.warn(`Skipping - Second part (Static) not found: +${conn.secondPart}`);
            continue;
          }
        }

        connectionDocs.push({
          grade: conn.grade,
          firstPart: conn.firstPart,
          secondPart: conn.secondPart,
          secondPartType: secondType,
          style,
          difficultyValue: DIFFICULTY_VALUES[conn.grade], // Explicitly set difficulty
          firstElement: firstElement._id,
          secondElement: secondElement._id,
        });
      }

      return Connection.insertMany(connectionDocs);
    };

    // Seed all connections
    const northernResults = await createConnections(possibleNorthernConnections, "Northern");
    const southernResults = await createConnections(possibleSouthernConnections, "Southern");
    const taichiResults = await createConnections(possibleTaichiConnections, "Taichi");

    const total = [...northernResults, ...southernResults, ...taichiResults].filter(Boolean).length;

    console.log(`Successfully seeded ${total} connections`);

    // Verification
    const sample = await Connection.findOne().populate("firstElement").populate("secondElement");

    console.log("\nSample connection:", {
      style: sample.style,
      grade: sample.grade,
      difficulty: sample.difficultyValue,
      firstPart: sample.firstPart,
      secondPart: sample.secondPart,
      firstElement: sample.firstElement?.englishName,
      secondElement: sample.secondElement?.englishName || `Static Stance ${sample.secondPart}`,
    });

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedConnections();
