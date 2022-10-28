const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "server",
  description: "Displays the server info",
  category: "Information",


  async execute(interaction, client) {

    const EmbedGuild = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Killer Fleet')
      .setDescription('This is the server of the elite KFs, who reigned the past. We are an only pro clan, with many elite members, like HeavyFlame76 and Viplol')

      .addFields(
        { name: 'Guild Name:', value: `${interaction.guild.name}` },
        { name: 'Total Members', value: `${interaction.guild.memberCount}` },
        { name: '\u200B', value: '\u200B' },

        { name: 'Date of Creation', value: `${interaction.guild.createdAt}`, inline: true },
      )

    return interaction.reply({ embeds: [EmbedGuild] })

  }
}