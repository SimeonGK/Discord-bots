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
    .setName('thank')
    .setDescription('Thank someone by giving 1 RJ (only once per week).')
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName('user')
        .setDescription('Select the target member')
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member, client } = interaction;
    const user = options.getMember('user');
    const membername = await client.users.fetch(user);
    console.log(membername.username);
    let memberData = await Database.findOne({
      Guild: guild.id,
      User: member.id,
    });

    if (!memberData.WeeklyRj)
      return interaction.reply(
        `:no_entry: You already gave your 1 RJ this week`
      );

    let userData = await Database.findOne({ Guild: guild.id, User: user.id });
    if (!userData)
      return interaction.reply(`${membername} is not active in the server.`);
    userData.Royal_Jelly += 1;
    userData.save();
    interaction.reply({ content: `Succesfully gave ${membername} 1 RJ` });
    memberData.WeeklyRj = false;
    memberData.save();
    console.log('Added');
  },
};
