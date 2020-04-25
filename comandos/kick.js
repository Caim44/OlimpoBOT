const Discord = require('discord.js')
const config = require('../config.json')
exports.run = async (client, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
    .setTitle(message.guild.me.displayName +" • Expulsar")
    .addField("️️**⚙️ Função**", "Expulsar um usuário do servidor.")
    .addField("**🤔 Como utilizar?**", "Exemplo: o.kick (@usuario) [motivo]")
    .setFooter("() Obrigatório | [] Opcional")
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(":no_entry_sign: | **Você não tem permissão para utilizar esse comando!**")
       let usuario = message.guild.member(message.mentions.members.first() || args[0]);
       if(!usuario) return message.channel.send(helpEmbed).then(msg => {
        message.delete({timeout: 10000})
         msg.delete({timeout: 10000})
})
       

        let motivo = args.slice(1).join(" ") || "Sem Motivo";        

        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.reply(":no_entry_sign: | **Eu não tenho permissão para executar o comando!**")

        let servidor = message.guild.name
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.me.displayName + " • Expulsar")
        .setDescription(`**Você tem certeza que deseja expulsar ${usuario} do servidor?**`)
        .setThumbnail(message.guild.iconURL())
        .addFields(
            {name: 'Usuário', value: usuario, inline: true },
            {name: 'Motivo', value: motivo, inline: true}
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
            
         }) 
        confirmar.on('collect', async r => {
            const userDM = new Discord.MessageEmbed()
            .setTitle(message.guild.me.displayName + "• Expulso")
            .setDescription(`Desculpe, mas você foi expulso do servidor.`)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Servidor', value: servidor, inline: true },
                { name: 'Motivo', value: motivo, inline: true },
                {name: 'Moderador', value: message.author.username, inline: true}
            )
            .setFooter(`Caso haja alguma incoerência, por favor contate o moderador: ${message.author.tag}`)
            usuario.send(userDM)
            usuario.kick().catch(err => console.log(err))

            msg.delete();
        let kEmbed = new Discord.MessageEmbed()
        .setTitle(message.guild.me.displayName + "• Expulso")
        .addField("👥 Usuário:", message.author.username)
        .addField("<:te_donoserver:697409179467644939> Moderador:", message.author.username)
        .addField("<:te_alerta:697409713431773254> Motivo:", motivo)
        .addField("📆 Data:", message.createdAt.toLocaleString())
       .setThumbnail(message.guild.iconURL())

          let punchannel = message.guild.channels.cache.get(config.punchannel) //ID DO CANAL DE PUNIÇÕES
            if(!punchannel) return message.reply(":no_entry_sign: | **Não foi possível encontrar o canal de punições.**")
          punchannel.send(kEmbed)
          message.reply(":white_check_mark: | **Usuário expulso com sucesso!**").then(msg => msg.delete({ timeout: 10000 }))
        })
        
     })
    }
exports.config = {
    name: 'kick',
    aliases: ['chutar', 'expulsar', 'kickar'],
    category: 'moderacao'

}

