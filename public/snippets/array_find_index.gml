/// @desc finds first index of item in array
/// @returns real
/// @arg array
/// @arg value

gml_pragma("forceinline");

var _size = array_len(argument1);

for (var i = 0; i < _size; i++) {
	if (argument0[i] == argument1) return i;
}

return -1;
