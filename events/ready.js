const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`[Event: Ready] Logged in as ${client.user.tag}`);
	},
};
