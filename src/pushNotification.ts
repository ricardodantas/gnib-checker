import rp = require('request-promise');

export default function pushNotification(message: string): void {
  const options = {
      method: 'POST',
      body: {
        app_key: process.env.PUSHED_APP_KEY,
        app_secret: process.env.PUSHED_APP_SECRET,
        target_type:"channel",
        target_alias: process.env.PUSHED_CHANNEL_ALIAS,
        content: message,
    },
    json: true,
    uri: 'https://api.pushed.co/1/push'
  };

  rp(options).then(function (result) {
      console.log('=====> result: ', result);
  })
  .catch(function (err) {
    console.log('===========> ',err);
  });
}
