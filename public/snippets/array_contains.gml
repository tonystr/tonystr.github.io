/// @desc checks if array contains item
/// @returns boolean
/// @arg array
/// @arg value

gml_pragma("forceinline");

var _len = array_len(argument0);

for (var i = 0; i < _len; i++) {
	if (argument0[i] == argument1) return true;
}

return false;
