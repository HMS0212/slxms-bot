//IMPORTANT STUFF
const Discord = require("discord.js")
const keepAlive = require("./server")
const PREFIX="-"
const bot = new Discord.Client();
const Enmap = require("enmap")
bot.points = new Enmap({ name: "points" });
const DisTube = require('distube');
const distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true, youtubeCookie: '__Secure-3PAPISID=8hoIJT50vPEtMF9M/Ams0gXiShMYGdUUqH;PREF=tz=America.New_York;'});
//COMMANDS STUFF
const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./src/${file}`);
  bot.commands.set(command.name, command);
}
//READY
bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  bot.user.setActivity(`Everyone in Slxms' server👀`,{ type: 'WATCHING' })
})
//COMMANDS
bot.on('message', async message => {
if (!message.content.startsWith(PREFIX)) return;
let args = message.content.slice(PREFIX.length).split(/ +/);
let command = args.shift().toLowerCase()
//Ping
if (command === "ping"){
bot.commands.get('ping').execute(message, args, Discord)
}
if (command === "8ball") {
  bot.commands.get('8ball').execute(message, args, Discord)
}
if (command === "avatar"){
  bot.commands.get('avatar').execute(message, args, Discord)
}
if (command === "help") {
    bot.commands.get("help").execute(message, args, Discord)
}
//Ban
if (command === "ban") {
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296'){
    bot.commands.get("ban").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Kick
if (command === "kick") {
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296'){
    bot.commands.get("kick").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
if (command === "warn") {
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296') {
	bot.commands.get("warn").run(bot, message, args)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
if (command === "warnings") {
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296') {
	bot.commands.get("warnings").run(bot, message, args)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
if (command === "lock") {
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296') {
	bot.commands.get("lock").run(bot, message, args)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
if(command==="mute"){
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296') {
    bot.commands.get('mute').execute(message, args)
    }
  else{
    message.channel.send("You cant use that!")
  }
}
if(command==="unmute"){
  if (message.member.hasPermission("ADMINISTRATOR")||message.author.id==='782391596648759296') {
    bot.commands.get('unmute').execute(message, args)
    }
  else{
    message.channel.send("You cant use that!")
  }
}
});
//MUSIC COMMANDS
bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play"||command == "p"){
        distube.play(message, args.join(" ")).catch(error=>{
          console.error(error);
          message.channel.send("Make sure you are in a voice channel");
        }) 
      }
    if (command=="loop"||command=="repeat"){
        distube.setRepeatMode(message, parseInt(args[0]));
        message.channel.send("Looping queue")
    }
    if (command == "dc"||command == "die") {
        distube.leave(message);
        message.channel.send("Disconnected");
    }
    if (command == "skip"||command == "next"){
        distube.skip(message);
        message.channel.send("Song Skipped")
    }
    if (command == "queue"||command == "q") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
    if (command == "jump"){
        distube.jump(message, parseInt(args[0]-1))
            .catch(err => message.channel.send("Invalid song number."));
        message.channel.send(`Jumped to the ${args[0]}th song`)
    }
    if (command == "pause"||command == "stop"){
        distube.pause(message)
        message.channel.send("Song Paused")
    }
    if (command == "resume"){
        distube.resume(message)
        message.channel.send("Song Resumed")
    }
    if (command == "autoplay") {
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
    if (command == "shuffle"){
        distube.shuffle(message);
        message.channel.send("Queue Shuffled")
        }
    if (command == "volume"){
      if(-1<args[0] && args[0]<151){
        distube.setVolume(message, args[0]);
        message.channel.send(`Volume set to ${args[0]}%`)
      } else{
        message.channel.send("You can't set the volume to that")
      }
    }
        if (command === "playlist") { 
       const playlist = args.join('')
       const result = await spotifyToYT.playListGet(playlist)
       console.log('We did it boys!!!!!')
       distube.playCustomPlaylist(message, result.songs).catch(e =>{
         console.error(e)
         message.channel.send('Because this is still in testing, please report your problem with this command to Hammad.S#0001 ASAP. Thank you for your understanding!')
         console.log('Fs in the chat smfh')
       })
    }
});
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("finish", (message) => 
    message.channel.send("No more songs in the queue"))
  .on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;})
  .on("playList", (message, queue, playlist, song) => message.channel.send(
    `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``));
//SNIPING
const sniping = require("./src/snipe.js");
sniping(bot)
//RANKING
const leveling = require("./src/ranking");
leveling(bot)
//WELCOME
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;
	do {
		context.font = `${fontSize -= 10}px "Uni Sans"`;
	} while (context.measureText(text).width > canvas.width - 300);
	return context.font;
};
bot.on('guildMemberAdd', async member => {
	const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('./vector.png');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);


	context.font = '28px "Uni Sans"';
	context.fillStyle = '#FFFFFF';
	context.fillText("Welcome to the Slxms' Discord,", canvas.width / 2.9, canvas.height / 3.5);

	context.font = applyText(canvas, `${member.displayName}!`);
	context.fillStyle = '#FFFFFF';
	context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	bot.channels.cache.get('894786569133768706').send(``, attachment);
  member.send('Thanks for joining the server!', attachement)

});
//BAD WORDS
const badwords = require("./src/badwords");
badwords(bot)
//LOGIN
keepAlive()
bot.login(process.env.TOKEN)