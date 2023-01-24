const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
  Colors,
} = require('discord.js');
const Database = require('../../Schemas/royaldatabase');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Get your current rank and amount of RJ')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The member you want to check the rank of')
        .setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { guild, options, user } = interaction;

    const Member = options.getMember('user') || user;

    const member = guild.members.cache.get(Member.id);

    const Data = await Database.findOne({ Guild: guild.id, User: member.id });

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(
        `:white_check_mark: ${member} has not gained any Royal Jelly yet`
      );

    if (!Data) return await interaction.reply({ embeds: [embed] });

    const sortedData = await Database.find({ Guild: guild.id })
      .sort({ Royal_Jelly: -1 })
      .select('User Royal_Jelly');
    const rank = sortedData.findIndex((data) => data.User == member.id) + 1;
    const embed2 = new EmbedBuilder()
      .setColor('Orange')
      .setTitle(`${member.user.username}'s rank and Royal Jelly`)
      .setDescription(
        `:honey_pot: ${member.user.username} is ranked ${rank} and has ${Data.Royal_Jelly} RJ`
      );

    await interaction.reply({ embeds: [embed2] });
  },
};
