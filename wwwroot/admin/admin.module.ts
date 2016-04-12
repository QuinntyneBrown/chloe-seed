require("../core/core.module");

import { AdminContainerComponent } from "./admin-container.component";

var app = (<any>angular.module("app.admin", [
    "app.core"
]));

app.component(AdminContainerComponent);