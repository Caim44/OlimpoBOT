const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`Olá, ${message.author.username}!`)
    .addField(`IP do servidor:`, "OlimpoRankup.pvpnetwork.xyz")
    .setThumbnail(message.guild.iconURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    message.channel.send(embed)

}
exports.config = {
    name: 'ip',
    aliases: [],
    category: 'util'
}