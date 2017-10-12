import notifier = require('node-notifier');
import gnibIrelandClient from 'gnib-ireland-client';
import path = require('path');

const logoPath = path.join(__dirname, '../images/logo.png');

function gnibChecker() {
  gnibIrelandClient.checkSlotsAvailability(gnibIrelandClient.Types.New)
  .then(function (result) {
    console.log('Checked with result: ', result);
    if (result.status === 'success' && result.data.slots) {
      const message = [];
      result.data.slots.map((slot) => {
        message.push(slot.time);
      });
      notifier.notify({
        title: 'GNIB Appointment Available',
        message: message.join('\n'),
        icon: logoPath,
        sound: true,
        timeout: 58,
        open: 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'
      });
    }
    setTimeout(gnibChecker, 60000);
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
