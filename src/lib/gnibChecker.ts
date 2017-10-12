require('dotenv').config();
import gnibIrelandClient from 'gnib-ireland-client';
import { writeLog, searchForEntryInLog, consoleLogWriteLogAndPushNotification } from './log';

export function gnibChecker(): void {
  gnibIrelandClient.checkSlotsAvailability(gnibIrelandClient.Types.New).then((result: any) => {
    consoleLogWriteLogAndPushNotification({
      title: 'CHECKER RESPONSE:',
      message: JSON.stringify(result),
      allowPushNotification: false,
      allowDesktopNotification: false
    });
    if (result.status === 'success' && result.data.slots) {
      const message: Array<string> = [];
      const availableSlotIds: Array<string> = [];
      result.data.slots.map((slot: any) => {
        consoleLogWriteLogAndPushNotification({
          message: JSON.stringify(result),
          logFileContent: slot.id,
          allowPushNotification: false,
          allowDesktopNotification: false
        });
        message.push(slot.time);
        availableSlotIds.push(slot.id);
      });
      searchForEntryInLog(availableSlotIds[0], (condition) => {
        if (!condition) {
          consoleLogWriteLogAndPushNotification({
            title: 'GNIB Appointments',
            message: message.join('\n'),
            logFileContent: 'NOT_AVAILABLE_SLOTS',
            allowPushNotification: true,
            allowDesktopNotification: true
          });
        }
      });
    } else if (result.status === 'success' && result.data.empty === 'TRUE') {
      consoleLogWriteLogAndPushNotification({
        title: 'GNIB Appointments',
        message: 'Appointments not available.',
        logFileContent: 'NOT_AVAILABLE_SLOTS',
        allowPushNotification: false,
        allowDesktopNotification: false
      });
    }
    })
    .catch((error) => {
      consoleLogWriteLogAndPushNotification({
        title: 'GNIB Appointments',
        message: JSON.stringify(error),
        logFileContent: JSON.stringify(error),
        allowPushNotification: false,
        allowDesktopNotification: true
      });
    });
}

export function initGnibChecker(repeatSeconds: number = 15): void {
  consoleLogWriteLogAndPushNotification({
    title: 'GNIB Checker',
    message: 'Checker started...',
    logFileContent: 'STARTED',
    allowDesktopNotification: true
  });
  setInterval(gnibChecker, repeatSeconds * 1000);
}
