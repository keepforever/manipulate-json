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
            const card = temp[key];

            if (!currentSets.some(el => card.set === el) ) return;

            let cardSet = 'error';
            if (card.set === 'dom') {
                cardSet = 'dar';
            } else {
                cardSet = card.set;
            }

            if (card.arena_id) {
                const layout = card.layout;
                let masterKey = '';
                if (layout === 'split') {
                    const prePend = 'xxx';
                    masterKey = prePend + card.collector_number + cardSet;
                } else {
                    masterKey = card.collector_number + cardSet;
                }
                const masterValue = buildMasterValue(card);
                finalDictionary[masterKey] = masterValue

            }
        });
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
