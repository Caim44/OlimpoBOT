const Discord = require('discord.js')
const config = require('../config.json')
exports.run = async (client, message, args) => {

    let membro = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
    if(!membro) return message.reply(":no_entry_sign: | **Mencione qual membro deseja denunciar.**")
    let reason = args.slice(1).join(" ");
    if(!reason) return message.reply(":no_entry_sign: | **Coloque um motivo.**")

    let reportEmbed = new Discord.MessageEmbed()
    .setTitle(`Usuário denunciado!`)
    .addField(`Denunciado por:`, message.author)
    .addField(`Membro denunciado:`, `${membro}`)
    .addField(`Motivo:`, reason)
    .setThumbnail(membro.user.displayAvatarURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

    let punchannel = message.guild.channels.cache.get(config.denunciachannel)
    if(!punchannel) return message.reply(":no_entry_sign: | **Não foi possível encontrar o canal de denúncias**")

    try {
        await punchannel.send(reportEmbed)
        message.reply(`:white_check_mark: | **Usuário ${membro} denunciado com sucesso!**`)
        
        } catch (err) {
        console.log(err)
    }
}
exports.config = {
    name: 'denunciar',
    aliases: ['report', 'denuncia', 'denúncia'],
    category: 'util'
}