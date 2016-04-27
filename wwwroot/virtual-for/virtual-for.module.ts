require("../core/core.module");

import { VirtualForComponent } from "./virtual-for.component";
import { VirtualForActionCreator } from "./virtual-for.actions";
import *  as reducers from "./virtual-for.reducers";

var app = (<any>angular.module("app.virtualFor", [
    "app.core"    
]));

app.service("virtualForActionCreator",["$location","dispatcher","virtualForService","guid",VirtualForActionCreator]);

app.component(VirtualForComponent);

app.config(["reducersProvider", reducersProvider => {	
    for (var reducer in reducers) { reducersProvider.configure(reducers[reducer]); }
}]);
