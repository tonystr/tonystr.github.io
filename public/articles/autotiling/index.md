
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

By the way, I'm saying "tile graphics" instead of "sprite", because in the context of *Gamemaker Studio 2* (the game engine I presume you're using), one sprite can be house for many tiles.

## Bitwise math

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
