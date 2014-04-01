goog.provide('maze');
goog.require('cljs.core');
maze.graph = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
maze.graph_size = cljs.core.atom.call(null,0);
maze.walls = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
maze.frame_number = cljs.core.atom.call(null,0);
maze.frame_time = cljs.core.atom.call(null,0);
maze.canvas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
maze.context = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
maze.reset_canvas_aspect = (function reset_canvas_aspect(){cljs.core.deref.call(null,maze.canvas).width = window.innerWidth;
return cljs.core.deref.call(null,maze.canvas).height = window.innerHeight;
});
maze.generate_square_graph = (function generate_square_graph(size){return cljs.core.zipmap.call(null,cljs.core.range.call(null,size),cljs.core.repeat.call(null,size,cljs.core.PersistentArrayMap.EMPTY));
});
maze.at = (function at(coord){return cljs.core.get_in.call(null,cljs.core.deref.call(null,maze.graph),coord);
});
maze.place = (function place(coord,item){return cljs.core.swap_BANG_.call(null,maze.graph,cljs.core.assoc_in,coord,item);
});
maze.is_cell = (function is_cell(coord){return typeof maze.at.call(null,coord) === 'string';
});
maze.is_wall = (function is_wall(coord){return !(typeof maze.at.call(null,coord) === 'string');
});
maze.request_animation_frame = (function request_animation_frame(callback){return setTimeout(callback,1000);
});
maze.draw = (function draw(){var n__4011__auto__ = cljs.core.count.call(null,cljs.core.deref.call(null,maze.graph));var y = 0;while(true){
if((y < n__4011__auto__))
{var n__4011__auto___4534__$1 = cljs.core.count.call(null,cljs.core.deref.call(null,maze.graph));var x_4535 = 0;while(true){
if((x_4535 < n__4011__auto___4534__$1))
{if(maze.is_cell.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [y,x_4535], null)))
{cljs.core.deref.call(null,maze.context).fillStyle = "navy";
cljs.core.deref.call(null,maze.context).fillRect((10 * x_4535),(10 * y),10,10);
} else
{cljs.core.deref.call(null,maze.context).fillStyle = "grey";
cljs.core.deref.call(null,maze.context).fillRect((10 * x_4535),(10 * y),10,10);
}
{
var G__4536 = (x_4535 + 1);
x_4535 = G__4536;
continue;
}
} else
{}
break;
}
{
var G__4537 = (y + 1);
y = G__4537;
continue;
}
} else
{return null;
}
break;
}
});
maze.von_neumann_neighborhood = (function von_neumann_neighborhood(coord){return cljs.core.apply.call(null,cljs.core.vector,cljs.core.map.call(null,(function (dir){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.first.call(null,coord) + cljs.core.first.call(null,dir)),(cljs.core.last.call(null,coord) + cljs.core.last.call(null,dir))], null);
}),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [-1,0], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,0], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,-1], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,1], null)], null)));
});
maze.neighboring_walls = (function neighboring_walls(coord){return cljs.core.apply.call(null,cljs.core.vector,cljs.core.filter.call(null,maze.is_wall,maze.von_neumann_neighborhood.call(null,coord)));
});
maze.get_time = (function get_time(){return Math.round((new Date()).getTime());
});
maze.random_neighbor_cell = (function random_neighbor_cell(coord){return cljs.core.rand_nth.call(null,cljs.core.apply.call(null,cljs.core.vector,cljs.core.filter.call(null,maze.is_cell,maze.von_neumann_neighborhood.call(null,coord))));
});
maze.opposite_cell = (function opposite_cell(from,to){var yDiff = (cljs.core.first.call(null,to) - cljs.core.first.call(null,from));var xDiff = (cljs.core.last.call(null,to) - cljs.core.last.call(null,from));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.first.call(null,to) + yDiff),(cljs.core.last.call(null,to) + xDiff)], null);
});
maze.y = (function y(coord){return cljs.core.first.call(null,coord);
});
maze.x = (function x(coord){return cljs.core.last.call(null,coord);
});
maze.in_bounds = (function in_bounds(coord){return ((maze.y.call(null,coord) > 0)) && ((maze.x.call(null,coord) > 0)) && ((maze.y.call(null,coord) < cljs.core.deref.call(null,maze.graph_size))) && ((maze.x.call(null,coord) < cljs.core.deref.call(null,maze.graph_size)));
});
maze.interv = (function interv(wls){var rand_index = cljs.core.rand_int.call(null,cljs.core.count.call(null,wls));var wall = cljs.core.get.call(null,wls,rand_index);var cell = maze.random_neighbor_cell.call(null,wall);var opposite = maze.opposite_cell.call(null,cell,wall);var not_current_wall = ((function (rand_index,wall,cell,opposite){
return (function (i,val){if(!(cljs.core._EQ_.call(null,i,rand_index)))
{return val;
} else
{return null;
}
});})(rand_index,wall,cell,opposite))
;var rest_of_walls = cljs.core.apply.call(null,cljs.core.vector,cljs.core.keep_indexed.call(null,not_current_wall,wls));if((maze.in_bounds.call(null,opposite)) && (maze.is_wall.call(null,opposite)))
{maze.place.call(null,wall,"wut");
return maze.place.call(null,opposite,"wut");
} else
{return null;
}
});
maze.animation_loop = (function animation_loop(){cljs.core.swap_BANG_.call(null,maze.frame_number,cljs.core.inc);
var start_time = maze.get_time.call(null);if((cljs.core.count.call(null,cljs.core.deref.call(null,maze.walls)) > 0))
{var result = maze.interv.call(null,cljs.core.deref.call(null,maze.walls));maze.draw.call(null);
var total_time_4538 = (maze.get_time.call(null) - start_time);var frame_number_elem_4539 = document.getElementById("frame-number");var wall_count_4540 = document.getElementById("wall-count");var frame_time_elem_4541 = document.getElementById("frame-time");frame_time_elem_4541.innerHTML = total_time_4538;
wall_count_4540.innerHTML = cljs.core.count.call(null,cljs.core.deref.call(null,maze.walls));
frame_number_elem_4539.innerHTML = cljs.core.deref.call(null,maze.frame_number);
cljs.core.reset_BANG_.call(null,maze.walls,result);
return maze.request_animation_frame.call(null,animation_loop);
} else
{return null;
}
});
maze.start = (function start(){cljs.core.reset_BANG_.call(null,maze.canvas,document.getElementById("display"));
cljs.core.reset_BANG_.call(null,maze.context,cljs.core.deref.call(null,maze.canvas).getContext("2d"));
maze.reset_canvas_aspect.call(null);
window.onresize = (function (){maze.reset_canvas_aspect.call(null);
return maze.draw.call(null);
});
var factor = 10;var sizeY = Math.floor((window.innerHeight / factor));var sizeX = Math.floor((window.innerWidth / factor));var midY = Math.floor((sizeY / 2));var midX = Math.floor((sizeX / 2));var start_coord = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [midY,midY], null);cljs.core.reset_BANG_.call(null,maze.graph_size,sizeY);
cljs.core.reset_BANG_.call(null,maze.graph,maze.generate_square_graph.call(null,sizeY));
maze.place.call(null,start_coord,"start");
cljs.core.reset_BANG_.call(null,maze.walls,maze.neighboring_walls.call(null,start_coord));
return maze.animation_loop.call(null);
});
goog.exportSymbol('maze.start', maze.start);
