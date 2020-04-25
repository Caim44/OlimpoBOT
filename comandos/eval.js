const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('../config.json')

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = async (client, message, args) => {
    if(!config.owners.some(owner => message.author.id === owner)) return message.channel.send(":x: Desculpe, o comando é disponível apenas para desenvolvedores.");
    
    try{
       const hEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.me.displayName} • Eval`)
     .addField("️️**⚙️ Função**", "Executar códigos em Java Script")
     .addField("**🤔 Como utilizar?**", "Exemplo: o.eval (Código)")
     .setFooter("() Obrigatório | [] Opcional")

      const code = message.content.slice(1).trim().split(" ").slice(1).join(" ")
      if (!code) return message.channel.send(hEmbed).then(msg => {
        message.delete({timeout: 10000})
         msg.delete({timeout: 10000})
      })
      
      let evaled = eval(code)
      
      if(code == "client.token") return message.reply(`\`Safado, cara de pau, tá tentando me roubar é?\``)
      
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      
      if (evaled > "2000" && evaled.length < "4000") {
        
      } else if (evaled.length > "4000" && evaled.length < "6000") {
        
      } else {
        message.channel.send(clean(evaled), {code:"xl"}, {split: "true"});
      }
      
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};
exports.config = {
    name: 'eval',
    aliases: ['e'],
    category: 'developer'

}
