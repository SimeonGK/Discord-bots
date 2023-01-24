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
    .setName('leaderboard')
    .setDescription('Show the top 10')
    .setDMPermission(false),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { guild, client } = interaction;

    let text = '';

    const embed = new EmbedBuilder()
      .setColor('Orange')
      .setDescription(`:white_check_mark: No one is in the leaderboard yet.`);

    const sortedData = await Database.find({ Guild: guild.id })
      .sort({ Royal_Jelly: -1 })
      .select('User Royal_Jelly')
      .limit(10);

    if (!sortedData) return interaction.reply({ embeds: [embed] });

    await interaction.deferReply();

    for (let counter = 0; counter < sortedData.length; counter++) {
      let { User, Royal_Jelly } = sortedData[counter];
      console.log(User);
      const member = await client.users.fetch(User);
      const memberTag = member.tag;
      text += `${counter + 1}. ${memberTag} | Royal Jelly: ${Royal_Jelly} \n`;

      const embed2 = new EmbedBuilder()
        .setColor('Orange')
        .setTitle(`${interaction.guild.name}'s Royal Jelly leaderboard`)
        .setDescription(`\`\`\`${text}\`\`\``)
        .setTimestamp()
        .setFooter({ text: 'Royal Jelly leaderboard' });

      interaction.editReply({ embeds: [embed2] });
    }
  },
};
