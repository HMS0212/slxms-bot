const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'avatar',
  description: "gets the avatar of a user",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have a user mentioned after")
    } else {
    const user = message.mentions.users.first();
    const avatarembed=new Discord.MessageEmbed()
  .setTitle(`${user.username}'s Avatar`)
  .setColor("#5271ff")
  .setFooter("Avatar Command")
  .setImage(user.displayAvatarURL({dynamic : true, size: 1024}))
  .setTimestamp()
  message.channel.send(avatarembed)
  }
 }
}