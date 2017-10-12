import prepend = require('prepend');
import lineReader = require('readline');
import path = require('path');
import fs = require("fs");

const logPath = path.join(__dirname, '../gnib-checking.log')

export function writeLog(content: string): void {
  prepend(logPath, content, (error) => {
    if (error)
        console.error(error.message);
  });
}

export function searchForEntryInLog(lineCount: number, callback: Function) {

}
