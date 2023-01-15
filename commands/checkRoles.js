const { SlashCommandBuilder } = require('discord.js');
const { roleName } = require('../config.json');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-roles')
		.setDescription(`Makes Sure All Users Have The Role ${roleName}`),
	async execute(interaction) {
        gm.updateGuildRoles(interaction.guild);
        await interaction.reply(`Updated The Roles Of All Accessible Members`);
	},
};
