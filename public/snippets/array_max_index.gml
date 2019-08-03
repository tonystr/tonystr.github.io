/// @desc find index with largest value
/// @returns real
/// @arg array

var _array = argument0;
var _size = array_length_1d(_array);
var _max = _array[0];
var _maxi = 0;

for (var i = 1; i < _size; i++) {
	if (_array[i] > _max) {
		_max = _array[i];
		_maxi = i;
	}
}

return _maxi;
