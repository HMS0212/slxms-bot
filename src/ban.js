const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'ban',
  description: "bans a user",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have someone mentioned")
    } else if(args){
    const user = message.mentions.users.first();
    const banembed=new Discord.MessageEmbed()
  .setTitle("Ban")
  .setColor("#5271ff")
  .setDescription(`${user} is now banned`)
  .setFooter("Ban Command")
  .setTimestamp()
  message.channel.send(banembed)
  user.send(`You were banned from Lxck DF's Discord Server`)
  message.guild.members.ban(user).catch(e =>{
      message.channel.send("There was an error, you can't ban this person")
      message.channel.bulkDelete(1)
      console.log('error with the kick command, its handled tho')
    })
  }
  }
}