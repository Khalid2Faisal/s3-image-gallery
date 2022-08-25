import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express, { Application } from "express";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes";
import connectDB from "./config/db";
import { Database } from "./lib/types";

export let database: Database;

const mount = async (app: Application) => {
  /* Connecting to the database. */
  const db = await connectDB();
  database = db;

  /* Telling the server to use the express.json() middleware. This middleware is used to parse the body
  of the request. */
  app.use(express.json());

  /* Telling the server to use the cors() middleware. This middleware is used to allow cross-origin requests. */
  app.use(cors());

  /* Telling the server to use the imageRoutes file when the server receives a request to the
  /api/images endpoint. */
  app.use("/api/images", imageRoutes);

  /* This is the port that the server will be listening on. */
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
};

/* Calling the mount function to start the app and passing in express() . */
mount(express());
