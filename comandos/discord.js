const Discord = require('discord.js')
exports.run = async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`Olá, ${message.author.username}!`)
    .addField("Acesse o link:", `[[Clique Aqui]](https://discord.gg/hHNts57)`)
    .addField(`Discord link:`, "https://discord.gg/hHNts57")
    .setThumbnail(message.guild.iconURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    message.channel.send(embed)

}
exports.config = {
    name: 'discord',
    aliases: ['invite', 'convite'],
    category: 'util'
}