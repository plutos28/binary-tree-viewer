class Node {
    constructor(value, leftNode=null, rightNode=null) {
        this.value = value;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

const addNodeButton = document.querySelector("#add-node-button");
const addNodeText = document.querySelector("#add-node-text");

const lastLeftNodeCoords = {x: 0, y: 0};
const lastRightNodeCoords = {x: 0, y: 0};

let rootNode = null;

// UI interactions - add new node
addNodeButton.addEventListener("click", () => {
    let newNode = new Node(+addNodeText.value)
    console.log(newNode.value);

    // create a new node and set it as the rootNode and/or add it as a child of currentNode
    if(rootNode === null) {
        rootNode = newNode;
    } else {
        // loop through the tree to insert new element
        let currentNode = rootNode;
        while(currentNode.value != newNode.value) { 
            if(newNode.value < currentNode.value) {
                if(currentNode.leftNode == null) {
                    currentNode.leftNode = newNode;
                } else {
                    currentNode = currentNode.leftNode;
                }
            } else if(newNode.value > currentNode.value) {
                if(currentNode.rightNode == null) {
                    currentNode.rightNode = newNode;
                } else {
                    currentNode = currentNode.rightNode;
                }
            }
        }
    }
    console.log(rootNode);
});
