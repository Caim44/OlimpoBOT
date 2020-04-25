exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":no_entry_sign: | **Você não tem permissão para executar este comando!**")
    const time = args[0]
    if(!time) return message.reply(":no_entry_sign: | **Digite um tempo válido em segundos.**")
    try {
    await message.channel.setRateLimitPerUser(time, 'Slowmode')
    await message.reply(`:white_check_mark: | **O slowmode neste canal foi definido para ${time} segundo(s).**`)
    } catch (err) {
        console.log(err)
    }
    

}
exports.config = {
    name: 'slowmode',
    aliases: ['modo-lento', 'modolento'],
    category: 'util'
}