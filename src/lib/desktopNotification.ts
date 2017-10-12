import os = require('os');
import path = require('path');
import notifier = require('node-notifier');

const notificationLogoPath = path.join(__dirname, '../../images/logo.png');

export interface NotificationParams {
  title: string;
  message: string;
}

function macNotification(params: NotificationParams): void {
  const nc = new notifier.NotificationCenter();
  nc.notify({
    ...params,
    'sound': 'Basso',
    'icon': notificationLogoPath,
    'open': 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm',
    'wait': true
  });
}

function genericNotification(params: NotificationParams): void {
  notifier.notify({
    ...params,
    icon: notificationLogoPath,
    sound: true
  });
}

function windowsNotification(params: NotificationParams): void {
  const WindowsToaster = notifier.WindowsToaster;
  const wt = new WindowsToaster();
  wt.notify({
    ...params,
    icon: notificationLogoPath,
    sound: true
  });
}

export default function desktopNotification(params: NotificationParams): void {
  switch (os.type()) {
    case 'Darwin':
      macNotification(params);
      break;
    case 'Windows_NT':
      windowsNotification(params);
      break;
    default:
      genericNotification(params);
  }
}
