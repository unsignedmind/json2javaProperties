/*
* Author: Unsignedmind
* Description: Node script to format json files to java properties files
* package.json: "translations-export": "node ./src/custom-scripts/translation-export.js ./src/translations/export/ ./src/translations/de-DE.json ./src/translations/en-US.json",
* */
const fs = require('fs');

const files = process.argv.slice(3);
const outputPath = process.argv[2];

for (let filePath of files) {
  const fileName = extractFileName(filePath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return console.log(err);
    data = JSON.stringify(flattenJson(JSON.parse(data)), null, '\t');
    data = json2javaProperties(data);
    saveFile(fileName, data);
  });
}

function saveFile(fileName, data) {
  if(fileName !== '' && data !== '') {
    if (!fs.existsSync(outputPath)){
      fs.mkdirSync(outputPath);
    }
    fs.writeFile(`${outputPath}${fileName}.properties`, data, function (err) {
      if (err) return console.log(err);
    });
  }
}

function extractFileName(filePath) {
  const segments = filePath.split('/');
  return segments[segments.length -1].replace('.json', '');
}

function json2javaProperties(data) {
  data = data.split('{').join('');
  data = data.split('}').join('');
  data = data.split('": ').join('=');
  data = data.split('",').join('');
  data = data.split('"').join('');
  data = data.split('\t').join('');
  data = data.trim();
  return data
}

function flattenJson(data) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + "[" + i + "]");
      if (l === 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

