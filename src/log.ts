import prepend = require('prepend');
import lineReader = require('readline');
import path = require('path');
import fs = require("fs");
import firstline = require('firstline');

const logPath = path.join(__dirname, '../gnib-checking.log')

export function writeLog(content: string): void {
  prepend(logPath, content, (error) => {
    if (error)
        console.error(error.message);
  });
}

export function searchForEntryInLog(search: string, callback: Function): void {
  firstline(logPath).then(result => {
    const columns = result.split(' ');
     callback(columns[1] === search);
  }).catch(error => {
    console.log(error);
  });
}
