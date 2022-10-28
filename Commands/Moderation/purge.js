const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, time } = require("discord.js")
const ms = require("ms")
const EditReply = require("../../Systems/EditReply")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "purge",
  description: "Deletes an amount of message",
  UserPerms: ["ManageMessages"],
  BotPerms: ["ManageMessages"],
  category: "Moderation",
  options: [{
    name: "amount",
    description: "Number of messages to purge",
    type: 4,
    required: true
  }

             /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
            

  ], async execute(interaction, client) {

    await interaction.deferReply({ ephemeral: true })

    const { options, user, guild } = interaction

    const amount = options.getInteger("amount")
    interaction.channel.bulkDelete(amount, true)

    await EditReply(interaction, "✅", `Sucessfully Deleted ${amount} amount of messages!`)
  }
}  //fixed, what was changed?