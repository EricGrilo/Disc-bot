import { ICommand } from "wokcommands";
import soundList from "../services/sounds/soundList";


export default {
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
        console.log(args);
        const response = soundList.addMultipleSounds(args[0])
        if (response.error) {
            interaction?.reply('Urls invalidas: ' + response.errorUrl?.toString())
        } else {
            interaction?.reply(soundList.getSounds())
        }

    }
} as ICommand