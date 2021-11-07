const { SlashCommandBuilder } = require("@discordjs/builders");
const classroom = require("../classroom.js")

const login = {
  data: new SlashCommandBuilder()
    .setName("login")
    .setDescription("login to Classroom")
    .addStringOption(option => option.setName('username').setDescription('Enter Username'))
    .addStringOption(option => option.setName('password').setDescription('Enter Password')),
  execute: async (interaction) => {
    await interaction.deferReply("Pls wait, bot trying login to your account");
    const loginCookie = await classroom.login(interaction.options.getString('username'), interaction.options.getString('password'))
    await interaction.editReply(`Login success`)
  },
};

module.exports = login;
