// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
require('dotenv').config()
//const { token } = require('./config.json') 
const axios = require('axios');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});
// Login to Discord with your client's token
client.login(process.env.token1);
// Call api and update every 1 minute
const updateFloorPrice = () => {
  	axios.get('https://api-mainnet.magiceden.dev/v2/collections/honey_genesis_bee/stats') //api call magic eden
	  .then((res) => {
		  var floorPrice = res.data.floorPrice/1000000000 
		  var volume = res.data.volumeAll/1000000000
		  var listedCount = res.data.listedCount
		  console.log(floorPrice)
		  console.log(volume.toFixed(2))
		  console.log(listedCount)
		  client.user?.setPresence({ 
			status: 'online',
			activities: [
				{
					name: `◎ All: ${volume.toFixed(2)}`,
					type: 'WATCHING'
				}
			]
		})
		client.user?.setUsername(`🐝  ◎${floorPrice}|${listedCount}`)
	  })
	  .catch((err) => {
		  console.log(err);
	  })
	setTimeout(updateFloorPrice, 1000 * 60) //every 20 seconds 
}
updateFloorPrice()