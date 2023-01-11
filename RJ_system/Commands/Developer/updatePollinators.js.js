const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require('discord.js');
const mongoose = require('mongoose');
const Database = require('../../Schemas/royaldatabase');

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName('updatepollinators')
    .setDescription('Update Pollinators in database.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    interaction.reply({
      content: 'Updated Pollinators succesfully',
      ephemeral: true,
    });
  },
};
