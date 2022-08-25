import express from "express";
import upload from "../lib/upload/multer";
const router = express.Router();

import {
  getImages,
  getImage,
  putImage,
  deleteImage,
} from "../Controllers/imageControllers";

router.route("/").get(getImages).post(upload.single("image"), putImage);
router.route("/:id").get(getImage).delete(deleteImage);

export default router;
