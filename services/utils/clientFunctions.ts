import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, VoiceConnection } from "@discordjs/voice";
import { Client, VoiceBasedChannel, VoiceState } from "discord.js";
import path from "path";
import WOKCommands from "wokcommands";
import ytdl from "ytdl-core";
import { createConnection } from "../connection/connection";
import soundList from "../sounds/soundList";

async function play(player: AudioPlayer, resource: AudioResource<null>, connection: VoiceConnection) {
    try {
        connection.subscribe(player);
        player.play(resource);
        player.on(AudioPlayerStatus.Idle, () => {
            setTimeout(() => {
                connection.destroy()
            }, 600);
        })
    } catch (error) {
        console.log(error);

    }

}

export const onReady = (client: Client<boolean>) => {
    console.log(`Logged in as ${client.user?.tag}`);
    // console.log(path.join(__dirname, '../../commands'));


    // DESCOMENTAR CASO PRECISE LIMPAR OS COMANDOS

    // const guildId = '523573629456351233'
    // const guild = client.guilds.cache.get(guildId)
    // let commands;

    // if (guild) {
    //     commands = guild.commands
    // } else {
    //     commands = client.application?.commands
    // }
    // guild?.commands.set([])
    soundList.getSoundsAsArr().forEach(async sound => {
        try {
            await ytdl.getBasicInfo(sound)
        } catch (error) {
            soundList.removeSound(sound)
        }

    })

    new WOKCommands(client, {
        commandDir: path.join(__dirname, '../../commands'),
        typeScript: true,
        testServers: ['523573629456351233']
    })
}
export const onVoiceStateUpdate = async (oldState: VoiceState, newState: VoiceState, client: Client<boolean>) => {
    let newUserChannel = newState.channelId;
    let oldUserChannel = oldState.channelId;
    // check for bot
    if (oldState.member?.user?.bot) return;
    if (newUserChannel === oldUserChannel) return
    const player = createAudioPlayer();

    if (client.channels.cache.find(ch => ch.id === newUserChannel)) //don't remove ""
    {
        const sound = soundList.getRandomSound();
        try {
            const basicInfo = await ytdl.getBasicInfo(sound)
            // User Joins a voice channel
            const connection = await createConnection(newState.channel as VoiceBasedChannel);
            const stream = ytdl(sound, {
                filter: "audioonly"
            }).on("error", () => {
                connection.destroy()
            });
            const resource = createAudioResource(stream);
            play(player, resource, connection)

        } catch (error) {
            console.log('ERRRRROOOOOOOOO');
            console.log(sound);

        }


    }
    else {
        // User leaves a voice channel
        // const stream = ytdl(soundList.getRandomSound(), {
        //     filter: "audioonly"
        // });
        // const connection = await createConnection(newState.channel as VoiceBasedChannel)
        // const resource = createAudioResource(stream);
    }
}
