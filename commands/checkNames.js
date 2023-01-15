const { SlashCommandBuilder } = require('discord.js');
const { namePostfix } = require('../config.json');

const gm = require('../utils/guildMemberUtils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-names')
		.setDescription(`Makes Sure All Users Have The Postfix (${namePostfix})`),
	async execute(interaction) {
        gm.updateGuildNames(interaction.guild);
        await interaction.reply(`Updated The Names Of All Members`);
	},
};
