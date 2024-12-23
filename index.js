const { Client } = require('discord.js-selfbot-v13');
const keep_alive = require('./keep_alive');

const client = new Client({
  checkUpdate: false,
  syncStatus: false,
});

const botId = "270904126974590976"; 
const testChannelId = "1320839853289640037"; 
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async (message) => {
  if (message.channel.type === "DM" && message.author.id === botId) {
    if (message.embeds.length > 0) {
      const embed = message.embeds[0];
      
      if (embed.title === "Reminder!" && embed.description && embed.description.includes("drops")) {
        console.log("Received a valid 'Reminder!' embed with 'drops' in description.");
        
        const testChannel = await client.channels.fetch(testChannelId);
        testChannel.send("pls drops");
      }
    }
  }


  if (message.channel.id === testChannelId && message.author.id === botId) {
    if (message.embeds.length > 0) {
      const embed = message.embeds[0];

      if (embed.title === "Drops") {
        console.log("Received a 'Drops' embed from the bot.");

        let buyButtonFound = false;
        let newBuyButtonId = null;

        message.components.forEach(row => {
          row.components.forEach(button => {
            if (button.label && button.label.toLowerCase().includes("buy 1 penguin pet")) {
              newBuyButtonId = button.customId;
              console.log(`Found 'Buy 1 Penguin Pet' button with customId: ${newBuyButtonId}`);
            }
          });
        });

        if (newBuyButtonId && !buyButtonFound) {
          const buttonPress = {
            customId: newBuyButtonId,
          };
          
          console.log(`Pressing the button with customId: ${newBuyButtonId}`);

          buyButtonFound = true;
        } else {

          setTimeout(async () => {
            const testChannel = await client.channels.fetch(testChannelId);
            testChannel.send("pls drops");
          }, 7000); 
        }
      }
    }
  }


    // After pressing 'Buy 1 Penguin Pet', check for confirmation with "Yes" and "No" buttons
    if (message.channel.id === testChannelId && message.author.id === botId) {
      if (message.embeds.length > 0) {
        const embed = message.embeds[0];
  
        if (embed.title && embed.title.toLowerCase().includes("buy")) {
          console.log("Received a confirmation prompt with 'Yes' and 'No' buttons. (New Message)");
  
          let confirmButtonFound = false;
          let confirmYesButtonId = null;
  
          message.components.forEach(row => {
            row.components.forEach(button => {
              if (button.label && button.label === "Yes") {
                confirmYesButtonId = button.customId;
                console.log(`Found 'Yes' button with customId: ${confirmYesButtonId}`);
              }
            });
          });
  
          if (confirmYesButtonId && !confirmButtonFound) {
            const buttonPress = {
              customId: confirmYesButtonId,
            };
  
            console.log(`Confirming by pressing 'Yes' button with customId: ${confirmYesButtonId}`);
  
            confirmButtonFound = true;
          }
        }
      }
    }


  if (message.channel.id === testChannelId) {
    if (message.content === 'test') {
      const dchannel = await client.channels.fetch(testChannelId);
      dchannel.send("testing");
    }
  }
});


client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (newMessage.channel.id === testChannelId && newMessage.author.id === botId) {
    if (newMessage.embeds.length > 0) {
      const embed = newMessage.embeds[0];

      if (embed.title && embed.title.toLowerCase().includes("buy")) {
        console.log("Received a confirmation prompt with 'Yes' and 'No' buttons (Updated message).");

        let confirmButtonFound = false;
        let confirmYesButtonId = null;

        newMessage.components.forEach(row => {
          row.components.forEach(button => {
            if (button.label && button.label === "Yes") {
              confirmYesButtonId = button.customId;
              console.log(`Found 'Yes' button with customId: ${confirmYesButtonId}`);
            }
          });
        });

        if (confirmYesButtonId && !confirmButtonFound) {
          const buttonPress = {
            customId: confirmYesButtonId,
          };

          console.log(`Confirming by pressing 'Yes' button with customId: ${confirmYesButtonId}`);

          confirmButtonFound = true;
        }
      }
    }
  }
});

client.login(process.env.token);
