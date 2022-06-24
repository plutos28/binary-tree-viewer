class Node {
    constructor(value, leftNode={}, rightNode={}) {
        this.value = value;
        this.children = [leftNode, rightNode];
    }
}

const addNodeButton = document.querySelector("#add-node-button");
const addNodeText = document.querySelector("#add-node-text");

let rootNode = null;

// UI interactions - add new node
addNodeButton.addEventListener("click", () => {
    let newNode = new Node(addNodeText.value)
    console.log(newNode.value);

    if(rootNode === null) {
        rootNode = newNode;
    } else {
        let currentNode = rootNode;
        while(currentNode.value != newNode.value) { 
            if(+(newNode.value) < +(currentNode.value)) {
                if(Object.keys(currentNode.children[0]).length === 0) {
                    currentNode["children"][0] = newNode;
                } else {
                    currentNode = currentNode["children"][0]
                }
            } else if((newNode.value) > +(currentNode.value)) {
                if(Object.keys(currentNode.children[1]).length === 0) {
                    currentNode.children[1] = newNode;
                } else {
                    currentNode = currentNode.children[1];
                }
            }
        }
    }
    console.log(rootNode);
    let svgs = document.querySelectorAll("svg");
    svgs.forEach((svg) => {
        svg.parentElement.removeChild(svg);
    })
    displayTree();
});

function displayTree() {
    let treeData = [JSON.parse(JSON.stringify(rootNode))];
    console.log(treeData);
      
    // ************** Generate the tree diagram	 *****************
    let margin = {top: 40, right: 120, bottom: 20, left: 120},
        width = 2000 - margin.right - margin.left,
        height = 1200 - margin.top - margin.bottom;
        
    let i = 0;
    
    let tree = d3.layout.tree()
        .size([height, width]);
    
    let diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.x, d.y]; });
    
    let svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    root = treeData[0];
    
    update(root);
      
    function update(source) {
    
    // Compute the new tree layout.
    let nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
    
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 100; });
    
    // Declare the nodes…
    let node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
    
    // Enter the nodes.
    let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; });
    
    nodeEnter.append("circle")
        .attr("r", 20)
        .style("fill", "#fff");
    
    nodeEnter.append("text")
        .attr("text-anchor", "middle")
        .attr("y", ".3em")
        .text(d => d.value);
    
    // Declare the links…
    let link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
    
    // Enter the links.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);
    
    }
}