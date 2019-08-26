
# Autotiling

Autotiling is software that automatically figures out which type of tile graphic belongs on each cell of a grid. This is super useful when creating level editors and games with modifiable terrain. For level editors, autotiling allows the user to select a *tilemap*, and then "draw" tiles on a level. The autotile software figures out which graphics belong on each cell you draw to, as you draw. Play around with the interactive autotiling demo below to get a feel for how one implementation works.

![
    type='47'
    defaultTiles={`[
        [S:3,E:0,S:6,S:23,S:0,S:0,S:17,S:3,E:0,E:5,E:0,S:6,S:23,S:0,S:17,S:2],
        [E:0,E:15,E:6,S:4,S:0,S:17,S:3,E:3,E:0,E:15,E:10,E:4,S:4,S:17,S:3,E:2],
        [E:0,E:7,E:12,S:4,S:0,S:1,E:3,E:0,E:15,E:14,S:14,S:44,S:16,S:1,E:3,E:0],
        [S:9,E:8,S:12,S:16,S:17,S:3,E:0,E:0,E:7,E:3,E:12,S:4,S:0,S:1,E:8,S:12],
        [S:19,S:8,S:16,S:0,S:1,E:21,S:15,E:0,E:0,E:12,S:12,S:16,S:0,S:19,S:8,S:16],
        [S:0,S:0,S:0,S:0,S:19,S:9,E:0,E:0,E:0,S:12,S:16,S:0,S:0,S:0,S:0,S:0]
    ]`}
](Autotiling.jsx)

Some exemplary games that use autotiling are [Terraria](http://terraria.org/), [Super Mario Maker 2](https://www.mariowiki.com/Super_Mario_Maker_2), [Spelunky](https://spelunkyworld.com/), [Stardew Valley](https://www.stardewvalley.net/), [Factorio](https://www.factorio.com/), [Rimworld](https://rimworldgame.com/), [Oxygen Not Included](https://store.steampowered.com/app/457140/Oxygen_Not_Included/), and many more.

## How tiling works

When deciding which tile to display, you need to look at the *surrounding tiles*. A tile doesn't need to know what type of tile is next to it, or how that tile is tiled, it only needs to know whether there is a tile next to it, or not. If there is a tile to the right of it, it'll need to display a tile graphic that makes it look like it's connected to the tile to the right of it. If there is no tile anywhere around it, it can just be a lone lump of grass, dirt, bricks, water or whatever your tileset represents. When a tile touches multiple tiles, it'll need to display a sprite that makes it look connected to every tile it touches. Try placing a tile in the demo above, then add tiles around it. You can enable a grid from the control-menu to the right of it, to see how each of the tile graphics fit together.

> By the way, I'm saying "tile graphics" instead of "sprite", because in the context of [Gamemaker Studio 2](https://www.yoyogames.com/gamemaker) (the game engine I presume you're using), one sprite can be house for many tiles.

```python
if tile above
    if tile to right
        show 'tile_top_right'
    if tile to left
        show 'tile_to_left'
    else
        show 'tile_top'
if tile below
    if tile to right
        show 'tile_bottom_right'
    ...
```

Here's some pseudocode of how you might go about implementing autotiling. Lots of if-else checks will eventually do the trick, but it's big, messy, clunky, unreadable and hard to edit in the future. But the main reason I'm showing you a different solution, is because autotiling (at least 16-tile) can be expressed in a *beautiful* way.

## Bitwise math

Bitwise/binary math/algebra, is the *mathematical field which deals with base-2 operations*. In other words, bitwise math is math on binary numbers. In normal "base-10" math, we use *operators* such as `+`, `-`, `*`, `/` and so on. These are called arithmetic operators. In binary algebra, we have bitwise operators (operators that work on bits). The most common operators are AND (`&`), OR (`|`), XOR (`^`) and NOT (`~`). You might be familiar with some *logical operators* called almost the same; AND (`&&`), OR (`||`), XOR (`^^`) and NOT (`!`). What all of the logical operators have in common, is that they only know about 1 and 0. They will treat all numbers around them as either 1 or 0, and they will produce either 1 or 0 (true or false). Bitwise math does the same, but on *every digit* of the number as binary. Let's see an example:

