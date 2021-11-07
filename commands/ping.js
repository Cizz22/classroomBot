const { SlashCommandBuilder } = require("@discordjs/builders");

const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  execute: async (interaction) => {
    await interaction.reply("pong");
  },
};

module.exports = ping;
