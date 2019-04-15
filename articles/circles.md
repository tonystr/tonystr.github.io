
# Circles!

Everyone loves them; they're round, convex and infinitely smooth!

But following these criteria, how would you actually draw a circle? In the physical world, you could use a **drafting compass** to construct a decent circle. In the world of computers, most image manipulation software provide tools for *drawing* circles, but what if you want to *program* a circle? What are the rules that make up a circle, and how could you represent them in code? Knowing this can be a powerful tool for drawing and animating complex shapes like cogwheels, spirals or even **demonic pentagrams**.

![Circle of rocks, circular pentagram and circular attacks](./articles/circle_demonstration.mp4)

Regular polygons, such as triangles, squares, pentagons, hexagons and so on, can all be defined by how many corners they have. Drawing one such shape is as simple as finding the corners *(vertices)* of the shape, and drawing lines between them. Just like that "connect the dots" game you played as a kid.

Since they are regular shapes, all sides are equally long *(equilateral)*. If you keep increasing the amount of vertices, you'll get closer and closer to what looks like a circle, until you can't tell the difference anymore. It is in fact exactly this we'll use to draw circles.

![The more vertices an equilateral shape has, the closer it is to being a circle](./articles/regular_ploygons.mp4)

## Trigonometry

Points around a circle can be found with trigonometry. GML provides functions ``lengthdir_x()`` and ``lengthdir_y()``, which let you find points offset by a **length** and **direction**. The length will always be equal to the radius of the circle, so the only thing that changes is the direction. With a simple ``for`` loop, you can find angles all around a circle. Since the direction needs to be an angle between 0 and 360, you could use these as the parameters to the ``for`` loop:

```gml
var radius = 64;

for (var i = 0; i < 360; i++) {
    draw_point(
        x + lengthdir_x(radius, i),
        y + lengthdir_y(radius, i)
    );
}
```

This works, but if you make ``radius`` too big, you'll just see a dotted circle <div class="dotted-circle"></div>. If you keep it small, like with a radius of 32, you're drawing way more points than you need to. So how do you balance this? You could use the formula for the *circumference of a circle*, ``2 * pi * radius``, to find exactly how many **angles** you need to draw points at.

Once you know the circumference of the circle, you can loop to that, and calculate the angle as ``(i / circumference) * 360``, since ``i`` will always be between 0 and ``circumference``, but you need it to end up as a value between 0 and 360.

```gml
var radius = 64;
var circumference = 2 * pi * radius;

for (var i = 0; i < circumference; i++) {
    var angle = (i / circumference) * 360;

    draw_point(
        x + lengthdir_x(radius, angle),
        y + lengthdir_y(radius, angle)
    );
}
```

You could go further with this, and draw lines between two angles instead of individual points. This would be faster and decrease the amount of dots you need to draw. As long as the radius is high enough, it'll also look smoother.

```gml
var radius = 64;
var line_length = 14;

// decrease the amount of angles to draw
var vertex_count = (2 * pi * radius) / line_length;

for (var i = 0; i < vertex_count; i++) {
    var angle      = (i / vertex_count)       * 360;
    var next_angle = ((i + 1) / vertex_count) * 360;

    draw_line(
        x + lengthdir_x(radius, angle),
        y + lengthdir_y(radius, angle),
        x + lengthdir_x(radius, next_angle),
        y + lengthdir_y(radius, next_angle)
    );
}
```

With this code, you essentially have the same result as the 2nd gif.

If your ``line_length`` is long and the ``radius`` short, you'll see the corners clearly, and in extreme cases it might become a pentagon, square or even triangle instead of a circle at all. You have to experiment a little to see what line lengths and radii are appropriate for you.

Note that using the formula for the circumference of a circle and a line length variable, is only needed to allow **scalable circles**. These circles would work at any size. You could make the ``radius`` an instance variable and increase it over time and it would still look like a circle. However, you don't absolutely *need* to use this whenever you want to draw a circle. You could just set the ``vertex_count`` manually. Most of the following code examples in this article use ``radius = 64;`` and ``vertex_count = 24;`` to simplify the code.

## Primitive Drawing

So far, we've drawn *outlines* of circles. But what if you wanted to draw a filled circle, textured circle, circular glow, thicker outline or a spiked circle? All of this and more is possible using **primitives**.

Let's first draw a filled circle. To draw a primitive, you first call the function ``draw_primitive_begin(kind)`` and specify what ``kind`` of primitive you want to draw. Then you draw vertices using ``draw_vertex()``, and finally call ``draw_primitive_end()``. Once you *end* the primitive, GameMaker draws a **shape** using all the vertices you've drawn after *beginning* the primitive. How gamemaker defines this shape depends on what ``kind`` you specified in ``draw_primitive_begin(kind)``. We'll look at some different primitive kinds later, but we'll start with ``pr_trianglefan``.

We actually don't need to change very much from the code we already have. The first code example showed drawing a circle using ``draw_point()``. This works pretty much the same when using ``pr_trianglefan``.

