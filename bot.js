const Discord = require('discord.js')
const client = new Discord.Client();
const config = require("./config.json")
const fs = require('fs')
const active = new Map();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./comandos/', (err, files) => {
    if(err) return console.log(err)
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        let props = require(`./comandos/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        props.config.aliases.forEach(function (alias) {
          client.aliases.set(alias, props.config.name)
        })
    })
});
module.exports = {
  active
}
client.on("ready", () => {
    console.log(`Bot iniciado com ${client.users.cache.size} membros, em ${client.guilds.cache.size} servers!`)
  
    let status = ["| o.help", "| IP: OlimpoRankup.pvpnetwork.xyz", "| Twitter: @ROlimpotm"]

    setInterval(() => {
      let atual = status[Math.floor(Math.random() * status.length)]
      client.user.setActivity(atual, { type: 'WATCHING' })
    }, 60000)
})

client.on("guildMemberAdd", member => { 
  
    //AQUI É ONDE VAI O AUTO ROLE E A MENSAGEM DE BEM VINDO:
    let channel = member.guild.channels.cache.get("695800504718196856") //COLOQUE O ID DO CANAL ONDE TERÁ AS MENSAGENS DE BEM VINDO ENTRE AS ÁSPAS ""
    
    let role = member.guild.roles.cache.get("695800490943971361") //COLOQUE O ID DO CARGO ENTRE AS ÁSPAS ""
    member.roles.add(role)

    let WelcomeEmbed = new Discord.MessageEmbed()
    .setTitle(`Seja muito bem vindo(a) ${member.user.username} ao ${member.guild.name}!`) //Titulo da Embed de Bem vindo (Não aceita símbolos)
    .addField(":checkered_flag: | Você é o nosso membro número:", `${member.guild.members.cache.size}`) //Número do membro Embed
    .setDescription("Leia as regras para não ser punido, e claro, para ter um bom proveito do servidor!") //Descrição da Embed
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    channel.send(WelcomeEmbed)

})


client.on("message", async message => {

    let opt = {
        active: active
    }
  
      if(message.author.bot) return
      if(message.channel.type === 'dm') return
    
    let mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`]
    mention.find(mention => {
    if(message.content === mention) return message.reply(`olá! Utilize \`o.help\` para ver minha ajuda!`) //Mensagem que o bot falará quando você mencionar o bot.
      
    });

    const prefix = [config.prefix]
    prefix.find(prefix => {
        try {
            let args = message.content.slice(prefix.length).trim().split(" ")
            if(message.content.startsWith(prefix)) {
                let cmd = args.shift().toLowerCase()
                let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                if(!commandFile && message.content.startsWith(config.prefix)) {
                  return message.reply(" ❔ **| Não foi possível encontrar o comando especificado. Execute ``o.help`` para ver minha ajuda!**") //Mensagem que o bot irá enviar se você digitar um comando que não existe.
                } else if (!commandFile && message.content.startsWith(mention)) return
                commandFile.run(client, message, args, opt);
            }
        } catch (err) {
            console.log(err)
        }
    })
})

client.login(process.env.TOKEN);