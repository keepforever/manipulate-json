const fs = require("fs");
const {
    every_nth,
    importantInfoNormal,
    importantInfoSplitOrTransform
} = require("./utils");

let temp;
let tempKeys;

let final = {};


fs.readFile("./scryfall-default-cards.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  try {
    temp = JSON.parse(jsonString);
    tempKeys = Object.keys(temp);

    let layoutInquiry = {}
    // layoutInquiry =  { normal: 3200, split: 45, transform: 18, token: 76, saga: 14 }

    tempKeys.forEach((key) => {

        if(!temp[key].layout) {
            console.log('\n', `nope `, '\n');
        }

        if(temp[key].layout && temp[key].arena_id) {
            if (temp[key].layout === 'transform') {
                console.log('\n', '\n', `temp[${key}] = `, temp[key], '\n', '\n');
                console.log('\n', '\n', `Object.keys(temp[key]) = `, Object.keys(temp[key]), '\n', '\n');
            }
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

// if split, card_faces
