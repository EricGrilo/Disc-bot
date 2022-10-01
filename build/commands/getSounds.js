"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const soundList_1 = __importDefault(require("../services/sounds/soundList"));
exports.default = {
    category: "sons",
    description: 'Mostra a lista de sons',
    slash: true,
    testOnly: true,
    callback: ({ interaction }) => {
        interaction === null || interaction === void 0 ? void 0 : interaction.reply(soundList_1.default.getSounds());
    }
};
