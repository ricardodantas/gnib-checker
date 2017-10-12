import prepend = require('prepend');
import lineReader = require('readline');
import path = require('path');
import fs = require("fs");
import firstline = require('firstline');
import moment = require('moment');
import pushNotification from './pushNotification';
import desktopNotification from './desktopNotification';

const logFilePath = path.join(__dirname, '../gnib-checking.log')

export interface ConsoleOptions {
  title?: string;
  message: string;
  logFileContent?: string;
  allowPushNotification?: boolean;
  allowDesktopNotification?: boolean;
}

export function consoleLogWriteLogAndPushNotification(options: ConsoleOptions): void {
  if (options.logFileContent) {
    const logContent = `${moment().format()} ${options.logFileContent}`;
    writeLog(logContent);
    console.log(logContent);
  } else {
    console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} ${options.title} ${options.message}`);
  }
  if (options.allowPushNotification) {
    pushNotification(options.message);
  }
  if (options.allowDesktopNotification) {
    desktopNotification({
      title: options.title,
      message: options.message
    });
  }
}

export function writeLog(content: string): void {
  prepend(logFilePath, content, (error) => {
    if (error)
        console.error(error.message);
  });
}

export function searchForEntryInLog(search: string, callback: Function): void {
  firstline(logFilePath).then(result => {
    const columns = result.split(' ');
     callback(columns[1] === search);
  }).catch(error => {
    console.log(error);
  });
}
