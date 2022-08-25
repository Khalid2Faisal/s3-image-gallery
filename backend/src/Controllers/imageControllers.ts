import crypto from "crypto";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { database as db } from "../server";
import { putObject, getObjectSignedUrl, deleteObject } from "../lib/api/s3";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

/**
 * It gets all the images from the database, then for each image, it gets the signed url from the S3
 * bucket, and then it returns the images with the signed url
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 */
const getImages = async (req: Request, res: Response) => {
  try {
    const images = await db.images.find({}).toArray();
    for (let image of images) {
      image.signedUrl = await getObjectSignedUrl(image.name);
      image.id = image._id.toString();
      image._id = undefined as any;
    }
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes the id of an image from the request params, gets the image from the database, and then uses the image name to get
 * a signed url from AWS, then sends the url to the client.
 *
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 */
const getImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image = await db.images.findOne({ _id: new ObjectId(id) });
    if (!image) {
      res.status(404).json({ message: "Image not found" });
    } else {
      const url = await getObjectSignedUrl(image.name);
      res.status(200).json({ url });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * It takes a file from the request, generates a name for it, uploads it to S3, and then saves the
 * file's name and mime type to a MongoDB database
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 */
const putImage = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const name = generateFileName();

    await putObject(file.buffer, name, file.mimetype);

    const image = await db.images.insertOne({
      _id: new ObjectId(),
      name,
      mimeType: file.mimetype,
    });

    res.status(201).json(image);
  } catch (error) {
    console.log(error);
  }
};

/**
 * It deletes an image from the database and from the S3 bucket.
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response
 */
const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image = await db.images.findOne({ _id: new ObjectId(id) });
    if (!image) {
      res.status(404).json({ message: "Image not found" });
    } else {
      await deleteObject(image.name);
      await db.images.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Image deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getImages, getImage, putImage, deleteImage };
