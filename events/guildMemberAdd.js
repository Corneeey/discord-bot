const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {
		console.log(`Member Joined: ${member.displayName}`);
	},
};
