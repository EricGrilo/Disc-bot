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
import { onReady, onVoiceStateUpdate } from './services/utils/clientFunctions';
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    onReady(client);
})

client.on('voiceStateUpdate', async (oldState, newState) => {
    onVoiceStateUpdate(oldState, newState, client);
});


client.login(process.env.TOKEN)