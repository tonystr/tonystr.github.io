/// @desc draws grid and outline
/// @requires draw_grid, draw_rect_outline
/// @arg x1
/// @arg y1
/// @arg x2
/// @arg y2
/// @arg size		cell size (square)
/// @arg color*
/// @arg alpha*

gml_pragma("forceinline");

draw_grid(
	argument[0],
	argument[1],
	argument[2],
	argument[3],
	argument[4],
	argument_count > 5 ? argument[5] : draw_get_color(),
	argument_count > 6 ? argument[6] : draw_get_alpha()
);

draw_rect_outline(
	argument[0],
	argument[1] + 1,
	argument[2] - 1,
	argument[3],
	argument_count > 5 ? argument[5] : draw_get_color(),
	argument_count > 6 ? argument[6] : draw_get_alpha()
);
