import { MongoClient } from "mongodb";
import { Database, Image } from "../lib/types";

// connection URI
const DB_USER = process.env.DB_USER;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mnwanxe.mongodb.net/?retryWrites=true&w=majority`;

/**
 * It connects to the database, logs a message, and returns a database object with a collection of
 * images
 * @returns The return type is a promise that resolves to a Database object.
 */
const connectDB = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db("gallery-db");
  console.log(`Connected to ${db.databaseName} database`);
  return { images: db.collection<Image>("images") };
};

export default connectDB;
