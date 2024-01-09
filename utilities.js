// initialize global variables.
let listBox, outBox, itemSelectionBox, itemList, imageSprite, imageDesc, buyingList, changeItemBox, prevItem, prevIdx;

/**
 * The Item class
 */
class Item {
    constructor (name, description, image) {
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

    // initialize image and description
    imageSprite = document.getElementById("itemimg");
    imageDesc = document.getElementById("itemdesc");

    // initialize textboxes
    itemSelectionBox = document.getElementById("itemsel");
    changeItemBox = document.getElementById("changeitem");

    // initialize item list (what is available to buy)
    itemList = [new Item("Sword of Cheese and Ants", "A sword that was wielded by cheese ants.", "cheeseSword.png"),
    new Item ("Someone's medulla", "A part of your brainstem. Regulates heartbeat, breathing, and vomiting.", "medulla.png"),
    new Item ("Thyroid gland", "Secretes hormones TC3 and TC4.", "thyroid.png"),
    new Item ("Greatsword (purple)", "It's a purple greatsword.", "greatsword.png"),
    new Item ("Keys", "No one knows what these keys unlock.", "keys.png"),
    new Item ("Panacea", "Cures all ailments and curses.", "panacea.png"),
    new Item ("Amygdala", "A part of your limbic system. Responsible for your fight-or-flight response.", "amygdala.png"),
    new Item ("Moss", "Found in a prison.", "moss.png"),
    new Item ("Shade Jacket", "You can dash through enemies with this.", "shadeJacket.png"),
    new Item ("Hair (edible)", "If ingested, it might raise your stats.", "hat.png"),
    new Item ("Pom", "A pom of power.", "pom.png"),
    new Item ("Beast Eye", "A murky violet iris. Probably inedible.", "beastEye.png"),
    new Item ("Chair", "It's a chair.", "chair.png"),
    new Item ("Edible Chair", "You can eat this one.", "edibleChair.png"),
    new Item (".2246 lead", "What's with the precision?", "lead.png"),
    new Item ("Feathered hat", "This hat can shoot bullets(?).", "hat.png"),
    new Item ("Dark matter (pre-packaged)", "Does not emit or reflect light. Our universe is composed of 27% dark matter.", "darkMatter.png"),
    new Item ("Pulsar", "A neutron star that emits radiation from its magnetic poles.", "pulsar.png"),
    new Item ("Milk", "Someone's dad left it here.", "")
    ];

    // initialize empty list for what Gerold will buy
    buyingList = [];

    display();
}

const display = () => {
    // show image and item description
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
    if (isNaN(num) || num < 0) {
        return;
    }
    changeImg(num);

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

    if (prevItem === undefined || prevIdx === undefined || num !== prevIdx) {
        prevItem = buyingList[num];
        prevIdx = num;
    }
    else if (num === prevIdx) {
        num = buyingList.indexOf(prevItem);
    }

    const swapIndex = change === 0 ? num - 1 : change === 1 ? num + 1 : undefined;

    if (swapIndex !== undefined && swapIndex >= 0 && swapIndex < buyingList.length) {
        [buyingList[num], buyingList[swapIndex]] = [buyingList[swapIndex], prevItem];
    }
    display();
}

const changeImg = (itemSelection) => {
    imageSprite.src = itemList[itemSelection].image;
    imageDesc.innerHTML = itemList[itemSelection].description;
}