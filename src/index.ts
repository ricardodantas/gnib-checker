import notifier = require('node-notifier');
import gnibIrelandClient from 'gnib-ireland-client';
import path = require('path');
import pushNotifications from './pushNotification';
import moment = require('moment');
require('dotenv').config();

const logoPath = path.join(__dirname, '../images/logo.png');
const timeToCheck = 15000;

function gnibChecker(): void {
  gnibIrelandClient.checkSlotsAvailability(gnibIrelandClient.Types.New)
  .then((result: any) => {
    console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} - Checker response: `, JSON.stringify(result));
    if (result.status === 'success' && result.data.slots) {
      const message: Array<string> = [];
      result.data.slots.map((slot: any) => {
        message.push(slot.time);
      });
      const finalMessage = message.join('\n');
      pushNotifications(finalMessage);
      notifier.notify({
        title: 'GNIB Appointment Available',
        message: finalMessage,
        icon: logoPath,
        sound: true,
        timeout: 58,
        open: 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'
      });
    }
      setTimeout(gnibChecker, timeToCheck);
    })
    .catch((error) => {
      console.log('========> Error: ', error);
      notifier.notify({
        title: 'GNIB Appointment ERROR',
        message: JSON.stringify(error),
        icon: logoPath,
        sound: true,
        timeout: 58
      });
      setTimeout(gnibChecker, timeToCheck);
    });
}

console.log('Checker started...');
notifier.notify({
  title: 'GNIB Checker',
  message: 'Checker started...',
  icon: logoPath,
  sound: true
});

gnibChecker();
