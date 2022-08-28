"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
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
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(url);
    const db = client.db("gallery-db");
    console.log(`Connected to ${db.databaseName} database`);
    return { images: db.collection("images") };
});
exports.default = connectDB;
