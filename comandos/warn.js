const Discord = require('discord.js')
const config = require('../config.json')
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("você não tem permissão para executar este comando!")

    let membro = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
    let reason = args.slice(1).join(" ");

    let warnEmbedDM = new Discord.MessageEmbed()
    .setTitle(`Você foi advertido do ${message.guild.name}`)
    .addField(`Advertido por:`, `${message.author}`)
    .addField(`Motivo:`, `${reason}`)
    .setThumbnail(message.guild.iconURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

    let warnEmbed = new Discord.MessageEmbed()
    .setTitle(`Usuário advertido!`)
    .addField(`Advertido por:`, message.author)
    .addField(`Membro advertido:`, `${membro}`)
    .addField(`Motivo:`, reason)
    .setThumbnail(membro.user.displayAvatarURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

    let punchannel = message.guild.channels.cache.get(config.punchannel)
    if(!punchannel) return message.reply("Não foi possível encontrar o canal de punições")

    try {

        await membro.send(warnEmbedDM)
        await punchannel.send(warnEmbed)
        message.reply(`:white_check_mark: | **O usuário ${membro} foi advertido com sucesso!**`)
        
    } catch (err) {
        console.log(err)
    }
}
exports.config = {
    name: 'warn',
    aliases: ['avisar', 'aviso'],
    category: 'moderacao'
}