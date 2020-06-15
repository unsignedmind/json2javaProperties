# json2javaProperties
Node script to format json files to java properties files

# Usage Example
Add as script in package.json:
`"translations-export": "node ./src/custom-scripts/translation-export.js ./src/translations/export/ ./src/translations/de-DE.json ./src/translations/en-US.json"`

The output path is `./src/translations/export/`

All arguments after the output path must also be path's to json files. All json files get formatted and exported as filename.properties.  