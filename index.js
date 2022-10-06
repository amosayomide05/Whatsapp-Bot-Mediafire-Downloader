//Devloped by Amos Ayomide(amosayomide05)
const request = require('request');
const axios = require('axios');
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia} = require("whatsapp-web.js");

//Whatsapp Authentication
const client = new Client({
  puppeteer: {
    executablePath: '/usr/bin/google-chrome-stable',
  },
  authStrategy: new LocalAuth()
});

client.initialize();
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("authenticated", () => {
  console.log("Auth Completed!");
});
client.on("ready", () => {
  console.log("Bot is ready!");
});


client.on("message", (message) => {
 if (message.body.toLowerCase().includes("/mediafire ")) {
    var media_link = message.body.slice(11);
    if (media_link.includes("www.mediafire.com")) {
      if (media_link.includes("https://")) {
        message.reply("Sending, Please Wait...");

        var mediaf = "http://amosayomide05.orgfree.com/mediafire/mediafire.php?url=" + media_link;
        //Check mediafire.php for the link up

        request(mediaf, options, (error, res, body) => {
          if (error) {
            return console.log(error)
          };

          if (!error && res.statusCode == 200) {
            var mediaf = body[0].file;
            let mimetype;
            (async () => {
              const attachment = await axios.get(me, {
                responseType: 'arraybuffer'
              }).then(response => {
                mimetype = response.headers['content-type'];
                return response.data.toString('base64');
              });
              const media = new MessageMedia(mimetype, attachment, 'Mediafire Downloader', { unsafeMime: true }, { sendMediaAsDocument: true });
              client.sendMessage(message.from, media), { sendMediaAsDocument: true };
            })();
          }
        });
      }
      else {
        message.reply("Invalid Mediafire Link! Use https!");
      }
    else {
      message.reply("Invalid Mediafire Link! Don't forget to add www!");
    }
  }
}
});
