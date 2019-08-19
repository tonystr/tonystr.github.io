
# Autotiling

The most common forms of autotiling are 16-tile rectangle-grid autotiling, and 47-tile rectangle-grid autotiling. The former can be implemented in a very beautiful way (programming wise), while the latter is much harder to implement in a neat way. So what's the difference? The number refers to how many variations are needed for each tile. These variations are determined by where the tile touches other tiles similar to itself, and where it doesn't touch anything (or tiles of another tileset). Below is an interactive demo of 16-tile autotiling. Left-click to place tiles, right-click to remove tiles.

![type='47'](Autotiling.jsx)


![
    defaultTiles={`[
        [S:3,E:0,S: 6,S:0,S:0,S:0,S: 0,S:3,E:0,E: 0,E: 0,S: 6,S:0,S:0,S:0,S: 2],
        [E:0,E:0,E: 0,S:4,S:0,S:0,S: 3,E:0,E:0,E: 0,E: 0,E: 0,S:4,S:0,S:3,E: 0],
        [E:0,E:0,E: 0,S:4,S:0,S:1,E: 0,E:0,E:0,E: 0,E: 0,S:12,S:0,S:1,E:0,E: 0],
        [S:9,E:0,S:12,S:0,S:0,S:3,E: 0,E:0,E:0,E: 0,E: 0,S: 4,S:0,S:1,E:0,S:12],
        [S:0,S:8,S: 0,S:0,S:1,E:0,S:15,E:0,E:0,E: 0,S:12,S: 0,S:0,S:0,S:8,S: 0],
        [S:0,S:0,S: 0,S:0,S:0,S:9,E: 0,E:0,E:0,S:12,S: 0,S: 0,S:0,S:0,S:0,S: 0]
    ]`}
    type='16'
](Autotiling.jsx)
