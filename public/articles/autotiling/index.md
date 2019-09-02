
# Autotiling

Autotiling is software that automatically figures out which type of tile graphic belongs on each cell of a grid. This is super useful when creating level editors and games with modifiable terrain. For level editors, autotiling allows the user to select a *tilemap*, and then "draw" tiles on a level. The autotile software figures out which graphics belong on each cell you draw to, as you draw. Play around with the interactive autotiling demo below to get a feel for how one implementation works.

![
    test='test'
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

> By the way, I'm saying "tile graphics" instead of "sprite", because in the context of [Gamemaker Studio 2](https://www.yoyogames.com/gamemaker) (the game engine this tutorial is focused on), one sprite can be house for many tiles.

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

Bitwise/binary math/algebra, is the *mathematical field which deals with base-2 operations*. In other words, bitwise math is math on binary numbers. In normal "base-10" math, we use operators such as `+`, `-`, `*`, `/` and so on. These are called arithmetic operators. In binary algebra, we have bitwise operators (operators that work on bits). The most common operators are AND (`&`), OR (`|`), XOR (`^`) and NOT (`~`). You might be familiar with some *logical operators* that are almost the same; AND (`&&`), OR (`||`), XOR (`^^`) and NOT (`!`). What all of the logical operators have in common, is that they only know about 1 and 0. They will treat all numbers around them as either 1 or 0 (`-3` is read as `0`, `89` is read as 1, `0.521` is read as 1, etc.), and they will produce either 1 or 0 (true or false). Bitwise math does the same, but on *every digit* of the number *as binary*. Let's see an example:

```python
0110 & 1100 = 0100
0110 | 1100 = 1110
0110 ^ 1100 = 1010
~0110 = 1001
```

You can really think of bitwise operators as logical operators running on every *bit* of a number. When you write `3 & 6`, the compiler essentially runs `&&` on every individual bit in the *binary representation* of those two numbers. In this case, that'd be `0011 & 0110`. A number is represented in binary by adding together different values for the bits. The first bit (starting from the right) is only worth `1`, the 2nd bit is worth `2`. The 3rd, `4`, the 4th `8`, the 5th `16`, and it keeps doubling value for every bit higher you go to the left. If a bit is on (`1`), then you add the worth of that bit. If it's off (`0`), you skip it and go on to the next. The final number is the sum of all of the bits. The code block above can be written in base-10 as:

```python
6 & 12 = 4
6 | 12 = 14
6 ^ 12 = 10
~6 = 9
```
> There also exists `&=`, `|=`, `^=` bitwise operators, that work similarly to `+=`, `-=`, `*=`, `/=`.

Differentiating binary from base-10 when writing numbers is really important. Above, I've used the same symbols, `1` and `0`, in both base-10 and binary, even though those two symbols mean completely different things in the two counting systems. Even so, it's not that common to use different character sets for different counting systems. Counting systems usually use the symbols from `0` to `9`, then if they're longer than base-10, they borrow symbols from the alphabet. Base-16 (Hex/Hexadecimal) for example, uses all of these symbols: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f`. This is pretty unfortunate, because if you just see the number `102` for example, you have no way of knowing if that's base-3, base-4, base-10, base-16, base-256 or even base-11037. That's why the base should *always* be specified, especially in programming. GML sadly doesn't allow writing numbers in base-2 (binary), but if it did, it would look like this: `0b1101`. `0b` denotes that the following is a number of base-2, the "b" is short for "binary". GML does however support  `0x1a5f`; hexadecimal. Until now, I've only showed binary numbers with four digits (bits), but that's only half of a *byte*. A byte can hold eight bits, which means the highest value a byte can hold is all eight bits added together, keeping in mind that each bit is worth twice as much as the previous. That's `1 + 2 + 4 + 8 + 16 + 32 + 64 + 128` = `255`, or `2^8 - 1`. If you count the `0`, it can hold `256` different values, which is why `2^8` becomes 256 instead of 255.

Where this gets relevant for autotiling, is that you can essentially *encode* information in any number. We established above that autotiling is just a series of *binary* checks (true/false, 1/0), which means we don't need more than a single bit for every surrounding tile. If you're only checking four sides, you only need four bits.

```js
// #hidecode
// #lang=gml
const x = 0;
const y = 0;

const check_tile = (x, y) => Math.round(Math.random());
const show_debug_message = (...args) => console.log(args.join('\n'));
const string = s => new String(s);
const bool = a => a ? "true" : "false";
const format_bits = n => `${n & 1} + ${n & 2} + ${n & 4} + ${n & 8}`;
const debug_tile_bitflag = bitflag => (
    "Total bitflag value: " + string(bitflag) + ` (0b${bitflag.toString(2)})` + "\n" +
    "Bits: " + format_bits(bitflag) + "\n" +
    "Tile right: " + bool(bitflag & 1) + "\n" +
    "Tile above: " + bool(bitflag & 8) + "\n" +
    "Tile left: "  + bool(bitflag & 2) + "\n" +
    "Tile below: " + bool(bitflag & 4)
);

// #endhidecode
// A different random grid is used every time you run this code, hit
// the play button multiple times to see how the bitflag value changes
var _index = 0;

_index |= check_tile(x + 1, y) * 1; // right
_index |= check_tile(x, y - 1) * 2; // above
_index |= check_tile(x - 1, y) * 4; // left
_index |= check_tile(x, y + 1) * 8; // below

show_debug_message(debug_tile_bitflag(_index));
```

## Arranging tileset

Now that you can encode surrounding tile data in a *number*, let'

![
    type='47'
    defaultTiles={`[
        [S:12, S:8,  S:9,  S:13],
        [S:4,  S:0,  S:1,  S:5 ],
        [S:6,  S:2,  S:3,  S:7 ],
        [S:14, S:10, S:11, S:47]
    ]`}
](Autotiling.jsx)

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
