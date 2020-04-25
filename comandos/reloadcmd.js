const Discord = require('discord.js')
exports.run = (client, message, args) => {
  const hEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.me.displayName} • Reiniciar Comando`)
     .addField("️️**⚙️ Função**", "Reiniciar comandos do bot")
     .addField("**🤔 Como utilizar?**", "Exemplo: m!reload (NomeDoComando)")
     .setFooter("() Obrigatório | [] Opcional")

  if(!args || args.length <1) return message.channel.send(hEmbed).then(msg => {
    message.delete({timeout:10000});
    msg.delete({timeout:10000});
  })
  const nomeComando = args[0];
  
  if(!client.commands.has(nomeComando)) {
    return message.reply(`<:te_aviso:701821465846349924> Não encontrei o comando \`${nomeComando}\``)
  }
  delete require.cache[require.resolve(`./${nomeComando}.js`)];
  client.commands.delete(nomeComando);
  const props = require(`./${nomeComando}.js`);
  client.commands.set(nomeComando, props);
  message.channel.send(`<:te_correto:697396019226476597> \`${nomeComando}\` reiniciado com sucesso.`)
};
exports.config = {
    name: 'reloadcmd',
    aliases: ['rl', 'reload'],
    category: 'developer'
}