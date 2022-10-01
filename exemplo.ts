import { createAudioResource } from "@discordjs/voice";
import axios from "axios";
import { VoiceBasedChannel } from "discord.js";
import ytdl from "ytdl-core";
import { createConnection } from "./services/connection/connection";

let audioString = ['https://www.youtube.com/watch?v=3s22jQCwJUA', 'https://youtu.be/-OHNR8BcIQY', 'https://www.youtube.com/watch?v=vS8e5dg-UaM', 'https://www.youtube.com/watch?v=o_4SrI9iX3U&list=PLPhvEBOOIaZnmmiL7l_UZ8PBrskrcybcZ&index=1', 'https://www.youtube.com/watch?v=x2_OfLP8vVg', 'https://www.youtube.com/watch?v=ADWsNPMon1c', 'https://www.youtube.com/watch?v=P5MphlfhOOA', 'https://www.youtube.com/watch?v=gQm8hyMfz2o', 'https://www.youtube.com/watch?v=oaCvLk35BEs', 'https://www.youtube.com/watch?v=Zh1pd2GsRvc', 'https://www.youtube.com/watch?v=-IKImLi-8BY']
function validateYouTubeUrl(url: string) {
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            return true
        }
        else {
            return false
        }
    }
}

audioString.forEach(async audio => {
    const stream = ytdl(audio, {
        filter: "audioonly"
    });
    // const connection = await createConnection(newState.channel as VoiceBasedChannel)
    const resource = createAudioResource(stream);
    // play(player, resource, connection)
    // console.log(validateYouTubeUrl(audio))
})


