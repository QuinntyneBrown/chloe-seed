require("../core/core.module");

import { VirtualForComponent } from "./virtual-for.component";

import { VirtualForActionCreator } from "./virtual-for.actions";

import { VirtualForRenderer } from "./virtual-for-renderer.service";
import { VirtualForDependencyResolver } from "./virtual-for-dependency-resolver.service";
import { ViewPort } from "./view-port.service";
import { Container } from "./container.service";
import { RenderedNodes } from "./rendered-nodes.service";
import { CollectionManager } from "./collection-manager.service";

import *  as reducers from "./virtual-for.reducers";

var app = (<any>angular.module("app.virtualFor", [
    "app.core"    
]));

app.service((VirtualForRenderer as any).serviceName, [...VirtualForRenderer.$inject, VirtualForRenderer]);
app.service((VirtualForDependencyResolver as any).serviceName, [...VirtualForDependencyResolver.$inject, VirtualForDependencyResolver]);
app.service((ViewPort as any).serviceName, [...ViewPort.$inject, ViewPort]);
app.service((Container as any).serviceName, [...Container.$inject, Container]);
app.service((RenderedNodes as any).serviceName, [...RenderedNodes.$inject, RenderedNodes]);
app.service((CollectionManager as any).serviceName, [...CollectionManager.$inject, CollectionManager]);

app.service("virtualForActionCreator",["$location","dispatcher","virtualForService","guid",VirtualForActionCreator]);

app.component(VirtualForComponent);

app.config(["reducersProvider", reducersProvider => {	
    for (var reducer in reducers) { reducersProvider.configure(reducers[reducer]); }
}]);
