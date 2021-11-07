const { SlashCommandBuilder } = require("@discordjs/builders");
const classroom = require("../classroom.js")

const listMatkul = {
  data: new SlashCommandBuilder()
    .setName("listmatkul")
    .setDescription("List Mata Kuliah"),
  execute: async (interaction) => {
    let message = 'List Mata Kuliah:\n>>> '
    
    await interaction.deferReply();
    await classroom.listMatkul()
    classroom.list.map((list, index) => {
        message+=`${index+1}. ${list}\n\n`
    })
    await interaction.editReply(message)
  },
};

module.exports = listMatkul;
