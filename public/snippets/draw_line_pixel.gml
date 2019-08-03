/// @desc draws line from pixel sprite
/// @requires spr_pixel (1x1 white pixel)
/// @arg x1
/// @arg y1
/// @arg x2
/// @arg y2
/// @arg color*
/// @arg alpha*

gml_pragma("forceinline");

var _x1 = argument[0];
var _y1 = argument[1];
var _x2 = argument[2];
var _y2 = argument[3];

draw_sprite_ext(
	spr_pixel, 0,
	_x1, _y1,
	point_distance(_x1, _y1, _x2, _y2), 1,
	point_direction(_x1, _y1, _x2, _y2),
	argument_count > 4 ? argument[4] : draw_get_color(),
	argument_count > 5 ? argument[5] : draw_get_alpha()
);
