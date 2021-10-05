const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'kick',
  description: "kicks a user",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have someone mentioned")
    } else if(args){
    const member = message.mentions.members.first()
    const kickembed=new Discord.MessageEmbed()
  .setTitle("Kick")
  .setColor("#5271ff")
  .setDescription(`${member} is now kicked`)
  .setFooter("Kick Command")
  .setTimestamp()
  message.channel.send(kickembed)
  user.send(`You were kicked from Lxck DF's Discord Server`)

    member.kick()
    .catch(e =>{
      message.channel.send("There was an error, you can't kick this person")
      message.channel.bulkDelete(1)
      console.log('error with the kick command, its handled tho')
    })
  }
  }
}