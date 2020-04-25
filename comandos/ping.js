const Discord = require('discord.js')
exports.run = async (client, message, args) => {
  
        var pingbot = `${Date.now() - message.createdTimestamp}`
        
        message.channel.send(`🏓 Pong! ${pingbot}ms. A Latencia da API é ${Math.round(client.ws.ping)}ms`);

}
exports.config = {
    name: 'ping',
    aliases: [],
    category: 'util'
  }
