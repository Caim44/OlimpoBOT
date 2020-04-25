const Discord = require('discord.js')
exports.run = async (client, message, args, opus, opt) => {
    let fetched = opt.active.get(message.guild.id)
    if(!fetched) return message.reply("Não há nenhuma música tocando no momento!")

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Você não está no mesmo canal de voz que eu estou.")

    if(!fetched.dispatcher.paused) return message.channel.send('A música não está pausada!')

    fetched.dispatcher.resume();

    message.reply("Música retomada com sucesso!")
}
exports.config = {
    name: 'resume',
    aliases: ['continuar', 'retomar'],
    category: 'music'
}