require("../core/core.module");

import { ImageRolloverButtonComponent } from "./image-rollover-button.component";
import { ImageRolloverButtonActionCreator } from "./image-rollover-button.actions";

var app = (<any>angular.module("app.imageRolloverButton", [
    "app.core"    
]));

app.service("imageRolloverButtonActionCreator",["dispatcher",ImageRolloverButtonActionCreator]);

app.component(ImageRolloverButtonComponent);
