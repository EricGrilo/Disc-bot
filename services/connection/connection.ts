import { joinVoiceChannel, entersState, VoiceConnectionStatus, VoiceConnection } from "@discordjs/voice";
import { channel } from "diagnostics_channel";
import { VoiceBasedChannel } from "discord.js";

export let connection: VoiceConnection

export const getConnection = () => {
    return connection
}

export const createConnection = async (channel: VoiceBasedChannel) => {


    connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator //createDiscordJSAdapter(channel as VoiceChannel),
    });

    try {
        /**
         * Allow ourselves 30 seconds to join the voice channel. If we do not join within then,
         * an error is thrown.
         */
        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
        /**
         * At this point, the voice connection is ready within 30 seconds! This means we can
         * start playing audio in the voice channel. We return the connection so it can be
         * used by the caller.
         */
        return connection;
    } catch (error) {
        /**
         * At this point, the voice connection has not entered the Ready state. We should make
         * sure to destroy it, and propagate the error by throwing it, so that the calling function
         * is aware that we failed to connect to the channel.
         */
        connection.destroy();
        throw error;
    }
}
