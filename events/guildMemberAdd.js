const { Events } = require('discord.js');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {
        gm.updateName(member);
	},
};
