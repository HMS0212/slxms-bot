const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lock',
	category: 'moderation',
	run: async (client, message, args) => {
		const channels = message.guild.channels.cache.filter((ch) => ch.type !== 'category');
		if (args[0] === 'on') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
				})
			});
			return message.channel.send('All channels are locked');
		} if (args[0] === 'off') {
			channels.forEach((channel) => {
				channel.updateOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: true,
				})
			});
			return message.channel.send('All channels are unlocked');
		}
		return '';
	},
};