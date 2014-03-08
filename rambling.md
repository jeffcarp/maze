# Maze generation algorithm

- Start from the center, or an arbitrary point?

- Have a constant size grid (e.g. 100x80) that stretches with the canvas
- No, it should definitely be calculated on first page load and then stretched if you move it
- Ok so something like Math.floor(window.innerWidth / 15)

- Pick a random square (squares I guess aren't explicitly defined)
- Make that the start point
- Pick another random square
- Make that the end point
- Generate maze aroud those two points

 
