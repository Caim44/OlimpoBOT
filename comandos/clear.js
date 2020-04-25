exports.run = async (client, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry_sign: | **Você não tem permissão para utilizar esse comando!**")
  let amount = args.join(' ')
  if(!amount) return message.reply(":no_entry_sign: | **Por favor, especifique um número de mensagens.**")
  if(isNaN(amount)) return message.reply(":no_entry_sign: | **Parece que o valor especificado, não é um número.**")
  amount++;
  if(amount > 100) return message.reply(":no_entry_sign: | **Desculpe, só consigo apagar até 100 mensagens por vez.**")
  if (amount < 1) return message.reply(":no_entry_sign: | **Insira um valor de 1 até 100.**")
  let mensagem = 'mensagens apagadas'
  await message.delete().catch()
  await message.channel.bulkDelete(amount).then(async () => {
    if (amount <= 2) mensagem = 'mensagem apagada';
    await message.reply(`:white_check_mark: | **${args[0]} ${mensagem} com sucesso! **`).then(msg => msg.delete({ timeout: 5000 }))
    
  })
  
}
exports.config = {
  name: 'clear',
  aliases: ['limpar'],
  category: 'util'
}