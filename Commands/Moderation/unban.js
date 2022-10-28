const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, time } = require("discord.js")
const ms = require("ms")
const EditReply = require("../../Systems/EditReply")
const Reply = require("../../Systems/Reply")

module.exports = {
  name: "unban",
  description: "Unban a member from the server",
  UserPerms: ["BanMembers"],
  BotPerms: ["BanMembers"],
  category: "Moderation",
  options: [
    {
      name: "user-id",
      description: "Provide the user id",
      type: 3,
      required: true
    },

  ],

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {

    await interaction.deferReply({ ephemeral: true })

    const { options, user, guild } = interaction



    const id = options.getString("user-id")
    if (isNaN(id)) return EditReply(interaction, "❌", `Please provide a valid ID in numbers!`)
    const bannedMembers = await guild.bans.fetch()
    if (!bannedMembers.find(x => x.user.id === id)) return EditReply(interaction, "❌", "The user is not banned, yet!")



    const member = options.getMember('user')
    const reason = options.getString('reason') || "no reason provided"

    if (member.id === user.id) return EditReply(interaction, "❌", `You cant unban yourself`)
    if (guild.ownerId === member.id) return EditReply(interaction, "❌", `You cant unban the server owner (how was he banned? lmao)`)
    if (guild.members.me.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `You cant unban a member of your same level or higher!`)
    if (interaction.member.roles.highest.position <= member.roles.highest.position) return EditReply(interaction, "❌", `I cant unban a member of my same level or higher!`)

    const Embed = new EmbedBuilder()
      .setColor("Red")

    const row = new ActionRowBuilder().addComponents(

      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId("unban-yes")
        .setLabel("Yes"),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("unban-no")
        .setLabel("No")

    )

    const Page = await interaction.editReply({

      embeds: [
        Embed.setDescription(`**⚠️ ! Do you really want to unban this member?**`)
      ],
      components: [row]
    })

    const col = await Page.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: ms("15s")
    })

    col.on("collect", i => {

      if (i.user.id !== user.id) return

      switch (i.customId) {

        case "unban-yes": {

          guild.members.unban(id)

          interaction.editReply({
            embeds: [
              Embed.setDescription(`✅ | User has been unbanned`)
            ],
            components: []
          })


        }


          break;

        case "unban-no": {
          interaction.editReply({
            embeds: [
              Embed.setDescription(`✅ | unban request cancelled`)
            ],
            components: []
          })
        }
          break
      }

    })

    col.on("end", (collected) => {

      if (collected.size > 0) return

      interaction.editReply({
        embeds: [
          Embed.setDescription(`❌ | You didn't provide a valid response in time!`)
        ],
        components: []
      })
    })
  }
}