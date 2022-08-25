import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/* It's loading the environment variables from the .env file. */
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
const s3BucketName = process.env.S3_BUCKET_NAME as string;
const s3BucketRegion = process.env.S3_BUCKET_REGION as string;

/* It's creating a new S3Client object. */
const s3 = new S3Client({
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
export const putObject = (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
) => {
  const putParams = {
    Bucket: s3BucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };
  return s3.send(new PutObjectCommand(putParams));
};

/**
 * It returns a signed URL for a given file name
 * @param {string} fileName - The name of the file you want to get the signed URL for.
 * @returns A signed URL that can be used to download the file.
 */
export const getObjectSignedUrl = async (fileName: string) => {
  const getParams = {
    Bucket: s3BucketName,
    Key: fileName,
  };

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(getParams);
  const seconds = 60 * 60 * 24 * 7; // 7 days
  const url = await getSignedUrl(s3, command, { expiresIn: seconds });

  return url;
};

/**
 * It takes a file name as a parameter and deletes the file from the S3 bucket
 * @param {string} fileName - The name of the file you want to delete.
 * @returns The promise of the deleteObjectCommand
 */
export const deleteObject = (fileName: string) => {
  const deleteParams = {
    Bucket: s3BucketName,
    Key: fileName,
  };
  return s3.send(new DeleteObjectCommand(deleteParams));
};
