# Node.js-Examples

web3.js - Blockchain Listener
- Create Infura account and input connection string
- Subscribes to new Ethereum block headers
- Sends notification to all Telegram bot subscribers

index.js - Telegram Bot
- Create Telegram bot and input API token string
- /start and /stop commands (un)subscribe to notifications
- On new blocks headers, notifications sent to all subscribers