```python
0110 & 1100 = 0100
0110 | 1100 = 1110
0110 ^ 1100 = 1010
~0110 = 1001
```

You can really think of bitwise operators as logical operators running on every *bit* of a number. When you write `3 & 6`, the compiler runs `&` on every individual bit in the *binary representation* of those two numbers. In this case, that'd be `0011 & 0110`. A number is represented in binary by adding together different values for the bits. The first bit (starting from the right) is only worth `1`, the 2nd bit is worth `2`. The 3rd, `4`, the 4th `8`, the 5th `16`, and it keeps doubling value for every bit higher you go to the left. If a bit is on (`1`), then you add the worth of that bit. If it's off (`0`), you skip it and go on to the next. The final number is the sum of all of the bits. The code block above can be written in base-10 as:

```python
6 & 12 = 4
6 | 12 = 14
6 ^ 12 = 10
~6 = 9
```
> There also exists `&=`, `|=`, `^=` bitwise operators, that work similarly to `+=`, `-=`, `*=`, `/=`.

Where this gets relevant for autotiling, is that you can essentially *encode* information in any number. We established above that autotiling is just a series of *binary* checks (true/false, 0/1), which means we don't need more than a single bit for every surrounding tile. If you're only checking four sides, you only need four bits.

```gml
var _index = 0;
_index &=
```

## Rest

The most common forms of autotiling are 16-tile rectangle-grid autotiling, and 47-tile rectangle-grid autotiling. The former can be implemented in a very beautiful way (programming wise), while the latter is much harder to implement in a neat way. So what's the difference? The number refers to how many variations are needed for each tile. These variations are determined by where the tile touches other tiles similar to itself, and where it doesn't touch anything (or tiles of another tileset). Below is an interactive demo of 16-tile autotiling. Left-click to place tiles, right-click to remove tiles.

![
    type='16'
    defaultTiles={`[
        [S:3,E:0,S:6,S:0,S:0,S:0,S:0,S:3,E:0,E:0,E:0,S:6,S:0,S:0,S:0,S:2],
        [E:0,E:0,E:0,S:4,S:0,S:0,S:3,E:0,E:0,E:0,E:0,E:0,S:4,S:0,S:3,E:0],
        [E:0,E:0,E:0,S:4,S:0,S:1,E:0,E:0,E:0,E:0,S:14,S:8,S:0,S:1,E:0,E:0],
        [S:9,E:0,S:12,S:0,S:0,S:3,E:0,E:0,E:0,E:0,E:0,S:4,S:0,S:1,E:0,S:12],
        [S:0,S:8,S:0,S:0,S:1,E:0,S:15,E:0,E:0,E:0,S:12,S:0,S:0,S:0,S:8,S:0],
        [S:0,S:0,S:0,S:0,S:0,S:9,E:0,E:0,E:0,S:12,S:0,S:0,S:0,S:0,S:0,S:0]
    ]`}
](Autotiling.jsx)

Notice that there are a good amount of rough corners here. If you design your tileset with these in mind, you can sometimes get good results, but with the grass-type palette used here, it looks pretty bad. We can fix it by introducing even more tiles. The total amount of tiles needed to make this work out smoothly ends up being 47. Below is an example of 47-tile autotiling.

![
    type='47'
    defaultTiles={`[
        [S:3,E:0,S:6,S:23,S:0,S:0,S:17,S:3,E:0,E:5,E:0,S:6,S:23,S:0,S:17,S:2],
        [E:0,E:15,E:6,S:4,S:0,S:17,S:3,E:3,E:0,E:15,E:10,E:4,S:4,S:17,S:3,E:2],
        [E:0,E:7,E:12,S:4,S:0,S:1,E:3,E:0,E:15,E:14,S:14,S:44,S:16,S:1,E:3,E:0],
        [S:9,E:8,S:12,S:16,S:17,S:3,E:0,E:0,E:7,E:3,E:12,S:4,S:0,S:1,E:8,S:12],
        [S:19,S:8,S:16,S:0,S:1,E:21,S:15,E:0,E:0,E:12,S:12,S:16,S:0,S:19,S:8,S:16],
        [S:0,S:0,S:0,S:0,S:19,S:9,E:0,E:0,E:0,S:12,S:16,S:0,S:0,S:0,S:0,S:0]
    ]`}
](Autotiling.jsx)
