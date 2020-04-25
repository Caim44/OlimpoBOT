const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const yts = require('yt-search')

exports.run = async (client, message, args, opt) => {
    if(!message.member.voice.channel) return message.reply("Você precisa estar conectado em um canal de voz!")
    if(!args[0]) return message.reply("Digite o nome de uma música, ou a URL dela no youtube.")
    

    let validate = await ytdl.validateURL(args[0])
    if(!validate) {
      
    }

    let info = await ytdl.getInfo(args[0])

    let data = opt.active.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        Titulo: info.title,
        cliente: message.author,
        url: args[0],
        canal: message.channel.id
    })

    if(!data.dispatcher) play(client, opt, data);
    else {
        message.channel.send(`Adicionado á lista de espera: **${info.title}** | Posição: \`${data.queue.length - 1}\` | Pedido por: ${message.author}`)
    }

    opt.active.set(message.guild.id, data);

    async function play(client, opt, data) {
        client.channels.cache.get(data.queue[0].canal).send(`Tocando agora: **${data.queue[0].Titulo}** | Pedido por: ${data.queue[0].cliente}`);
        data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}));
        data.dispatcher.guildID = data.guildID;
        
        data.dispatcher.once('finish', function() {
            finish(client, opt, data)
        })
    }
  
function finish(client, opt, dispatcher) {
    let fetched = opt.active.get(dispatcher.guildID);
    fetched.queue.shift()
    if(fetched.queue.length > 0) {
        opt.active.set(dispatcher.guildID, fetched);
        play(client, opt, fetched);

    } else {
        opt.active.delete(dispatcher.guildID);
        let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
        if(vc) vc.leave()
    }
    }
    
}
exports.config = {
    name: 'play',
    aliases: ['tocar'],
    category: 'music'
}
