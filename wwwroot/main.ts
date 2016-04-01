require("./core/core.module");
require("./router-outlet/router-outlet.module");

require("./app/app.module");
require("./backdrop/backdrop.module");
require("./button/button.module");

require("./header/header.module");
require("./modal/modal.module");
require("./tabs/tabs.module");
require("./login/login.module");
require("./layout/layout.module");

var app: any = angular.module("app", [
    "app.core",
    "app.routerOutlet",

    "app.app",
    "app.backdrop",
    "app.button",
    "app.header",
    "app.tabs",
    "app.login",
    "app.modal",
    "app.layout"
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
}]);

app.config(["apiEndpointProvider", (apiEndpointProvider) => {
    apiEndpointProvider.configure("/api");
}]);

app.config(["loginRedirectProvider", (loginRedirectProvider) => {
    loginRedirectProvider.setDefaultUrl("/");
}]);

