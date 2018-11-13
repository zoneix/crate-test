'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Jabit is alive\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

console.log('got the following envs: \n');
console.log(process.env.DIALOGFLOW_TOKEN + "," + process.env.JABBER_JID + "," + process.env.JABBER_PASSWORD);
/*
Make sure you create a .env file with the following data -
JABBER_JID=user@domain.com
JABBER_PASSWORD=password
DIALOGFLOW_TOKEN=token

'use strict';
require ('dotenv').config();


const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
*/

const Botkit = require('botkit');

//https://github.com/jschnurr/botkit-middleware-dialogflow
const dialogflowMiddleware = require('botkit-middleware-dialogflow')({
    token: process.env.DIALOGFLOW_TOKEN,
    version: 'v1'
});

var controller = Botkit.jabberbot({
    json_file_store: './jabberbot/'
});

var bot = controller.spawn({
    client: {
        jid: process.env.JABBER_JID,
        password: process.env.JABBER_PASSWORD,
        //host: "cuimp-host.bigbrainpan.com",
        //port: 5222
    }
});

controller.middleware.receive.use(dialogflowMiddleware.receive);

//welcome

controller.hears(['Default Welcome Intent'], 'direct_message', dialogflowMiddleware.hears, function(
  bot,
  message
) {
  var replyText = message.fulfillment.speech;  // message object has new fields added by Dialogflow
  bot.reply(message, replyText);
});

//anything else
controller.on('direct_message', function(bot, message) {
    var replyText = message.fulfillment.speech;
    bot.reply(message, replyText);
});
