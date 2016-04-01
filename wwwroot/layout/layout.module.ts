require("../core/core.module");

import { HomeContainerComponent } from "./home-container.component";
import { AdminContainerComponent } from "./admin-container.component";

var app = (<any>angular.module("app.layout", [
    "app.core"
]));

app.component(HomeContainerComponent);
app.component(AdminContainerComponent);