const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    
    if(!message.guild.me.hasPermission(0x00000004)) return message.reply(":no_entry_sign: | **Eu não tenho permissão para executar este comando!**")
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: | **Você não tem permissão para executar este comando!**")

    let bUser = args[0]
    if(!bUser) return message.reply(":no_entry_sign: | **Não foi possível encontrar o usuário!**")

    message.guild.members.unban(bUser).then(() => {
        message.reply(":white_check_mark: | **O usuário foi desbanido com sucesso!**")
    }).catch(err => {
        message.reply("ocorreu um erro:" +err)
    })

}
exports.config = {
    name: 'unban',
    aliases: ['desbanir'],
    category: 'moderacao'
}