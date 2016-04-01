require("../core/core.module");

import { ButtonComponent } from "./button.component";

var app = (<any>angular.module("app.button", [
    "app.core"    
]));

app.component(ButtonComponent);

