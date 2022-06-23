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
const canvas = document.querySelector("#canvas");

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
    displayTree();
});

function displayTree() {
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // draw a node
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();

    // add the text
    ctx.font = '16px sans-serif';
    ctx.fillText(`${rootNode.value}`, 100-12, 50+28);


    // remove all node elements and recreate them and then render

    let currentNode = rootNode;
    while(currentNode != null) {
        // display the node's value
        // let parentNode = document.createElement("div");
        // parentNode.textContent = currentNode.value;
        // parentNode.classList.add("node");

        // display the left nodes
        // if(currentNode.leftNode != null) {
        //     let leftNode = document.createElement("div");
        //     leftNode.textContent = currentNode.leftNode.value;
        //     leftNode.classList.add("node");
        //     parentNode.appendChild(leftNode);
        // }
        
    
        // display the right nodes
        // if(currentNode.rightNode != null) {
        //     let rightNode = document.createElement("div");
        //     rightNode.textContent = currentNode.rightNode.value;
        //     rightNode.classList.add("node");
        //     parentNode.appendChild(rightNode);
        // }
        

        // tree.appendChild(parentNode);

        break;
    }
}