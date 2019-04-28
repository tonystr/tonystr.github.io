/// @desc draws self with default arguments
/// @arg sprite_index*
/// @arg image_index*
/// @arg x*
/// @arg y*
/// @arg xscale*
/// @arg yscale*
/// @arg rot*
/// @arg col*
/// @arg alpha*

gml_pragma("forceinline");

draw_sprite_ext(
	argument_count > 0 ? argument[0] : sprite_index,
	argument_count > 1 ? argument[1] : image_index,
	argument_count > 2 ? argument[2] : x,
	argument_count > 3 ? argument[3] : y,
	argument_count > 4 ? argument[4] : image_xscale,
	argument_count > 5 ? argument[5] : image_yscale,
	argument_count > 6 ? argument[6] : image_angle,
	argument_count > 7 ? argument[7] : image_blend,
	argument_count > 8 ? argument[8] : image_alpha
);
