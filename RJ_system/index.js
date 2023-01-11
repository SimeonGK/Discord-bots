const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require('discord.js');
const cron = require('node-cron');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require('./Handlers/eventHandler');
client.config = require('./config.json');
client.events = new Collection();
client.commands = new Collection();

const { connect } = require('mongoose');
connect(client.config.DatabaseURL, {}).then(() =>
  console.log('The client is now connected to the database.')
);

loadEvents(client);

client.login(client.config.token).catch(console.log(error));
