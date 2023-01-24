const { ActivityType } = require('discord.js');
const { loadCommands } = require('../../Handlers/commandHandler');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Client logged in as ${client.user.username}`);

    await mongoose.connect(client.config.DatabaseURL || '', {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log('The database is running!');
    }

    client.user.setActivity('Beekeeping', { type: ActivityType.Playing });
    loadCommands(client);
  },
};
