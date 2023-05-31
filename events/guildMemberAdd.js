const { Events } = require('discord.js');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {
		console.log("[Event: GuildMemberAdd] User Joined The Server");
        gm.updateName(member);
        gm.updateRole(member);
	},
};
