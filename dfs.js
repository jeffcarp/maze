
var graph;

var dfs = function() {
  graph = generateSquareGraph(5);
  var current = pickRandomCell(graph);
  console.log(current);
  // Start at a particular cell and call it the 'exit'
  recurse(current);
  console.log(graph);
};

var foo = 0;
var recurse = function(current) {
  // Mark the current cell as visited, and get a list of neighbors. For each neighbor, starting with a randomly selected neighbor:
  graph[current[0]][current[1]] += 'v';
  graph[current[0]][current[1]] += ' ' + foo++;

  // TODO: Make getNeighbors random
  getNeighbors(current).forEach(function(neighbor) {
    // If that neighbor hasn't been visited, 
    if (!!~graph[neighbor[0]][neighbor[1]].indexOf('v')) return;
    // remove the wall between this cell and that neighbor, 
    removeWallBetween(current, neighbor);
    // and then recurse with that neighbor as the current cell
    recurse(neighbor);
  });
};

var getNeighbors = function(cell) {
  var neighbors = [
    [cell[0]-1, cell[1]], // up    (y-1, x)
    [cell[0]+1, cell[1]], // down  (y+1, x)
    [cell[0], cell[1]-1], // left  (y, x-1)
    [cell[0], cell[1]+1]  // right (y, x+1)
  ];
  neighbors = neighbors.filter(function(coord) {
    return (
      coord[0] >= 0           &&
      coord[0] < graph.length &&
      coord[1] >= 0           &&
      coord[1] < graph.length
    );
  });
  return shuffleArray(neighbors);
};

// Takes two tuples, a and b (in (y, x) format)
// Removes the character denoting the wall in between them
var removeWallBetween = function(a, b) {
  // b is below a, remove a's bottom (and b's top?) this makes no sense
  if (a[0]+1 === b[0]) {
    removeChar(a, 'b'); 
    removeChar(b, 't'); 
  }
  // b is above a, remove b's bottom and a's top
  else if (a[0]-1 === b[0]) {
    removeChar(a, 't'); 
    removeChar(b, 'b'); 
  }
  // b is to the right of a, remove b's left and a's right 
  else if (a[1]+1 === b[1]) {
    removeChar(a, 'r'); 
    removeChar(b, 'l'); 
  }
  // b is to the left of a, remove b's right and a's left 
  else if (a[1]-1 === b[1]) {
    removeChar(a, 'l'); 
    removeChar(b, 'r'); 
  }
};

var removeChar = function(coord, chr) {
  var str = graph[coord[0]][coord[1]].replace(chr, "");
  graph[coord[0]][coord[1]] = str;
};

var generateSquareGraph = function(size) {
  var graph = [];
  for (var i=0; i<size; i++) {
    graph[i] = [];
    for (var j=0; j<size; j++) {
      graph[i][j] = "tblr";
    }
  }
  return graph;
};

// Returns a tuple with a random coordinate picked out from the input graph
var pickRandomCell = function(graph) {
  var y = rand(graph.length);
  var x = rand(graph.length);
  return [y, x];
};

// Exclusive! 
var rand = function(num) {
  return Math.floor(Math.random()*num);
};

var shuffleArray = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

dfs();
