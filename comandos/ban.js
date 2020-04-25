const Discord = require('discord.js')
const config = require('../config.json')
const moment = require('moment')
moment.locale('pt-br')
exports.run = async(client, message, args) => {

     const helpEmbed = new Discord.MessageEmbed()
     .setTitle(`${message.guild.me.displayName} • Ban`)
     .addField("️️**⚙️ Função**", "Banir um usuário do servidor.")
     .addField("**🤔 Como utilizar?**", "Exemplo: o.ban (@usuario) [motivo]")
     .setFooter("() Obrigatório | [] Opcional")
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: | **Você não tem permissão para utilizar esse comando!**")
        let usuario = message.guild.member(message.mentions.members.first() || args[0]);
        if(!usuario) return message.channel.send(helpEmbed).then(msg => {
            message.delete({timeout: 10000})
             msg.delete({timeout: 10000})
    })

        let motivo = args.slice(1).join(" ") || "Não definido."

        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":no_entry_sign: | **Eu não tenho permissão para executar o comando!**")

        let servidor = message.guild.name
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.me.displayName + " • Banimento")
        .setDescription(`Você tem certeza que deseja banir ${usuario} do servidor?`)
        .addFields(
            {name: 'Usuário', value: usuario, inline: true },
            {name: 'Motivo', value: motivo, inline: true},
        )
        .setFooter("Comando executado por:" + message.author.username, message.author.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed).then(async msg =>{

        await msg.react('697396019226476597');
        //await msg.react('❌');
        await msg.react('697396098834366525');
        
        const confirmar = msg.createReactionCollector((r, u) => r.emoji.id === '697396019226476597' && u.id === message.author.id, { time: 300000 });
        const cancelar = msg.createReactionCollector((r, u) => r.emoji.id === '697396098834366525' && u.id === message.author.id, { time: 300000 });
        cancelar.on('collect', async r => {
            msg.delete();
            message.reply(":white_check_mark: | **Punição cancelada com sucesso!**").then(msg => msg.delete({ timeout: 5000}))
            
         }) 
        confirmar.on('collect', async r => {
            const userDM = new Discord.MessageEmbed()
            .setTitle(message.guild.me.displayName + " • Banimentos")
            .setDescription(`Desculpe, mas você foi banido do servidor.`)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Servidor', value: servidor, inline: true },
                { name: 'Motivo', value: motivo, inline: true },
                {name: 'Moderador', value: message.author.username, inline: true},
            )
            .setFooter(`Caso haja alguma incoerência, por favor contate o moderador: ${message.author.tag}`)

            //message.guild.ban(usuario, { days: dias, reason: motivo}).catch(err => console.log(err))

            msg.delete();
        let bEmbed = new Discord.MessageEmbed()
        .setTitle(message.guild.me.displayName + "• Banimentos")
        .addField("👥 Usuário:", usuario)
        .addField("<:te_donoserver:697409179467644939>  Moderador:", message.author)
        .addField("<:te_alerta:697409713431773254> Motivo:", "teste")
        .addField("📆 Data:", moment.utc(message.createdAt).format("L"))
       .setThumbnail(message.guild.iconURL())
  
            let punchannel = message.guild.channels.cache.get(config.punchannel) //ID DO CANAL DE PUNIÇÕES
            if(!punchannel) return message.reply(":no_entry_sign: | **Não foi possível encontrar o canal de punições.**")
          
          try {
            usuario.send(userDM)
            await message.guild.member(usuario).ban({
            reason: motivo,
            })
           await message.reply(":white_check_mark: | **Usuário banido com sucesso!**").then(msg => msg.delete({ timeout: 10000 }))
          punchannel.send(bEmbed)
          } catch (err) {
            message.channel.send(`**Não foi possível banir o usuário, devido ao erro:** \`${err}\``)
          }
        })        
      })
    }
exports.config = {
    name: 'ban',
    aliases: ['punir', 'banir'],
    category: 'moderacao'
}