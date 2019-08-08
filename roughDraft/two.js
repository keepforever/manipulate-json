const fs = require("fs");

let temp;
let tempKeys;

const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

const importantInfo = (obj) => {
    return {
        name: obj.name,
        cmc: obj.cmc,
        type_line: obj.type_line,
        arena_id: obj.arena_id,
        collector_number: obj.collector_number,
        set: obj.set,
        mana_cost: obj.mana_cost,
        rarity: obj.rarity,
        pt: `${obj.power}/${obj.toughness}`,
        color: obj.colors.join('') ,
        text: obj.oracle_text
    }
}

fs.readFile("./scryfall-default-cards.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  try {
    temp = JSON.parse(jsonString);
    tempKeys = Object.keys(temp);

    let layoutInquiry = {}

    tempKeys.forEach((key) => {

        if(!temp[key].layout) {
            console.log('\n', `nope `, '\n');
        }

        if(temp[key].layout) {
            if (layoutInquiry[temp[key].layout]) {
                layoutInquiry[temp[key].layout]++;
            } else {
                layoutInquiry[temp[key].layout] = 1;
            }
        }

    })

    console.log('\n', '\n', `layoutInquiry = `, layoutInquiry, '\n', '\n');

  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }

});
