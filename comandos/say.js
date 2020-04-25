exports.run = async (client, message, args) => {

    const falar = args.join(" ")
    if(falar == "@everyone" || falar == "@here") {
        message.channel.send("``Não é permitido @everyone ou @here pelo bot.``")
    }
    message.delete()

    if(!falar) return message.reply(":no_entry_sign: | **Digite algo.**")
    message.channel.send(falar)
}
exports.config = {
    name: 'say',
    aliases: ['falar', 'fale'],
    category: 'util'
}