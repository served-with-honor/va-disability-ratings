"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var varates2025_1 = __importDefault(require("./varates2025"));
var varates2024_1 = __importDefault(require("./varates2024"));
var varates2023_1 = __importDefault(require("./varates2023"));
var varates2022_1 = __importDefault(require("./varates2022"));
var varates2021_1 = __importDefault(require("./varates2021"));
var varates2020_1 = __importDefault(require("./varates2020"));
var vaRates = {
    latest: varates2025_1.default,
    2025: varates2025_1.default,
    2024: varates2024_1.default,
    2023: varates2023_1.default,
    2022: varates2022_1.default,
    2021: varates2021_1.default,
    2020: varates2020_1.default,
};
exports.default = vaRates;
