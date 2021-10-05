const Discord = require("discord.js")
module.exports = {
  name: '8ball',
  description: "8ball command",
  async execute(message, args, Discord) {
    let question = args[0]
    if (!question) {
      message.channel.send("Make sure you have a question after")
    }
    else {

      let responses = ["As I see it, yes.", "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."]

      let response = Math.floor(Math.random() * responses.length)
    const eightballembed= new Discord.MessageEmbed()
  .setTitle("8Ball")
  .setDescription(responses[response])
  .setTimestamp()
  .setFooter("8Ball Command")
  .setColor("#5271ff")
   message.channel.send(eightballembed)

    }
  }
}