# sqrnd

A very simple game made in JavaScript for the game development merit badge.

## How to Play

1. Every time you visit a tile, a random number between 0 and 9 (inclusive) is generated and is stored as that tile's value. This value is incremented to your score.
2. Every time you visit a tile that has already been visited, your value increments by the previous value of the square, doubled and negated. (`tileValue *= -2`)
3. Keep your player value (the number that shows up on top of the square) between 0 and 100 (inclusive), and visit as many times as possible in the least amount of time possible
4. The game is infinite, so have fun.
