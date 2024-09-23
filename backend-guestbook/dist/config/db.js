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
exports.connectDB = connectDB;
exports.ping = ping;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env['MONGO_URI'], {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1); // Exit process with failure
        }
    });
}
// Optional: Ping function to check if the database connection is working
function ping() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = mongoose_1.default.connection;
            if (db.readyState === 1) {
                console.log('MongoDB is alive and reachable');
            }
            else {
                console.log('MongoDB connection state:', db.readyState);
            }
        }
        catch (error) {
            console.error('Error pinging MongoDB:', error);
        }
    });
}
//# sourceMappingURL=db.js.map