// Compiled by ClojureScript .
goog.provide('prim');
goog.require('cljs.core');
goog.require('cljs.nodejs');
goog.require('cljs.nodejs');
console(._log,"yase");
prim.graph = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
prim.generate_square_graph = (function generate_square_graph(size){return cljs.core.zipmap.call(null,cljs.core.range.call(null,size),cljs.core.repeat.call(null,size,cljs.core.PersistentArrayMap.EMPTY));
});
prim.at = (function at(coord){return cljs.core.get_in.call(null,prim.graph,coord);
});
prim.isCell = (function isCell(coord){var item = prim.at.call(null,coord);return !((item === false) || ((void 0 === item)));
});
prim.isWall = (function isWall(coord){return prim.at.call(null,coord) === false;
});
prim.opposite_cell = (function opposite_cell(from,to){var yDiff = (cljs.core.first.call(null,from) - cljs.core.first.call(null,to));var xDiff = (cljs.core.last.call(null,from) - cljs.core.last.call(null,to));var coord = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.first.call(null,to) + yDiff),(cljs.core.last.call(null,to) + xDiff)], null);return prim.at.call(null,coord);
});
prim.request_animation_frame = (function (){var or__3163__auto__ = window.requestAnimationFrame;if(cljs.core.truth_(or__3163__auto__))
{return or__3163__auto__;
} else
{var or__3163__auto____$1 = window.webkitRequestAnimationFrame;if(cljs.core.truth_(or__3163__auto____$1))
{return or__3163__auto____$1;
} else
{var or__3163__auto____$2 = window.mozRequestAnimationFrame;if(cljs.core.truth_(or__3163__auto____$2))
{return or__3163__auto____$2;
} else
{var or__3163__auto____$3 = window.oRequestAnimationFrame;if(cljs.core.truth_(or__3163__auto____$3))
{return or__3163__auto____$3;
} else
{var or__3163__auto____$4 = window.msRequestAnimationFrame;if(cljs.core.truth_(or__3163__auto____$4))
{return or__3163__auto____$4;
} else
{return ((function (or__3163__auto____$4,or__3163__auto____$3,or__3163__auto____$2,or__3163__auto____$1,or__3163__auto__){
return (function (callback){return setTimeout(callback,17);
});
;})(or__3163__auto____$4,or__3163__auto____$3,or__3163__auto____$2,or__3163__auto____$1,or__3163__auto__))
}
}
}
}
}
})();
prim.frame_number = cljs.core.atom.call(null,0);
prim.frame_time = cljs.core.atom.call(null,0);
prim.animation_loop = (function animation_loop(){cljs.core.swap_BANG_.call(null,prim.frame_number,cljs.core.inc);
cljs.core.println.call(null,"frame-number",prim.frame_number);
return prim.request_animation_frame.call(null,animation_loop);
});
/**
* @param {...*} var_args
*/
prim._main = (function() { 
var _main__delegate = function (args){cljs.core.reset_BANG_.call(null,prim.graph,prim.generate_square_graph.call(null,5));
cljs.core.swap_BANG_.call(null,prim.graph,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,2], null),"peup");
cljs.core.println.call(null,cljs.core.get_in.call(null,prim.graph,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,2], null)));
cljs.core.println.call(null,prim.graph);
return prim.animation_loop.call(null);
};
var _main = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return _main__delegate.call(this,args);};
_main.cljs$lang$maxFixedArity = 0;
_main.cljs$lang$applyTo = (function (arglist__4534){
var args = cljs.core.seq(arglist__4534);
return _main__delegate(args);
});
_main.cljs$core$IFn$_invoke$arity$variadic = _main__delegate;
return _main;
})()
;
