import { ICommand } from "wokcommands";
import soundList from '../services/sounds/soundList';

export default {
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
        const prob = +args[0]
        if (prob > 1) {
            interaction?.reply('Valor deve ser menor do que 1')
        }
        const reply = soundList.setRogersProbability(prob)

        interaction?.reply(reply)
    }
} as ICommand