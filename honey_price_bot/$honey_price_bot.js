// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
require('dotenv').config()
const axios = require('axios');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});
// Login to Discord with your client's token
client.login(process.env.token2);

// Call api and update status every 30 seconds
const updateStatus =  () => {
  	axios.get('https://public-api.birdeye.so/public/price?address=HonyeYAaTPgKUgQpayL914P6VAqbQZPrbkGMETZvW4iN') //api call to Honey token
	  .then((res) => {
		  var value = res.data.data.value.toString().slice(0,8)
		  console.log(value)
		  client.user?.setPresence({ 
			status: 'online',
			activities: [
				{
					name: value,
					type: 'WATCHING'
				}
			]
		})
	  })
	  .catch((err) => {
		  console.log(err);
	  })
	setTimeout(updateStatus, 1000 * 30) //every 30 seconds 
}
updateStatus()