```gml
var radius = 64;
var vertex_count = 24;

draw_primitive_begin(pr_trianglefan);

for (var i = 0; i < vertex_count; i++) {
    var angle = (i / vertex_count) * 360;

    draw_vertex(
        x + lengthdir_x(radius, angle),
        y + lengthdir_y(radius, angle)
    );
}

draw_primitive_end();
```

This would draw a filled circle. Below is an illustration of the different primitive kinds, all drawn with the same circle code as above.

![Different primitive kinds with varying vertex counts](./articles/primitive_kinds.mp4)

Although all of these primitives are *interesting*, most of them aren't very useful other than for **debugging**. If you're writing a complex primitive and having problems with it, changing the ``kind`` to something like ``pr_linestrip`` or ``pr_pointlist`` might be useful for wrapping your head around what you're doing.

``pr_trianglefan`` produces a decent circle, however it isn't available on the *HTML5 target* platform, and it might not work correctly on some devices for other platforms. Additionally, it doesn't really give us a whole lot of power to make interesting shapes.

| ![!thumbnail(./articles/trianglefan.thumbnail.png)](./articles/trianglefan.mp4) | ![!thumbnail(./articles/trianglestrip.thumbnail.png)](./articles/trianglestrip.mp4) |
| :-----------------------------: | :-------------------------------: |
|        *pr_trianglefan*         |         *pr_trianglestrip*        |
| each triangle shares one vertex with previous triangle and one vertex with the anchor point | each triangle shares two vertices with previous triangle |

``pr_trianglestrip`` allows for a lot more complex shapes, however as seen in the gif above demonstrating all the different primitive ``kinds``, it won't produce a circle with the same code as we used with ``draw_point()`` and ``pr_trianglefan``.

With ``pr_trianglestrip``, every triangle shares two vertices with the previous triangle. Using this knowledge, we could draw a circle in a *sawtooth* pattern. By drawing each vertex on the opposite end of the circle, every triangle would reach from one end of the circle to the other and in turn fill the whole shape.

![Circles drawn with an alternating pattern](./articles/alternating_pattern.mp4)

```gml
var radius = 64;
var vertex_count = 24;

draw_primitive_begin(pr_trianglestrip);

// only loop through half the circle since we draw two
// vertices every iteration
for (var i = 0; i < vertex_count / 2; i++) {
    // current angle: i
    var angle1 = (i / vertex_count) * 360;
    // opposite angle: vertex_count - i
    var angle2 = ((vertex_count - i) / vertex_count) * 360;

    draw_vertex(
        x + lengthdir_x(radius, angle1),
        y + lengthdir_y(radius, angle1)
    );

    draw_vertex(
        x + lengthdir_x(radius, angle2),
        y + lengthdir_y(radius, angle2)
    );
}

// draw the last vertex at the opposite end of the first
// if the vertex count is an even number
if (vertex_count % 2 == 0) draw_vertex(
    x + lengthdir_x(radius, 180),
    y + lengthdir_y(radius, 180)
);

draw_primitive_end();
```

## Textured Primitives

As if primitives weren't already **awesome**, they have yet another use that makes them even more useful. With ``draw_primitive_begin_texture()`` and ``draw_vertex_texture()``, you can draw sprites and surfaces with custom shapes. ``draw_primitive_begin_texture()`` takes a ``texture`` argument, which you can get from ``sprite_get_tetxure()`` or ``surface_get_tetxure()``. ``draw_vertex_texture()`` takes two more arguments, ``xtex`` and ``ytex``. These are the coordinates *inside* the texture to draw. These coordinates are given as values between 0 and 1, instead of typical pixel coordinates. Let's see an example:

```gml
// sprite (spr_window) is 200x200 pixels
var radius = 100;
var vertex_count = 32;

var texture = sprite_get_texture(spr_window, 0);
draw_primitive_begin_texture(pr_trianglestrip, texture);

// using the same sawtooth pattern + trianglestrip for drawing
for (var i = 0; i < vertex_count / 2; i++) {

    var angle1 = (i / vertex_count) * 360;
    var angle2 = ((vertex_count - i) / vertex_count) * 360;

    draw_vertex_texture(
         x + lengthdir_x(radius, angle1),
         y + lengthdir_y(radius, angle1),
        .5 + lengthdir_x(.5,	 angle1),
        .5 + lengthdir_y(.5,	 angle1)
    );

    draw_vertex_texture(
         x + lengthdir_x(radius, angle2),
         y + lengthdir_y(radius, angle2),
        .5 + lengthdir_x(.5,	 angle2),
        .5 + lengthdir_y(.5,	 angle2)
    );
}

if (vertex_count % 2 == 0) draw_vertex_texture(
     x + lengthdir_x(radius, 180),
     y + lengthdir_y(radius, 180),
    .5 + lengthdir_x(.5,     180),
    .5 + lengthdir_y(.5,     180)
);

draw_primitive_end();
```

![Textured circle drawn with code above](./articles/textured_circle.mp4)

