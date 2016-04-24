require("./core/core.module");
require("./router-outlet/router-outlet.module");

require("./app/app.module");
require("./admin/admin.module");
require("./backdrop/backdrop.module");
require("./button/button.module");
require("./image-button/image-button.module");

require("./header/header.module");
require("./modal/modal.module");
require("./tabs/tabs.module");
require("./registration/registration.module");
require("./login/login.module");
require("./layout/layout.module");
require("./image-button/image-button.module");
require("./popover/popover.module");

var app: any = angular.module("app", [
    "app.core",
    "app.routerOutlet",

    "app.app",
    "app.admin",
    "app.backdrop",
    "app.button",
    "app.header",
    "app.imageButton",
    "app.tabs",
    "app.login",
    "app.modal",
    "app.registration",
    "app.layout",
    "app.popover"
]);

app.config(["initialStateProvider", "localStorageManagerProvider", (initialStateProvider, localStorageManagerProvider) => {
    var localStorageInitialState = localStorageManagerProvider.get({ name: "initialState" });
    if (!localStorageInitialState)
        localStorageManagerProvider.put({
            name: "initialState", value: {
            }
        });

    initialStateProvider.configure(localStorageManagerProvider.get({ name: "initialState" }));
}]);

app.config(["$routeProvider", ($routeProvider: angular.route.IRouteProvider) => {
    $routeProvider
        .when("/", { template: "<home-container></home-container>" })
        .when("/register", { template: "<registration-container></registration-container>" })
        .when("/login", { template: "<login-container></login-container>" });

    $routeProvider
        .when("/admin", { template: "<admin-container></admin-container>" });
}]);

app.config(["apiEndpointProvider", (apiEndpointProvider) => {
    apiEndpointProvider.configure("/api");
}]);

app.config(["loginRedirectProvider", (loginRedirectProvider) => {
    loginRedirectProvider.setDefaultUrl("/");
}]);

