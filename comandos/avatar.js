const Discord = require('discord.js')
exports.run = (client, message, args) => {
  const usuario = message.mentions.users.first() || message.author || args[0]
  const foto = usuario.avatarURL({ dynamic: true, size: 2048});
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${usuario.username} • Avatar`)
  .setDescription(`🔗 [Clique Aqui](${foto}) para baixar o avatar`)
  .setImage(foto)
  .setFooter("IP: OlimpoRankup.pvpnetwork.xyz")
  message.channel.send(embed)
}
exports.config = {
  name: 'avatar',
  aliases: [],
  category: 'util'
}