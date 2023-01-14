const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	once: true,
	execute(oldMember, newMember) {
		console.log(`Member Changed: ${newMember.displayName}`);
	},
};
