/// <reference path="../../typings/tsd.d.ts" />

require("./core.css");
require("../../lib/rx.all.compat.min")

require("./local-storage-manager-provider");
require("./store");

require("./add-or-update");
require("./api-endpoint-provider");
require("./append-to-body-async");
require("./debounce");
require("./extend-css-async");
require("./fetch");
require("./form-encode");
require("./get-from-url-sync");
require("./get-x");
require("./invoke-async");
require("./login-redirect-provider");
require("./safe-digest");
require("./component-extension");
require("./remove-element");
require("./route-resolver");
require("./route-when-extension");
require("./set-opacity-async");
require("./auth-interceptor");
require("./translate-x");
require("./translate-x-async");


let coreApp = (<any>angular.module("app.core", [
    "addOrUpdate",
    "appendToBodyAsync",
    "apiEndpoint",
    "authInterceptor",
    "debounce",
    "extendCssAsync",
    "fetch",
    "formEncode",
    "getFromUrlSync",
    "getX",
    "invokeAsync",
    "localStorageManager",
    "loginRedirect",
    "removeElement",
    "routeResolver",
    "routeWhenExtension",
    "safeDigest",
    "setOpacityAsync",
    "store",   
    "translateX",
    "translateXAsync",
]));
