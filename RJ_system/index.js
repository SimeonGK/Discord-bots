const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  RouteBases,
} = require('discord.js');
const cron = require('node-cron');
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require('./Handlers/eventHandler');
client.config = require('./config.json');
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);
client.login(client.config.token);

// Populate database
const Royaldatabase = require('./Schemas/royaldatabase');

client.on('messageCreate', (message) => {
  const { guild, author, member } = message;

  if (!guild || author.bot) return;

  Royaldatabase.findOne(
    { Guild: guild.id, User: member.id },
    async (err, data) => {
      if (err) throw err;

      if (!data) {
        if (member.roles.cache.has('929462793483190272')) {
          Royaldatabase.create({
            Guild: guild.id,
            User: member.id,
            Royal_Jelly: 100,
            WeeklyRj: true,
          });
        } else {
          Royaldatabase.create({
            Guild: guild.id,
            User: member.id,
            Royal_Jelly: 0,
            WeeklyRj: false,
          });
        }
        console.log('added User to database');
      }
    }
  );
});
