const { EmbedBuilder } = require("discord.js")

function EditReply(interaction, emoji, description, type) {

  interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor("Red")
        .setDescription(`${emoji} | ${description}`)
    ],
    ephemeral: type
  })
}

module.exports = EditReply