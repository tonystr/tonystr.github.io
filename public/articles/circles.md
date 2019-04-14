
# Circles!

Everyone loves them; they're round, convex and infinitely smooth!

But following these criteria, how would you actually draw a circle? In the physical world, you could use a **drafting compass** to construct a decent circle. In the world of computers, most image manipulation software provide tools for *drawing* circles, but what if you want to *program* a circle? What are the rules that make up a circle, and how could you represent them in code? Knowing this can be a powerful tool for drawing and animating complex shapes like cog wheels, spirals or even **demonic pentagrams**.

<section class="video">
    <video loop>
        <source src="./articles/circle_demonstration.mp4" type="video/mp4">
    </video>
    <em>Circle of rocks, circular pentagram and circular attacks</em>
</section>

Regular polygons, such as triangles, squares, pentagons, hexagons and so on, can all be defined by how many edges they have. Drawing one such shape is as simple as finding the edges *(vertices)* of the shape, and drawing lines between them. Just like that "connect the dots" game you played as a kid.

Since they are regular shapes, all sides are equally long *(equilateral)*. If you keep increasing the amount of vertices, you'll get closer and closer to what looks like a circle, until you can't tell the difference anymore. It is in fact exactly this we'll use to draw circles.

<section class="video">
    <video loop>
        <source src="./articles/regular_ploygons.mp4" type="video/mp4">
    </video>
    <em>The more vertices an equilateral shape has, the closer it is to being a circle</em>
</section>

## Trigonometry

Points around a circle can be found with trigonometry. GML provides functions ``lengthdir_x()`` and ``lengthdir_y()``, which let you find points offset by a **length** and **direction**. The length will be always the radius of the circle, so the only thing that changes is the direction. With a simple ``for`` loop, you can find angles all around a circle. Since the direction needs to be an angle between 0 and 360, you could use these as the parameters to the ``for`` loop:

```gml
var radius = 32;

for (var i = 0; i < 360; i++) {

    var angle = i;

    draw_point(
        x + lengthdir_x(radius, angle),
        y + lengthdir_y(radius, angle)
    );
}
```

This works, but if you make ``radius`` too big, you'll just see a dotted circle <div class="dotted-circle"></div>. If you keep it small, like with a radius of 32, you're drawing way more points than you need to. So how do you balance this? You could use the formula for the *circumference of a circle*, ``u = 2πr``, to find exactly how many **angles** you need to draw points at. GML provides ``π`` as the constant ``pi``.

Once you know the circumference of the circle, you can loop to that, and calculate the angle as ``(i / circumference) * 360``, since ``i`` will always be between 0 and ``circumference``, but you need it to end up as a value between 0 and 360.

```gml
var radius = 32;
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
var radius = 32;
var line_length = 6;

var vertex_count = (2 * pi * radius) / line_length;

for (var i = 0; i < vertex_count; i++) {

    var angle = (i / vertex_count) * 360;
    var next_angle = ((i + 1) / vertex_count) * 360;

    draw_line(
        x + lengthdir_x(radius, angle),
        y + lengthdir_y(radius, angle),
        x + lengthdir_x(radius, next_angle),
        y + lengthdir_y(radius, next_angle)
    );
}
```

With this code, you essentially have the same as what you saw in the 2nd gif.

If your ``line_length`` is long and the ``radius`` short, you'll see the edges clearly, and in extreme cases it might become a pentagon, square or even triangle instead of a circle at all. You have to experiment a little to see what ``line_length``s are appropriate for you.

Note that using the formula for the circumference of a circle and a line length variable, is only needed to allow scalable circles. These circles would work at any size. You could make the ``radius`` an instance variable and increase it over time and it would still look like a circle. However, you don't absolutely *need* to use this whenever you want to draw a circle. You could just set the ``vertex_count`` manually.

## Primitive drawing
