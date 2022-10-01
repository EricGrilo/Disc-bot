"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const soundList_1 = __importDefault(require("../services/sounds/soundList"));
exports.default = {
    category: "sons",
    description: 'Altera chance de cair o rogers',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<prob>',
    options: [{
            name: 'link',
            description: 'link para som',
            required: true,
            type: 'NUMBER'
        }],
    slash: true,
    testOnly: true,
    callback: ({ args, interaction }) => {
        console.log(args);
        const prob = +args[0];
        if (prob > 1) {
            interaction === null || interaction === void 0 ? void 0 : interaction.reply('Valor deve ser menor do que 1');
        }
        const reply = soundList_1.default.setRogersProbability(prob);
        interaction === null || interaction === void 0 ? void 0 : interaction.reply(reply);
    }
};
