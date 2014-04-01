Maze generation using Prim's algorightm implemented in ClojureScript.

![screenshot](http://i.imgur.com/gDguA9m.png)

http://en.wikipedia.org/wiki/Maze_generation_algorithm

## Build

First, install `cljsc` ClojureScript compiler.

Then run:

```bash
cljsc maze.cljs '{:optimizations :advanced}' > maze.js
```
