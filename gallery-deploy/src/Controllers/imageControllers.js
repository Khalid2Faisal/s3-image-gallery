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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.putImage = exports.getImage = exports.getImages = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mongodb_1 = require("mongodb");
const server_1 = require("../server");
const s3_1 = require("../lib/api/s3");
const generateFileName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
/**
 * It gets all the images from the database, then for each image, it gets the signed url from the S3
 * bucket, and then it returns the images with the signed url
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 */
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield server_1.database.images.find({}).toArray();
        for (let image of images) {
            image.signedUrl = yield (0, s3_1.getObjectSignedUrl)(image.name);
            image.id = image._id.toString();
            image._id = undefined;
        }
        res.status(200).json(images);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getImages = getImages;
/**
 * It takes the id of an image from the request params, gets the image from the database, and then uses the image name to get
 * a signed url from AWS, then sends the url to the client.
 *
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 */
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const image = yield server_1.database.images.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!image) {
            res.status(404).json({ message: "Image not found" });
        }
        else {
            const url = yield (0, s3_1.getObjectSignedUrl)(image.name);
            res.status(200).json({ url });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getImage = getImage;
/**
 * It takes a file from the request, generates a name for it, uploads it to S3, and then saves the
 * file's name and mime type to a MongoDB database
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 */
const putImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const name = generateFileName();
        yield (0, s3_1.putObject)(file.buffer, name, file.mimetype);
        const image = yield server_1.database.images.insertOne({
            _id: new mongodb_1.ObjectId(),
            name,
            mimeType: file.mimetype,
        });
        res.status(201).json(image);
    }
    catch (error) {
        console.log(error);
    }
});
exports.putImage = putImage;
/**
 * It deletes an image from the database and from the S3 bucket.
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response
 */
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const image = yield server_1.database.images.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!image) {
            res.status(404).json({ message: "Image not found" });
        }
        else {
            yield (0, s3_1.deleteObject)(image.name);
            yield server_1.database.images.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            res.status(200).json({ message: "Image deleted" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteImage = deleteImage;
