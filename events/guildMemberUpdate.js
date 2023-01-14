const { Events } = require('discord.js');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	once: false,
	execute(oldMember, newMember) {
		gm.updateName(newMember);
	},
};
