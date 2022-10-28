const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "user",
  description: "Displays your user info",
  category: "Information",
  async execute(interaction, client) {
    const Userinfo = new EmbedBuilder()
      .setTitle('User Info')
      .setDescription('Your User Information')
      .addFields(
        { name: 'Your User Tag', value: `${interaction.user.tag}` },
        { name: 'Your User Id', value: `${interaction.user.id}` },


      )
    return interaction.reply({ embeds: [Userinfo] });
  }
}