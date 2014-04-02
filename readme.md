Maze generation using Prim's algorightm implemented in ClojureScript.

![maze gif](https://github.com/jeffcarp/maze/blob/gh-pages/maze.gif)

http://en.wikipedia.org/wiki/Maze_generation_algorithm

## Build

First, install `cljsc` ClojureScript compiler.

Then run:

```bash
cljsc maze.cljs '{:optimizations :advanced}' > maze.js
```

## Todo

- Make items in @graph numbers, not strings
- Make maze/interv return only new walls, make call something like `swap! graph conj (interv @walls)`
