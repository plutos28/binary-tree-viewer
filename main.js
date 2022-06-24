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

    if(rootNode === null) {
        rootNode = newNode;
    } else {
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
    // I will be generating this data structure 
    let treeData = [
        {
          "name": "Top Level",
          "parent": "null",
          "children": [
            {
              "name": "Level 2: A",
              "parent": "Top Level",
              "children": [
                {
                  "name": "Son of A",
                  "parent": "Level 2: A"
                },
                {
                  "name": "Daughter of A",
                  "parent": "Level 2: A"
                }
              ]
            },
            {
              "name": "Level 2: B",
              "parent": "Top Level"
            }
          ]
        }
      ];
      
      // ************** Generate the tree diagram	 *****************
      let margin = {top: 40, right: 120, bottom: 20, left: 120},
          width = 960 - margin.right - margin.left,
          height = 500 - margin.top - margin.bottom;
          
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
            .attr("r", 10)
            .style("fill", "#fff");
      
        nodeEnter.append("text")
            .attr("y", function(d) { 
                return d.children || d._children ? -18 : 18; })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1);
      
        // Declare the links…
        let link = svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });
      
        // Enter the links.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", diagonal);
      
      }
}