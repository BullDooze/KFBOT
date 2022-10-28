const { Client, ChatInputCommandInteraction, Role } = require("discord.js")
const Reply = require("../../Systems/Reply")
module.exports = {
  name: "addrole",
  description: "Add custom reaction role.",
  UserPerms: ["ManageRoles"],
  BotPerms: ["ManageRoles"],
  category: "Moderation",
  options: [
    {
      name: "role",
      description: "role to be assigned",
      type: "8",
      required: "true"
    },
    {
      name: "target",
      description: "user to add the role to",
      type: "6",
      required: "true"
    },
  ],
  async execute(interaction, client) {
    const { options, user, guild } = interaction;
    const role = options.getRole("role");
    const member = options.getMember("target")
    if (interaction.member.roles.highest.position >= role.position) {
      member.roles.add(role);
      interaction.reply("Role Added")
    }
    else {
      interaction.reply("You not have permission to add that role")
    }
  }
}