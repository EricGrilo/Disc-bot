require('dotenv').config({ path: __dirname + '/.env' })
import WOKCommands from 'wokcommands'
import path from 'path';
import client from './services/connection/client'
const ytdl = require('ytdl-core');
import { createConnection, getConnection } from "./services/connection/connection"
import { AudioPlayer, AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, VoiceConnection } from '@discordjs/voice';
import stream from 'stream';
import { VoiceBasedChannel } from 'discord.js';
import soundList from "./services/sounds/soundList";
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
    // const guildId = '523573629456351233'
    // const guild = client.guilds.cache.get(guildId)
    // let commands;

    // if (guild) {
    //     commands = guild.commands
    // } else {
    //     commands = client.application?.commands
    // }
    // guild?.commands.set([])

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        // typeScript: true,
        testServers: ['523573629456351233']
    })

})

client.on('voiceStateUpdate', async (oldState, newState) => {
    let newUserChannel = newState.channelId;
    let oldUserChannel = oldState.channelId;
    // check for bot
    if (oldState.member?.user?.bot) return;
    if (newUserChannel === oldUserChannel) return
    const player = createAudioPlayer();

    if (client.channels.cache.find(ch => ch.id === newUserChannel)) //don't remove ""
    {
        // User Joins a voice channel
        const stream = ytdl(soundList.getRandomSound(), {
            filter: "audioonly"
        });
        const connection = await createConnection(newState.channel as VoiceBasedChannel)
        const resource = createAudioResource(stream);
        play(player, resource, connection)
    }
    else {
        // User leaves a voice channel
        // const stream = ytdl(soundList.getRandomSound(), {
        //     filter: "audioonly"
        // });
        // const connection = await createConnection(newState.channel as VoiceBasedChannel)
        // const resource = createAudioResource(stream);
    }
});

async function play(player: AudioPlayer, resource: AudioResource<null>, connection: VoiceConnection) {
    connection.subscribe(player);
    player.play(resource);
    player.on(AudioPlayerStatus.Idle, () => {

        setTimeout(() => {
            connection.destroy()
        }, 600);
    })

}
client.login(process.env.TOKEN)