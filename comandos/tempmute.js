const Discord = require('discord.js')
const ms = require('ms')
const config = require('../config.json')
exports.run = async(client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(":no_entry_sign: | **Você não tem permissão para executar este comando!**")
    
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!mUser) return message.reply(":no_entry_sign: | **Mencione alguém ou insira o ID para ser mutado!**")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = (`Não definido.`)

    message.channel.send(`Olá ${message.author}, especifique o tempo do mute, exemplo: \`1s | 1m |1h |1d\``).then(async msg => {

    const filter = u => u.author.id === message.author.id;
    const collector = message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {

    let muteTime = collected.first().content.toLowerCase()

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
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(`${message.guild.name}`)
        .setTimestamp()
        mUser.send(muteEmbedDM)

        const muteEmbed = new Discord.MessageEmbed()
        .setDescription("Membro silenciado!")
        .setThumbnail(mUser.user.displayAvatarURL())
        .setColor('RANDOM')
        .addField("Membro punido:", `${mUser}`, true)
        .addField("Punido por:", `<@${message.author.id}>`, true)
        .addField("Motivo:", reason, true)
        .setFooter(client.user.username, client.user.displayAvatarURL())

        let muteChannel = message.guild.channels.cache.get(config.punchannel)
        if(!muteChannel) message.channel.send(`Não foi possível encontrar o canal de punições!`)
        muteChannel.send(muteEmbed)
      
        } catch (err) {
            message.reply(`Ocorreu um erro: \`${err}\``)
        }
        
    if(!muteTime) return message.channel.send("Tempo não especificado.")
    await(mUser.roles.add(role.id));
    message.reply(`:white_check_mark: | **O usuário foi silenciado por ${ms(ms(muteTime))}.**`)
    
    setTimeout(() => {
      mUser.roles.remove(role.id)
      message.channel.send(`${mUser} **foi automaticamente desmutado após ${ms(ms(muteTime))}.**`)

    }, ms(muteTime))

      })

  })

}
exports.config = {
    name: 'tempmute',
    aliases: [],
    category: 'moderacao' 
}