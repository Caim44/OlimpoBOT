const Discord = require('discord.js')
const config = require('../config.json')
exports.run = async (client, message, args,) => {

    let helpEmbed = new Discord.MessageEmbed()
    .setTitle("ℹ️ | Olá! Seja bem vindo á minha ajuda. Meu prefix é ``o.``")
    .addField(":shield: | Comandos de Moderação:", client.commands.filter(c => c.config.category === "moderacao").map(c => `\`${config.prefix}${c.config.name}\``).join(', '), true)
    .addField(":wrench: | Comandos de Utilidade:", client.commands.filter(c => c.config.category === "util").map(c => `\`${config.prefix}${c.config.name}\``).join(', '), true)
    .addField(":musical_note: | Comandos de Música [Em Desenvolvimento]:", client.commands.filter(c => c.config.category === "music").map(c => `\`${config.prefix}${c.config.name}\``).join(', '), true)
    .setThumbnail(client.user.displayAvatarURL())
    message.author.send(helpEmbed).catch(err => {
        message.reply("**Verifique se seu privado está fechado. Não foi possível enviar a ajuda lá.**")
    })
    message.reply("** | Verifique seu privado, enviei minha ajuda lá!**");
}
module.exports.config = {
    name: 'help',
    aliases: ['ajuda', 'comandos'],
    category: 'util'
}