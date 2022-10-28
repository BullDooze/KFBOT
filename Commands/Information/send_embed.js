const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "embed",
  description: "Sends your message in an embedded form.",
  category: "Information",
  options: [{
    name: "title",
    description: "The title of your embed.",
    type: 3,
    required: true
  }, {
    name: "content",
    description: "Content (that will be displayed in an embedded form).",
    type: 3,
    required: true
  }]
  ,
  async execute(interaction, client) {
    const { options } = interaction
    const embed = new EmbedBuilder().setTitle(options.getString("title")).setDescription(options.getString("content"))
    return interaction.reply({ embeds: [embed] });
  }
}