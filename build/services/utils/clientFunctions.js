"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onVoiceStateUpdate = exports.onReady = void 0;
const voice_1 = require("@discordjs/voice");
const path_1 = __importDefault(require("path"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const connection_1 = require("../connection/connection");
const soundList_1 = __importDefault(require("../sounds/soundList"));
function play(player, resource, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        connection.subscribe(player);
        player.play(resource);
        player.on(voice_1.AudioPlayerStatus.Idle, () => {
            setTimeout(() => {
                connection.destroy();
            }, 600);
        });
    });
}
const onReady = (client) => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
    console.log(path_1.default.join(__dirname, 'commands'));
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
    new wokcommands_1.default(client, {
        commandDir: path_1.default.join(__dirname, 'commands'),
        // typeScript: true,
        testServers: ['523573629456351233']
    });
};
exports.onReady = onReady;
const onVoiceStateUpdate = (oldState, newState, client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let newUserChannel = newState.channelId;
    let oldUserChannel = oldState.channelId;
    // check for bot
    if ((_b = (_a = oldState.member) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.bot)
        return;
    if (newUserChannel === oldUserChannel)
        return;
    const player = (0, voice_1.createAudioPlayer)();
    if (client.channels.cache.find(ch => ch.id === newUserChannel)) //don't remove ""
     {
        // User Joins a voice channel
        const stream = (0, ytdl_core_1.default)(soundList_1.default.getRandomSound(), {
            filter: "audioonly"
        });
        const connection = yield (0, connection_1.createConnection)(newState.channel);
        const resource = (0, voice_1.createAudioResource)(stream);
        play(player, resource, connection);
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
exports.onVoiceStateUpdate = onVoiceStateUpdate;
