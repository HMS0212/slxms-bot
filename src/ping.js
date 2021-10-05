const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'ping',
  description: "ping cmd",
  execute(message, args, Discord) {
    const pingembed=new Discord.MessageEmbed()
  .setTitle("Ping")
  .setColor("#5271ff")
  .setDescription(`🏓Latency is ${Date.now() - message.createdTimestamp}ms.`)
  .setFooter("Ping Command")
  .setTimestamp()
  message.channel.send(pingembed)
  }
}