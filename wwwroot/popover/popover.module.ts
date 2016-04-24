require("../core/core.module");

import { PopoverActionCreator } from "./popover.actions";
import { Popover } from "./popover.service";
import { Position } from "./position.service";
import { Rectangle } from "./rectangle.service";
import { Ruler } from "./ruler.service";
import { Space } from "./space.service";
import { Template } from "./template.service";
import { translateXY } from "./translateXY";

import *  as reducers from "./popover.reducers";

var app = (<any>angular.module("app.popover", [
    "app.core"    
]));

app.service("popoverActionCreator",["$rootScope","dispatcher","guid",PopoverActionCreator]);

app.service("popover", [
    "$compile",
    "$document",
    "$http",
    "$q",
    "$timeout",
    "guid",
    "position",
    "store",
    "template",
    Popover]);

app.service("position", [
    "$q",
    "ruler",
    "space",
    "translateXY",
    Position]);

app.service("rectangle", [Rectangle]);

app.service("ruler", ["$document", "$q", "$timeout", "rectangle",Ruler]);

app.service("space", [Space]);

app.service("template", ["$http","$q","$templateCache",Template]);

app.value("translateXY", translateXY);

app.config(["reducersProvider", reducersProvider => {	
    for (var reducer in reducers) { reducersProvider.configure(reducers[reducer]); }
}]);

app.run(["popover", popover => { }]);
