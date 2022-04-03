import { ICommand } from "wokcommands";
import soundList from '../services/sounds/soundList';

export default {
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
        const error = soundList.addSound(args[0])
        if (error) {
            interaction?.reply('Url invalida')
        } else {

            interaction?.reply(soundList.getSounds())
        }
    }
} as ICommand