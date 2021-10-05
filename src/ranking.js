const Discord = require("discord.js")
const fetch = require("node-fetch");
const bot = new Discord.Client();
const PREFIX="!"
const Enmap = require("enmap")
const canvacord = require("canvacord")
bot.points = new Enmap({ name: "points" });
bot.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
const defaultSettings = {	
  invites: "off",
  levels: "off"
}
module.exports = function (bot) {
  const description = {
    name: "leveling",
    filename: "leveling.js",
    version: "2.0"
  }
  //voice state update event to check joining/leaving channels
  bot.on("message", async (message) => {
    if (message.guild&&message.guild.id==='894786568429121537'){
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.channel.type === `dm`) return;
    if(guildConf.levels == "on"){
    //////////////////////////////////////////
    /////////////RANKING SYSTEM///////////////
    //////////////////////////////////////////
    //get the key of the user for this guild
    const key = `${message.guild.id}-${message.author.id}`;
    // do some databasing
    bot.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });
    //create message length basically math for not too much xp for too long messages
    var msgl = message.content.length;
    //if too short the message
    if (msgl >= 50) {
      //get a random num between 0 and 2 rounded
      var randomnum =Math.floor(Math.random() * 20)+1
      //basically databasing again
      bot.points.math(key, `+`, randomnum, `points`)
      bot.points.inc(key, `points`);
    }
    //if not too short do this
    else {
      //get a random num between rounded but it belongs to message length
      var randomnum = Math.floor(Math.random() * 10)+1
      //basically databasing again
      bot.points.math(key, `+`, randomnum, `points`)
      bot.points.inc(key, `points`);
    }
    //get current level
    const curLevel = Math.floor(0.1 * Math.sqrt(bot.points.get(key, `points`)));
    //if its a new level then do this
    if (bot.points.get(key, `level`) < curLevel) {
      //define ranked embed
      const embed = new Discord.MessageEmbed()
        .setTitle(`Ranking of:  ${message.author.username}`)
        .setTimestamp()
        .setDescription(`You've leveled up to Level: **\`${curLevel}\`**! (Points: \`${Math.floor(bot.points.get(key, `points`) * 100) / 100}\`) `)
        .setColor("#5271ff");
      //send ping and embed message
      message.author.send(embed);
      //set the new level
      bot.points.set(key, curLevel, `level`);
    }
    //else continue or commands...
    //
    if (message.content.toLowerCase().startsWith(`${PREFIX}rank`)) {
      //get the rankuser
      let rankuser = message.mentions.users.first() || message.author;
      bot.points.ensure(`${message.guild.id}-${rankuser.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      });
      //do some databasing
      const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, message.guild.memberCount);
      let i = 0;
      //count server rank sometimes an error comes
      for (const data of top10) {
        try {
          i++;
          if (bot.users.cache.get(data.user).tag === rankuser.tag) break;
        } catch {
          i = `Error counting Rank`;
          break;
        }
      }
      const key = `${message.guild.id}-${rankuser.id}`;
      //math
      let curpoints = Number(bot.points.get(key, `points`).toFixed(2));
      //math
      let curnextlevel = Number(((Number(1) + Number(bot.points.get(key, `level`).toFixed(2))) * Number(10)) * ((Number(1) + Number(bot.points.get(key, `level`).toFixed(2))) * Number(10)));
      //if not level == no rank
      if (bot.points.get(key, `level`) === undefined) i = `No Rank`;
      //global local color var.
      let color='#5271ff';
      //define the ranking card
      const rank = new canvacord.Rank()
        .setAvatar(rankuser.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setCurrentXP(Number(curpoints.toFixed(2)), '#5271ff')
        .setRequiredXP(Number(curnextlevel.toFixed(2)), '#5271ff')
        .renderEmojis(true)
        .setProgressBar('#5271ff', "COLOR")
        .setRankColor('#5271ff', "COLOR")
        .setLevelColor('#5271ff', "COLOR")
        .setUsername(rankuser.username, '#5271ff')
        .setRank(Number(i), "Rank", true)
        .setLevel(Number(bot.points.get(key, `level`)), "Level", true)
        .setDiscriminator(rankuser.discriminator, '#5271ff');
      rank.build()
        .then(async data => {
          //add rankcard to attachment
          const attachment = new Discord.MessageAttachment(data, "RankCard.png");
          //define embed
          message.channel.send(attachment)
        });
    }
    //leaderboard command
    if (message.content.toLowerCase() === `${PREFIX}leaderboard`||message.content.toLowerCase() === `${PREFIX}lb`) {
      //some databasing and math
      const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, 10);
      const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}: Leaderboard`)
        .setTimestamp()
        .setDescription(`Top 10 Ranking:`)
        .setColor("#5271ff");
      //set counter to 0
      let i = 0;
      //get rank 
      for (const data of top10) {
      try {
          i++;
          embed.addField(`**${i}**. ${bot.users.cache.get(data.user).tag}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
        } catch {
          i++; //if usernot found just do this
          embed.addField(`**${i}**. ${bot.users.cache.get(data.user)}`, `Points: \`${Math.floor(data.points * 100) / 100}\` | Level: \`${data.level}\``);
        }
      }
      //schick das embed
      return message.channel.send(embed);
    }
    }
  }
  })
}