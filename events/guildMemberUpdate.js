const { Events } = require('discord.js');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	once: false,
	execute(oldMember, newMember) {
		onGuildMemberUpdate(newMember);
	},
};

// Called When A Member Was Updated.
// Makes Sure The Member Follows Server Rules.
function onGuildMemberUpdate(newMember){
	// Updates The Roles Of The Member
    gm.updateRole(newMember);

	// Tries To Update The Name Of The Member.
	// Logs The Current Timestamp And Name If It's Invalid.
	if (gm.updateName(newMember) === newMember)
		console.log(`(${new Date().toLocaleString()}) The Name ${newMember.displayName} Is Invalid!`);
}
