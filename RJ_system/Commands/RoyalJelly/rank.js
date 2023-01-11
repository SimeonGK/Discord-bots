const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const Database = require('../../Schemas/royaldatabase');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Get your current rank and amount of RJ')
    .setDMPermission(false),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const rank = 1;
    const { guild, member } = interaction;
    let userData = await Database.findOne({ Guild: guild.id, User: member.id });
    if (!userData) {
      interaction.reply({
        content: "You don't have any Royal Jelly yet",
        ephemeral: true,
      });
    } else {
      console.log(userData.Royal_Jelly);
      interaction.reply({
        content: `You have rank ${rank}, with ${userData.Royal_Jelly} Royal Jelly`,
        ephemeral: true,
      });
    }
    console.log('Showed');
  },
};
