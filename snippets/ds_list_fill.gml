/// @desc fills list with values
/// @arg list
/// @arg val
/// @arg start*
/// @arg end*

var _list  = argument[0];
var _val   = argument[1];
var _start = argument_count > 2 ? argument[2] : 0;
var _end   = argument_count > 3 ? argument[3] : ds_list_size(_list) - 1;

for (var i = _start; i <= _end; i++) {
	_list[| i] = _val;
}
