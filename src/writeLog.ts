import fs = require('fs');
import path = require('path');

const logPath = path.join(__dirname, '../gnib-checking.log')

export default function writeLog(content: string): void {
  const logStream = fs.createWriteStream(logPath, {'flags': 'a'});
  logStream.write(`${content}\n`);
  logStream.end();
}
