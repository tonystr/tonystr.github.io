/// @desc place_meeting of multiple objects
/// @returns boolean
/// @arg x
/// @arg y
/// @arg obj[]

gml_pragma("forceinline");

var _ls = array_length_1d(argument2);

for (var i = 0; i < _ls; i++) {
	if (place_meeting(argument0, argument1, argument2[i])) return true;
}

return false;
