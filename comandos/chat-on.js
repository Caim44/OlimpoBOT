const Discord = require('discord.js')
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":no_entry_sign: | **Você não tem permissão para executar este comando!**")
    let role = message.guild.roles.cache.find(r => r.name === '@everyone')

    try {
    message.channel.createOverwrite(role, {
        SEND_MESSAGES: true
    })

    message.reply(":white_check_mark: | **Chat ligado com sucesso!**")

    } catch(err) {
        console.log(err)
    }

}
exports.config = {
    name: 'chat-on',
    aliases: ['chaton', 'lock'],
    category: 'util'
}