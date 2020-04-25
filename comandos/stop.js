const Discord = require('discord.js')
exports.run = async (client, message, args, opus, opt) => {
    let fetched = opt.active.get(message.guild.id)
    if(!fetched) return message.reply("Não há nenhuma música tocando no momento!")

    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Você não está no mesmo canal de voz que eu estou.")

    if(fetched.dispatcher.paused) return message.channel.send('A música já está pausada!')

    fetched.dispatcher.pause();

    message.reply("Música pausada com sucesso!")
}
exports.config = {
    name: 'stop',
    aliases: ['parar', 'pare', 'para', 'pausar'],
    category: 'music'
}