const Discord = require("discord.js")
const client = new Discord.Client();
const db=require('quick.db')
module.exports = function (client) {
  const description = {
    name: "badwords",
    filename: "badwords.js",
    version: "1.0"
  }
const BannedWords = ["ok"]

client.on("message", message =>{ 
    if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) {
      message.delete();
      message.author.send(`<@${message.author.id}> That word is not allowed here! <:mad:890336536007155712>`)
      };
      if(message.guild){
      const user2=message.author
        let warnings = db.get(`warnings_${message.guild.id}_${user2.id}`)

      if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user2.id}`, 1)
    } else if(warnings !== null) {
      db.add(`warnings_${message.guild.id}_${user2.id}`, 1)
    }
  }
});
}