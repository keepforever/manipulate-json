const fs = require("fs");
const {
    every_nth, importantInfoNormal, importantInfoSplitOrTransform, buildMasterValue,
    currentSets,
} = require("./utils");

let reactSelectOptions = [];

fs.readFile("./cardDictionary.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }

    try {
        const cardDictionary = JSON.parse(jsonString);
        const tempKeys = Object.keys(cardDictionary);
        console.log('\n', '\n', `tempKeys.length = `, tempKeys.length, '\n', '\n');

        tempKeys.forEach(key => {    
            reactSelectOptions.push({
                value: key,
                label: cardDictionary[key].name
            })

        });

    } catch (err) {
        console.log("Error parsing JSON string:", err);
    } finally {
        console.log('\n', '\n', `reactSelectOptions.length = `, reactSelectOptions.length, '\n', '\n');
        // Write select options
        const reactSelectString = JSON.stringify(reactSelectOptions);
        fs.writeFile('./reactSelectOptions.json', reactSelectString, err => {
            if (err) {
                console.log('Error writing reactSelectOptions', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    }

});
