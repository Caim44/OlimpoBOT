const Discord = require('discord.js')
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("você não tem permissão para executar este comando!")
    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("eu não tenho permissão para executar este comando!")

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    if(!member) return message.reply("mencione um usuário!")

    let role = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name === `${args.slice(1).join(" ")}`) || message.guild.roles.cache.find(role => role.id === `${args.slice(1).join(" ")}`)
    if(!role) return message.reply("não foi possível encontrar o cargo")

    try {

        await member.roles.add(role).then(() => {
            message.reply(`:white_check_mark: | **Cargo ${role} adicionado ao usuário ${member}.`).then(async msg => msg.delete({ timeout: 10000 }))
        }).catch(err => {
            message.channel.send(`Ocorreu um erro: \`${err}\``)
        })

    } catch (err) {
        console.log(err)
    }

}
exports.config = {
    name: 'addrole',
    aliases: ['dartag', 'settag', 'setartag'],
    category: 'util'
}