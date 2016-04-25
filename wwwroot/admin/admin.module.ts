require("../core/core.module");

import { AdminContainerComponent } from "./admin-container.component";
import { AdminSideNavComponent } from "./admin-side-nav.component";

var app = (<any>angular.module("app.admin", [
    "app.core"
]));

app.component(AdminContainerComponent);
app.component(AdminSideNavComponent);