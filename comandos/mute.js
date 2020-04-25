const Discord = require('discord.js')
const config = require('../config.json')
exports.run = async(client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(":no_entry_sign: | **Você não tem permissão para executar este comando!**")
    
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!mUser) return message.reply(":no_entry_sign: | **Mencione alguém para ser mutado!**")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = (`Não definido.`)

  let role = message.guild.roles.cache.find(role => role.name === "Silenciado")
  if (!role) {
   
    role = await message.guild.roles.create({
      data:{
      name: "Silenciado",
      color: '#000001',
      permissions: []
      }
    })
      message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.createOverwrite(role, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      SPEAK: false
      });
      });
    }
    try {
        mUser.roles.add(role)

        const muteEmbedDM = new Discord.MessageEmbed()
        .setTitle(`Você foi silenciado do ${message.guild.name}`)
        .setColor('RANDOM')
        .addField("Silenciado por:", `${message.author}`)
        .addField("Motivo:", reason)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${message.guild.name}`)
        .setTimestamp()
        mUser.send(muteEmbedDM)

        const muteEmbed = new Discord.MessageEmbed()
        .setDescription("Membro silenciado!")
        .setThumbnail(mUser.avatarURL)
        .setColor('RANDOM')
        .addField("Membro punido:", `${mUser}`, true)
        .addField("Punido por:", `<@${message.author.id}>`, true)
        .addField("Motivo:", reason, true)
        .setFooter(client.user.username, client.avatarURL)

        let muteChannel = message.guild.channels.cache.get(config.punchannel)
        if(!muteChannel) message.channel.send(`:no_entry_sign: | **Não foi possível encontrar o canal de punições!**`)
        muteChannel.send(muteEmbed)
      
        message.reply(":white_check_mark: | **Usuário silenciado!**")
      await(mUser.roles.add(role.id));
    } catch (err) {
        message.reply(`Ocorreu um erro: \`${err}\``)
    }
}
exports.config = {
    name: 'mute',
    aliases: ['silenciar'],
    category: 'moderacao'
}