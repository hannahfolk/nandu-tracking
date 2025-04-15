import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/nandu-tracking";

if (!uri) {
  throw new Error("Please define the MONGODB_URI in .env");
}

const client = new MongoClient(uri, {});

let clientPromise;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
