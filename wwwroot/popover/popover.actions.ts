import { IDispatcher } from "../core/store";

export class PopoverActionCreator  {
    constructor(private $rootScope: angular.IRootScopeService, private dispatcher: IDispatcher, private guid) {
        $rootScope.$on("$routeChangeSuccess", this.close);
    }    

    public open = () => this.dispatcher.dispatch(new OpenPopoverAction());

    public close = () => this.dispatcher.dispatch(new ClosePopoverAction());
}

export class OpenPopoverAction { constructor() { } }

export class ClosePopoverAction { constructor() { } }

