const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	once: false,
	execute(oldMember, newMember) {
		console.log(`Member Changed: ${newMember.displayName}`);
	},
};
