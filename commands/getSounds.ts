import { ICommand } from "wokcommands";
import soundList from "../services/sounds/soundList";

export default {
    category: "sons",
    description: 'Mostra a lista de sons',
    slash: true,
    testOnly: true,
    callback: ({ interaction }) => {
        interaction?.reply(soundList.getSounds())

    }
} as ICommand