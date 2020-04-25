const Discord = require('discord.js')
const server = require('../bot.js')
const play = require('./play.js')
exports.run = async (client, message, args, opt) => {
    if(!message.guild.me.voice.channel) return message.reply("Não estou conectado á um canal de voz!")
    if(!message.member.voice.channel) return message.reply("Conecte-se á um canal de voz!")
    message.channel.send("Saindo do canal de voz.")
    await message.member.voice.channel.leave();
    server.active.clear()
}
exports.config = {
    name: 'leave',
    aliases: ['sair'],
    category: 'music'
}