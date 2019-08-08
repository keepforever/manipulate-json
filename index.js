const fs = require("fs");
const {
    every_nth, importantInfoNormal, importantInfoSplitOrTransform, buildMasterValue,
    currentSets,
} = require("./utils");

let temp;
let tempKeys;

let finalDictionary = {};

fs.readFile("./scryfall-default-cards.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }

    try {
        const temp = JSON.parse(jsonString);
        const tempKeys = Object.keys(temp);

        tempKeys.forEach((key) => {
            if (temp[key].arena_id) {

                if (currentSets.some(el => temp[key].set === el) ) {
                    console.log(`
                    #########################################################
                                    TEWST
                    #########################################################
                    `);

                    console.log('\n', `set: ${temp[key].set} `, '\n');

                    console.log(`
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    #########################################################
                    `);
                }

                const masterKey = temp[key].collector_number + temp[key].set;
                const masterValue = buildMasterValue(temp[key]);
                finalDictionary[masterKey] = masterValue

            }
        })
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    } finally {
        const jsonString = JSON.stringify(finalDictionary)
        fs.writeFile('./cardDictionary.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    }

});
