const Discord = require('discord.js')
exports.run = async (client, message, args, opus, opt) => {
    let fetched = opt.active.get(message.guild.id)
    if(!fetched) return message.reply("Não há nenhuma música tocando no momento!")
    if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Você não está no mesmo canal de voz que eu estou.")

    let userSize = message.member.voice.channel.members.size;

    let required = Math.ceil(userSize/2);

    if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips =[];

    if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.reply("Você já votou para pular essa música!")
    if(fetched.q)

    fetched.queue[0].voteSkips.push(message.member.id)
    opt.active.set(message.guild.id, fetched);

    if(fetched.queue[0].voteSkips.length >= required) {
        message.channel.send("Música pulada com sucesso!")
        return fetched.dispatcher.emit('finish')
    }
    message.channel.send(`Você votou para pular a música! ${fetched.queue[0].voteSkips.length}/${required} restantes.`)
}
exports.config = {
    name: 'skip',
    aliases: ['pular', 'pula'],
    category: 'music'
}