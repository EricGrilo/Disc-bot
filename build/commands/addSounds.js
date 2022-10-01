"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const soundList_1 = __importDefault(require("../services/sounds/soundList"));
exports.default = {
    category: "sons",
    description: 'Adiciona som a lista de sons',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<link>',
    options: [{
            name: 'link',
            description: 'link para som',
            required: true,
            type: 'STRING'
        }],
    slash: true,
    testOnly: true,
    callback: ({ args, interaction }) => {
        console.log(args);
        const error = soundList_1.default.addSound(args[0]);
        if (error) {
            interaction === null || interaction === void 0 ? void 0 : interaction.reply('Url invalida');
        }
        else {
            interaction === null || interaction === void 0 ? void 0 : interaction.reply(soundList_1.default.getSounds());
        }
    }
};
