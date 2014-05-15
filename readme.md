<a href="http://jeffcarp.github.io/maze/"><img src="https://raw.githubusercontent.com/jeffcarp/maze/gh-pages/maze.gif" alt="maze gif" /></a>

Generates a maze using [Prim's algorithm](http://en.wikipedia.org/wiki/Maze_generation_algorithm) implemented in ClojureScript. [See it here](http://jeffcarp.github.io/maze/)

## Build

First, install the `cljsc` command line ClojureScript compiler.

Then run:

```bash
cljsc maze.cljs '{:optimizations :advanced}' > out/maze.js
```