Not much changed in the draw code to get this result. ``draw_vertex_texture()`` now takes two coordinates. The first coordinate is calculated how we've always done it, ``xy + lengthdir_xy(radius, angle)``, but the second coordinate uses .5 in place of both ``xy`` and ``radius``. I mentioned above that texture coordinates were values between 0 and 1. The middle of 0 and 1 is .5. The trigonometry functions, ``lengthdir_x()`` and ``lengthdir_y()`` return values between -length and +length, so if we set length to .5, the coordinates can be anything between 0 and 1 when added to .5.

## Cogwheels

![Rotating cogwheel](./articles/cogwheel.mp4)

Let's draw some fun shapes. By drawing every third vertex in the center and the rest around a circle, with ``pr_trianglestrip``, we get a normal filled-in circle. If you take three out of five vertices and draw them with an extended radius, you get a cogwheel.

```gml
var radius = 100;
var vertex_count = 35;

draw_primitive_begin(pr_trianglestrip);

for (var i = 0; i < vertex_count + 1; i++) {
    var angle = (i / vertex_count) * 360;
    var rad = radius;

    if (i % 5 > 1) rad += 16;

    draw_vertex(
        x + lengthdir_x(rad, angle),
        y + lengthdir_y(rad, angle)
    );

    if (i % 2 == 1) draw_vertex(x, y);
}

draw_primitive_end();
```

Add ``image_angle`` to ``angle`` and increase it over time to rotate it counter-clockwise. Draw every other vertex with a different radius from the center instead of every third in the center to make a hole in the cogwheel.

```gml
var radius = 100;
var vertex_count = 35;
var inner_radius = .6;

draw_primitive_begin(pr_trianglestrip);

for (var i = 0; i < vertex_count + 1; i++) {
    var angle = (i / vertex_count) * 360 + image_angle;
	var rad = radius;

	if (i % 5 > 1) rad += 16;

    draw_vertex(
         x + lengthdir_x(rad, angle),
         y + lengthdir_y(rad, angle)
	);

	draw_vertex(
		x + lengthdir_x(radius * inner_radius, angle),
		y + lengthdir_y(radius * inner_radius, angle)
	);
}

draw_primitive_end();
```

## Spirals

![Buy... Tony's games...](./articles/spirals.mp4)

Spirals are really simple. Each angle has a slightly bigger radius, and it draws lines around ``vertex_count`` multiple times.

```gml
radius       = 100;
vertex_count =  42;

spiral_count =   6;
spiral_grow  =  .4;
line_width   = 1.4;

for (var i = 0; i < vertex_count * spiral_count; i++) {
    var angle1 = (i / vertex_count)       * 360 + image_angle;
    var angle2 = ((i + 1) / vertex_count) * 360 + image_angle;

    // i * spiral_grow is how much longer an angle should be
    draw_line_width(
        x + lengthdir_x(radius + i * spiral_grow, angle1),
        y + lengthdir_y(radius + i * spiral_grow, angle1),
        x + lengthdir_x(radius + (i + 1) * spiral_grow, angle2),
        y + lengthdir_y(radius + (i + 1) * spiral_grow, angle2),
        line_width
    );
}
```

## Pentagrams

![Pentagram and other shapes with same code](./articles/pentagram.mp4)

Do you suddenly feel like summoning demons? Pentagrams are also really simple to draw. Each vertex is connected with the vertex three iterations ahead, and there are only five vertices (thus the name *penta*-gram).

```gml

var radius = 64;
var line_width = 2;
var vertex_count = 5;

// red/pink color in BGR
draw_set_color($7c27ea);

for (var i = 0; i < vertex_count + 1; i++) {
    var angle1 = (i / vertex_count) * 360 + image_angle;
    var angle2 = ((i + 3 % vertex_count) / vertex_count) * 360 + image_angle;

    draw_line_width(
         x + lengthdir_x(radius, angle1),
         y + lengthdir_y(radius, angle1),
         x + lengthdir_x(radius, angle2),
         y + lengthdir_y(radius, angle2),
         line_width
     );
}

draw_set_color(c_white);
```

## Challenge

Want to challenge yourself with the knowledge you've now acquired? You could take on some challenges. If you make one of these, tag [me on twitter](https://twitter.com/tonystr_)!

* Make an [empire star](https://en.wikipedia.org/wiki/Galactic_Empire_(Star_Wars)) from Starwars
* Make an [animated machine](https://en.wikipedia.org/wiki/Machine)) with interlocking cogwheels
* Make a [planet simulation](https://managore.itch.io/planetarium) inspired by [managore](https://twitter.com/Managore) or the [solar system](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fkosmoactions.files.wordpress.com%2F2012%2F02%2Fsolar-system.jpg&f=1)

## Further Reading

If you're interested in reading more, here are some more articles on drawing with circles and primitives:

* [Circular healthbars](http://www.davetech.co.uk/gamemakercircularhealthbars) by davetech
* [Circular cooldown rectangle](https://yal.cc/gamemaker-circular-cooldown-rectangle/) by YellowAfterlife
