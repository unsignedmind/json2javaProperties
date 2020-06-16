# json2javaProperties
Node script to format json files to java properties files

# Usage Example
Add as script in package.json:
`"translations-export": "node ./custom-scripts/translation-export.js ./translations/export/ ./translations/de.json ./translations/en-US.json"`

The output path is `./src/translations/export/`

All arguments after the output path must also be path's to json files. All json files get formatted and exported as filename.properties.  

# I/O
Input
```json
{
  "quotationMarks": {
    "prefix": "No results for \"",
    "suffix": "\". Try again."
  },
  "longCommaSentence": "Sentences, which are long, could contain comma chars",
  "Key with whitespaces !": "a value"
}
```
Output
```properties
quotationMarks.prefix=No results for \"
quotationMarks.suffix=\". Try again.
longCommaSentence=Sentences, which are long, could contain comma chars
Key with whitespaces !=a value
```
