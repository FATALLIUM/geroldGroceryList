// initialize global variables.
let listBox, outBox, itemSelectionBox, itemList, buyingList, changeItemBox, prevItem, prevIdx;
// If I have time, add the text hover feature.

class Item {
    constructor (name, description, image, num) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.num = 0;
    }
}

function initialize() {
    // initialize box outputs
    listBox = document.getElementById("listbox");
    outBox = document.getElementById("outbox");

    // initialize textboxes
    itemSelectionBox = document.getElementById("itemsel");
    changeItemBox = document.getElementById("changeitem");

    // initialize item list (what is available to buy)
    itemList = [new Item("Sword of Cheese and Ants", "A sword that was wielded by cheese ants.", ""),
    new Item ("Medulla", "A part of your brainstem. Regulates heartbeat, breathing, and vomiting.", ""),
    new Item ("Anterior thyroid", "Secretes hormones TC3 and TC4.", ""),
    new Item ("Greatsword (pink)", "It's a pink greatsword.", ""),
    new Item ("Pancreas", "", ""),
    new Item ("Panacea", "Cures all ailments and curses.", ""),
    new Item ("Amygdala", "A part of your limbic system. Responsible for your fight-or-flight response.", ""),
    new Item ("Pons", "A part of your brainstem. Responsible for relaying info to different parts of your brain.", ""),
    new Item ("Wernicke's Area", "Located in the cerebral cortex. Responsible for understanding and interpreting speech.", ""),
    new Item ("Hair (edible)", "If ingested, you might raise your stats.", ""),
    new Item ("Pom", "A pom of power.", ""),
    new Item ("Beast Eye", "A murky violet iris.", ""),
    new Item ("Chair", "It's a chair.", ""),
    new Item ("Edible Chair", "You can eat this one.", ""),
    new Item ("Someone's Somatosensory Cortex", "Detects sensory information, e.g. touch, temperature, pain.", ""),
    new Item ("Someone's Left Hemisphere", "Responsible for speech, writing, and comprehension.", ""),
    new Item ("Dark matter (pre-packaged)", "Does not emit or reflect light. Our universe is composed of 27% dark matter.", ""),
    new Item ("Pulsar", "A neutron star that emits radiation from its magnetic poles.", ""),
    new Item ("Milk", "Someone's dad left it here.", "")
    ];

    // initialize empty list for what Gerold will buy
    buyingList = [];

    display();
}

const display = () => {
    listBox.innerHTML = "0: " + itemList[0].name;
    for (let i = 1; i < itemList.length; i++) {
        listBox.innerHTML += "<br />" + i + ": " + itemList[i].name;
    }

    if (buyingList.length == 0) {
        outBox.innerHTML = "Nothing here yet.";
    }
    else {
        outBox.innerHTML = "0: " + buyingList[0].name + " [" + buyingList[0].num + "]";
        for (let i = 1; i < buyingList.length; i++) {
            outBox.innerHTML += "<br />" + i + ": " + buyingList[i].name + " [" + buyingList[i].num + "]";
        }
    }
    itemSelectionBox.value = "";
}

// finished
const deleteAdd = (num, change) => {
    if (num === "" || num < 0) {
        return;
    }
    switch (change) {
        case 0:
            if (num < itemList.length) {
                if (buyingList.indexOf(itemList[num]) !== -1) {
                    buyingList[buyingList.indexOf(itemList[num])].num++;
                }    
                else {            
                    buyingList.push(itemList[num]);
                }
            }
            break;
        case 1:
            if (num < buyingList.length) {
                if (buyingList[num].num === 0) {
                    buyingList.splice(num, 1);
                }
                else {
                    buyingList[num].num--;
                }
            }
            break;
        default:
            break;        
        }
    changeItemBox.value = "";
    display();
}

const changeItem = (num, change) => {
    if (isNaN(num) || num < 0 || num >= buyingList.length) {
        return;
    }

    if (prevItem !== undefined && prevIdx !== undefined && num !== prevIdx) {
        prevIdx = num;
    } else {
        prevItem = buyingList[num];
        prevIdx = num;
    }

    const swapIndex = change === 0 ? num - 1 : change === 1 ? num + 1 : undefined;

    if (swapIndex !== undefined && swapIndex >= 0 && swapIndex < buyingList.length) {
        [buyingList[num], buyingList[swapIndex]] = [buyingList[swapIndex], prevItem];
    }
    
    display();
}