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
exports.deleteObject = exports.getObjectSignedUrl = exports.putObject = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
/* It's loading the environment variables from the .env file. */
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3BucketName = process.env.S3_BUCKET_NAME;
const s3BucketRegion = process.env.S3_BUCKET_REGION;
/* It's creating a new S3Client object. */
const s3 = new client_s3_1.S3Client({
    region: s3BucketRegion,
    credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
    },
});
/**
 * It takes a file buffer, a file name, and a mimetype, and then it uploads the file to S3
 * @param {Buffer} fileBuffer - Buffer
 * @param {string} fileName - The name of the file you want to upload.
 * @param {string} mimetype - The mimetype of the file you're uploading.
 * @returns The promise of the putObject function.
 */
const putObject = (fileBuffer, fileName, mimetype) => {
    const putParams = {
        Bucket: s3BucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimetype,
    };
    return s3.send(new client_s3_1.PutObjectCommand(putParams));
};
exports.putObject = putObject;
/**
 * It returns a signed URL for a given file name
 * @param {string} fileName - The name of the file you want to get the signed URL for.
 * @returns A signed URL that can be used to download the file.
 */
const getObjectSignedUrl = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const getParams = {
        Bucket: s3BucketName,
        Key: fileName,
    };
    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new client_s3_1.GetObjectCommand(getParams);
    const seconds = 60 * 60 * 24 * 7; // 7 days
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: seconds });
    return url;
});
exports.getObjectSignedUrl = getObjectSignedUrl;
/**
 * It takes a file name as a parameter and deletes the file from the S3 bucket
 * @param {string} fileName - The name of the file you want to delete.
 * @returns The promise of the deleteObjectCommand
 */
const deleteObject = (fileName) => {
    const deleteParams = {
        Bucket: s3BucketName,
        Key: fileName,
    };
    return s3.send(new client_s3_1.DeleteObjectCommand(deleteParams));
};
exports.deleteObject = deleteObject;
