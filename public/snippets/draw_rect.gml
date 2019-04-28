/// @desc draws rectangle from pixel sprite
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

draw_sprite_ext(spr_pixel, 0, _x1, _y1,
				argument[2] - _x1, argument[3] - _y1,  0,
				argument_count > 4 ? argument[4] : draw_get_color(),
				argument_count > 5 ? argument[5] : draw_get_alpha());
