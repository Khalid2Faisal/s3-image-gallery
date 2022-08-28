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
exports.database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const db_1 = __importDefault(require("./config/db"));
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    /* Connecting to the database. */
    const db = yield (0, db_1.default)();
    exports.database = db;
    /* Telling the server to use the express.json() middleware. This middleware is used to parse the body
    of the request. */
    app.use(express_1.default.json());
    app.use((0, compression_1.default)());
    /* Telling the server to use the cors() middleware. This middleware is used to allow cross-origin requests. */
    app.use((0, cors_1.default)());
    /* Telling the server to use the imageRoutes file when the server receives a request to the
    /api/images endpoint. */
    app.use("/api/images", imageRoutes_1.default);
    app.use(express_1.default.static(`${__dirname}/client`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));
    /* This is the port that the server will be listening on. */
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
/* Calling the mount function to start the app and passing in express() . */
mount((0, express_1.default)());
