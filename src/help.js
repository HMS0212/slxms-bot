const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'help',
  description: "help cmd",
  execute(message, args, Discord) {
    const helpembed=new Discord.MessageEmbed()
  .setTitle("Help")
  .setColor("#5271ff")
  .setDescription(`The commands for this bot are:\n1. Ban+User\n2. Delete+Messages to Delete\n3. Kick+User\n4. Ping\n5. Unban+User ID\n6. Warn+User+Reason\n7. Warnings+User\n8. Lock+on/off\n9. Mute+User+Time\n10. Unmute`)
  .setFooter("Help Command")
  .setTimestamp()
  .setThumbnail('https://i.ibb.co/1TDM5m1/25lQoUNz.jpg')
  message.channel.send(helpembed)
  }
}