"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../lib/upload/multer"));
const router = express_1.default.Router();
const imageControllers_1 = require("../Controllers/imageControllers");
router.route("/").get(imageControllers_1.getImages).post(multer_1.default.single("image"), imageControllers_1.putImage);
router.route("/:id").get(imageControllers_1.getImage).delete(imageControllers_1.deleteImage);
exports.default = router;
