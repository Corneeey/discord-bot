const { SlashCommandBuilder } = require('discord.js');
const { namePostfix } = require('../config.json');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-names')
		.setDescription(`Makes Sure All Users Have The Postfix (${namePostfix})`),
	async execute(interaction) {
        gm.updateGuildNames(interaction.guild).then(result => {
			let reply = ``;

			if (result.updated === 1)
				reply += `Updated ${result.updated} Nickname.\n`;
			else
				reply += `Updated ${result.updated} Nicknames.\n`;

			if (result.inaccessible.length > 0){
				reply += `Couldn't Update `;

				reply += list(result.inaccessible);

				interaction.reply(reply + `.`);
			} else
				interaction.reply(reply);
		});
	},
};

// Lists Members In A Human Readable Format.
// Modified From Source:
// [https://stackoverflow.com/questions/52910787/how-to-join-array-elements-into-string-with-commas-ampersand]
function list(members){
	const names = members.map(({ displayName }) => displayName);
	const finalName = names.pop();
	return names.length
	? names.join(', ') + ' & ' + finalName
	: finalName;
  }
