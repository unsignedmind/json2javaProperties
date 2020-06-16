const fs = require('fs');
const path = require('path');
const os = require('os');

const files = process.argv.slice(3);
const outputPath = process.argv[2];

for (let filePath of files) {
  const fileName = extractFileName(filePath);
  fs.readFile(path.normalize(filePath), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    data = JSON.stringify(flattenJson(JSON.parse(data)), null, '\t');
    data = json2javaProperties(data);
    saveFile(fileName, data);
  });
}

/**
 *
 * @param fileName
 * @param data = formatted string
 */
function saveFile(fileName, data) {
  if(fileName !== '' && data !== '') {
    if (!fs.existsSync(outputPath)){
      fs.mkdirSync(outputPath);
    }
    fs.writeFile(path.normalize(`${outputPath}${fileName}.properties`), data, function (err) {
      if (err) return console.log(err);
    });
  }
}

function extractFileName(filePath) {
  const segments = filePath.split('/');
  return segments[segments.length -1].replace('.json', '');
}

/**
 *
 * @param toBeFormatted flat stringified json
 * @returns {string} with line breaks in properties format
 */
function json2javaProperties(toBeFormatted) {
  // remove parenthese
  toBeFormatted = toBeFormatted.split('{').join('');
  toBeFormatted = toBeFormatted.split('}').join('');
  // change value assignment
  toBeFormatted = toBeFormatted.split('": ').join('=');
  // remove comma at line end
  toBeFormatted = toBeFormatted.split('",').join('');
  // mark escaped quotation marks
  toBeFormatted = toBeFormatted.split('\\"').join('\\#');
  // delete remaining quotation marks
  toBeFormatted = toBeFormatted.split('"').join('');
  // add marked quotation marks again
  toBeFormatted = toBeFormatted.split('\\#').join('\\"');
  // remove empty lines in between
  toBeFormatted = toBeFormatted.split('\t').join('');
  // remove empty lines at the file start
  toBeFormatted = toBeFormatted.trim();
  return toBeFormatted
}

/**
 * Code is taken from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
 * Question Author: https://stackoverflow.com/users/884862/louis-ricci
 * @param data parsed JSON
 */
function flattenJson(data) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + "[" + i + "]");
      if (l === 0) {
        result[prop] = [];
      }
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }
  recurse(data, "");
  return result;
}

