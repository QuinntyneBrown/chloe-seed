require("../core/core.module");

import { RegistrationComponent } from "./registration.component";
import { RegistrationContainerComponent } from "./registration-container.component";
import { RegistrationActionCreator } from "./registration.actions";
import { RegistrationService } from "./registration.service";
import *  as reducers from "./registration.reducers";

var app = (<any>angular.module("app.registration", [
    "app.core"    
]));

app.service("registrationActionCreator",["$location","dispatcher","registrationService","guid",RegistrationActionCreator]);
app.service("registrationService",["$q","apiEndpoint","fetch",RegistrationService]);
app.component(RegistrationComponent);
app.component(RegistrationContainerComponent);

app.config(["reducersProvider", reducersProvider => {	
    for (var reducer in reducers) { reducersProvider.configure(reducers[reducer]); }
}]);
