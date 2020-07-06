# json2javaProperties
Node script to format json files to java properties files

# Usage Example
Add as script in package.json:
`"translations-export": "node json2javaProperties.js ./translations/export/ ./translations/"`

* The output path is: `./src/translations/export/`
* The input path is: `./src/translations/`

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
# this file is autogenerated, please don't edit as these changes will be overwritten
quotationMarks.prefix=No results for \"
quotationMarks.suffix=\". Try again.
longCommaSentence=Sentences, which are long, could contain comma chars
Key with whitespaces !=a value
```
