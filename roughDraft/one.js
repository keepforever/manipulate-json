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
        text: obj.oracle_text,
        layout: obj.layout
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

    for (let i = 400; i < 405; i++) {
        console.log('\n', '\n', `importantInfo(temp[${i}]) = `, importantInfo(temp[i]), '\n', '\n');
    }

    console.log(`
    #########################################################
                    Full Cards
    #########################################################
    `);
    console.log('\n', '\n', `temp[422] = `, temp[422], '\n', '\n');
    console.log('\n', '\n', `cardKeys = `, Object.keys(temp[422]), '\n', '\n');
    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);

  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }

  let arenaKeys = [];
  try {
    tempKeys.forEach(key => {
        if (temp[key].arena_id) {
            arenaKeys.push(key)
        }
    })
  } catch (e) {
      console.log('\n', '\n', `arena failed = `, e, '\n', '\n');
  } finally {
    console.log('\n', `finally! `, every_nth(arenaKeys, 200), '\n');
  }
});
