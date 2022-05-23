import Web3 from 'web3';
import { web3bot } from "./index.js";

/*********************************
WEB3 CONNECTION
*********************************/
// Create Infura account & input custom connection below 
const infuraConnection = /* Infura connection "String" --> */ "***********************************************************";
const web3 = new Web3(infuraConnection);

/******************************
SUBSCRIBE TO BLOCKCHAIN EVENTS
******************************/
function web3Subscribe(){
    const subscription = web3.eth.subscribe(
        'newBlockHeaders', 
            function(error, result){
                if (!error) {
                    console.log(result);
                    return;
                }
        console.error(error);
    })
    subscription.on("connected", function(subscriptionId){
        console.log(subscriptionId);
    })
    subscription.on("data", function(blockHeader){
        userNotifications.map(u => {
            const uid = u.userId;
            u.notifications === "on" && (web3bot.sendMessage(uid, "Block# " + blockHeader.number));
        })
    })
    subscription.on("error", console.error);
}

/*********************************************
BLOCKCHAIN EVENTS -- for future configurations
*********************************************/

/**********************************
EXPORTS
**********************************/
export {web3Subscribe};