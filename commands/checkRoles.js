const { SlashCommandBuilder } = require('discord.js');
const { roleName } = require('../config.json');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-roles')
		.setDescription(`Makes Sure All Users Have The Role ${roleName}`),
	async execute(interaction) {
        gm.updateGuildRoles(interaction.guild).then((updatedRoles) => {
			if (updatedRoles === 0)
				interaction.reply(`All Users Have The Role ${roleName}.`);
			else
				interaction.reply(`Gave ${updatedRoles} Users The Role ${roleName}.`);
		});
	},
};