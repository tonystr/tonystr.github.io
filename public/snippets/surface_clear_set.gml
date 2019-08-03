/// @desc clears surface and sets surface target
/// @returns surface
/// @arg surf
/// @arg width
/// @arg height
/// @arg color*
/// @arg alpha*

gml_pragma("forceinline");

var _surf = argument[0];

if (!surface_exists(_surf)) _surf = surface_create(argument[1], argument[2]);
if (surface_get_width(_surf)  != argument[1] || surface_get_height(_surf) != argument[2]) {
	surface_resize(_surf, argument[1], argument[2]);
}
surface_set_target(_surf);

// draws c_white, 0 on no arguments passed
// draws arg3, 1	on color passed
// draws arg3, arg4 on color and alpha passed
draw_clear_alpha(
	argument_count > 3 ? argument[3] : c_white,
	argument_count > 4 ? argument[4] : (argument_count > 3 ? 1 : 0)
);

return _surf;
