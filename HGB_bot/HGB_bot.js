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
client.login(process.env.token1);

// Call api and alternate updating FP with listing every 30 seconds
const updateFloorPrice = () => {
  	axios.get('https://api-mainnet.magiceden.dev/v2/collections/honey_genesis_bee/stats') //api call magic eden
	  .then((res) => {
		  var floorPrice = res.data.floorPrice/1000000000 
		  console.log(floorPrice)
		  client.user?.setPresence({ 
			status: 'online',
			activities: [
				{
					name: `FP: ${floorPrice} ◎`,
					type: 'WATCHING'
				}
			]
		})
	  })
	  .catch((err) => {
		  console.log(err);
	  })
	setTimeout(updateListed, 1000 * 20) //every 20 seconds 
}

const updateListed = () => {
	axios.get('https://api-mainnet.magiceden.dev/v2/collections/honey_genesis_bee/stats') //api call to Magic eden
	.then((res) => {
		var listedCount = res.data.listedCount
		console.log(listedCount)
	  client.user?.setPresence({ 
		  status: 'online',
		  activities: [
			  {
				  name: `Listed: ${listedCount}`,
				  type: 'WATCHING'
			  }
		  ]
	  })
	})
	.catch((err) => {
		console.log(err);
	})
  setTimeout(updateFloorPrice, 1000 * 20) //every 20 seconds 
}
updateFloorPrice()