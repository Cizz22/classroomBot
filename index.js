const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs")
require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
});

client.on("ready", () => {
  console.log("Discord Client Ready");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(`${process.env.DISCORD_TOKEN}`);
