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
    expectedArgs: '<linklist>',
    options: [{
            name: 'linklist',
            description: 'Lista de links separadas por ","',
            required: true,
            type: 'STRING'
        }],
    slash: true,
    testOnly: true,
    callback: ({ args, interaction }) => {
        var _a;
        console.log(args);
        const response = soundList_1.default.addMultipleSounds(args[0]);
        if (response.error) {
            interaction === null || interaction === void 0 ? void 0 : interaction.reply('Urls invalidas: ' + ((_a = response.errorUrl) === null || _a === void 0 ? void 0 : _a.toString()));
        }
        else {
            interaction === null || interaction === void 0 ? void 0 : interaction.reply(soundList_1.default.getSounds());
        }
    }
};
