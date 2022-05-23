import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { web3Subscribe } from "./web3.js";

/***********************************
USER CONFIG STATE -- move this to db
************************************/
global.userNotifications = [];
function findUser(userId, notifications) {
    const existing = userNotifications.map(u => u.userId).indexOf(userId);
    console.log("existing: " + existing);
    try{
        const updateUsers = 
            existing >= 0 ?
            (
                userNotifications = [...userNotifications],
                userNotifications[existing] = {userId, notifications}
            ) : 
            userNotifications = [...userNotifications, 
                {
                    "userId":   userId,
                    "notifications":  notifications
                }
            ]
    } catch (error) {  console.error(error); }
}

/*********************************
BLOCKCHAIN LISTENER
*********************************/
web3Subscribe();

/*********************************
TELEGRAM BOT FUNCTIONS
*********************************/
// Create a telegram bot via BotFather and input custom API Token below 
const telegramBotAPIToken = /* API Token "String" --> */ "**********************************************";

// Initialize a new connection with polling to fetch new updates
const web3bot = new TelegramBot(telegramBotAPIToken, {polling: true});

// Listen for new telegram messages
web3bot.on('message', message => {
    switch(message.text) {
        case "/start":
            try{
                findUser(message.from.id, "on");
                web3bot.sendMessage(
                    message.chat.id, 
                    'This bot will notify you of new Ethereum blocks.\nSend the "/stop" command to stop notifications.'
                );
            } catch (error) {console.error(error)};
            console.log(userNotifications);
            break;
        case "/stop":
            try{
                findUser(message.from.id, "off");     
                web3bot.sendMessage(
                    message.chat.id, 
                    'Stopping new block notifications.'
                );
            } catch (error) {console.error(error)};
            console.log(userNotifications);
            break;
        default:
            break;
      } 
});

/*************************************************************
EXPRESS SERVER -- only if needed for hosting to launch web app
*************************************************************/
const app = express();
app.get('/', (req, res) => {
  res.send('ok');
});
app.listen(8080, () => { console.log("Server started on port 8080 \nlocalhost:8080") });

/***************
EXPORTS
***************/
export {web3bot};