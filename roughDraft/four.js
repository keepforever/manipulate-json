const fs = require("fs");
const {every_nth, importantInfoNormal, importantInfoSplitOrTransform, buildMasterValue} = require("./utils");

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

        // const reducedKeys = every_nth(tempKeys, 400);
        // console.log('\n', '\n', `reducedKeys = `, reducedKeys, '\n', '\n');
        // reducedKeys.forEach((key) => {
        //     if(temp[key].arena_id) {
        //         const masterKey = temp[key].set + temp[key].collector_number;
        //         const masterValue = buildMasterValue(temp[key]);
        //         finalDictionary[masterKey] = masterValue
        //     }
        //
        // })

        tempKeys.forEach((key) => {

            if (temp[key].arena_id) {
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

        // console.log('\n', '\n', `finalDictionary = `, finalDictionary, '\n', '\n');
    }

});

// if split, card_faces
