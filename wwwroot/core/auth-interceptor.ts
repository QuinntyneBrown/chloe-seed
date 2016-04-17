require("./store");
import { IAppState, Store } from "./store";

class AuthInterceptor {

    constructor(private store: Store<IAppState>) {
        store.subscribe(state => this.storeOnChange(state));
    }

    static createInstance = store => new AuthInterceptor(store);

    storeOnChange = (state: IAppState) => { this.token = state.token };

    public request = (config) => {
        if (this.token) 
            config.headers.Authorization = "Bearer " + this.token;
        
        return config;
    }

    token: string;
}

angular.module("authInterceptor", ["store"])
    .factory("authInterceptor", ["store", store => new AuthInterceptor(store)])
    .config(["$httpProvider", $httpProvider => $httpProvider.interceptors.push("authInterceptor")]);