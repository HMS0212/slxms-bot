const Discord = require("discord.js")
const bot = new Discord.Client();
const db = require('quick.db')
module.exports = function (bot) {
  const description = {
    name: "snipe",
    filename: "snipe.js",
    version: "1.0"
  }
bot.on('messageDelete', async (message) => {
  if(message.author.id==='781734614356066324') return;
  if(message.author.id==='774769303290642432') return;
  if(message.author.id==='821736517012815882') return;
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})
bot.on('message', message => {
    if(message.content === '-snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)
        if(!msg) {
            return message.channel.send(`There is nothing to snipe smh.`)
        }
        let snipeembed = new Discord.MessageEmbed()
        .setTitle(bot.users.cache.get(senderid).username)
        .setDescription(msg)
        .setThumbnail("https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53918/camera-with-flash-emoji-clipart-xl.png")
        .setColor("#5271ff")
        .setTimestamp()
        .setFooter("Snipe Command")
        message.channel.send(snipeembed)
    }
})
}