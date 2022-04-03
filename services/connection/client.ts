import DiscordJS from 'discord.js';

const client = new DiscordJS.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES'
    ]
})

export default client