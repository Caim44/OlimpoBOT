const Discord = require('discord.js')
const yts = require('yt-search')
exports.run = async(client, message, args, opt) => {

    yts(args.join(' '), function(err, res) {
        if(err) console.log(err)

        var videos = res.videos.slice(0, 10)
        let resp = ''

        for(var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\n\``;
        }

        let embed = new Discord.MessageEmbed()
        .addField(`Resultado para ${args.join(' ')}`, `${resp}`)
        message.channel.send(embed)
        resp += `**Escolha um número de** \`1-${videos.length}\``

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0
        const collector = message.channel.createMessageCollector(filter);
        collector.once('collect', function(m) {

            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [videos[parseInt(m.content)-1].url], opt);
        })

    })

}
exports.config = {
    name: 'search',
    aliases: [],
    category: 'music'
}