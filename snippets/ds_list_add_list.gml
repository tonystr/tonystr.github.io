/// @desc adds marked list to list
/// @arg list1
/// @arg list2

gml_pragma("forceinline");

ds_list_add(argument0, argument1);
ds_list_mark_as_list(argument0, ds_list_size(argument0) - 1);
