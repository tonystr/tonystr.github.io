/// @desc adds marked map to list
/// @arg list
/// @arg map

gml_pragma("forceinline");

ds_list_add(argument0, argument1);
ds_list_mark_as_map(argument0, ds_list_size(argument0) - 1);
