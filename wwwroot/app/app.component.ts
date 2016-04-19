import { CanActivate, Component, ChangeDetectionStrategy, Pipe, PipeTransform, ViewEncapsulation } from "../core";
import { IAppState } from "../core/store";

import { AppActionCreator } from "./app.actions";


export interface IAppState extends IAppState {
    modelHtml: string,
    isModalOpen: boolean
}

@Component({
    template: require("./app.component.html"),
    styles: [require("./app.component.css")],
    selector: "app",
    viewProviders: ["appActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
    constructor(private appActionCreator: AppActionCreator) {}
  
}


