const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const Database = require("../../Schemas/royaldatabase");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("royaljelly")
    .setDescription("Give a set amount of RJ .")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("user")
        .setDescription("Select the target member")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of RJ to add")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options, guild, member } = interaction;
    const username = options.getUser("user").username;
    const user = options.getMember("user");
    const amount = options.getInteger("amount");

    let userData = await Database.findOne({ Guild: guild.id, User: user.id });
    if (!userData)
      userData = await Database.create({
        Guild: guild.id,
        User: user.id,
        Royal_Jelly: amount,
      });
    else {
      console.log(userData.Royal_Jelly);
      userData.Royal_Jelly = userData.Royal_Jelly + amount;
      console.log(userData.Royal_Jelly);
      userData.save();
    }
    user.setNickname(`${username} [${userData.Royal_Jelly}RJ]`);
    interaction.reply({
      content: `Added royal jelly to ${username}`,
      ephemeral: true,
    });
    console.log("Added");
  },
};
