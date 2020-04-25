const Discord = require('discord.js')
exports.run = async(client, message, args, opus, opt) => {

    let fetched = opt.active.get(message.guild.id);
    if(!fetched) return message.reply("Não há nenhuma música tocando no momento.")
    
    let queue = fetched.queue;
    let nowPlaying = queue[0]
    
    let resp = `**${nowPlaying.Titulo} | Pedido por: ${nowPlaying.cliente}**`
    let resp2;
    for(var i = 1; i < queue.length; i++) {
        resp2 += `${i}. **${queue[i].Titulo} | Pedido por: ${queue[i].cliente}**`
    }

    let queueEmbed = new Discord.MessageEmbed()
    .setTitle('Músicas')
    .addField('Tocando no momento:', resp)
    .addField('Lista de músicas:', resp2.replace(`undefined1`, `1`))
    .setFooter(client.user.username, client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(queueEmbed)

}
exports.config = {
    name: 'queue',
    aliases: ['lista', 'músicas', 'musicas'],
    category: 'music'
}