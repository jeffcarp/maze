Maze generation using Prim's algorithm implemented in ClojureScript.

<a href="http://jeffcarp.github.io/maze/"><img src="https://raw.githubusercontent.com/jeffcarp/maze/gh-pages/maze.gif" alt="maze gif" /></a>

## Build

First, install `cljsc` ClojureScript compiler.

Then run:

```bash
cljsc maze.cljs '{:optimizations :advanced}' > maze.js
```

## Todo

X Make items in @graph numbers, not strings
- Make maze/interv return only new walls, make call something like `swap! graph conj (interv @walls)`

## See

- http://en.wikipedia.org/wiki/Maze_generation_algorithm
