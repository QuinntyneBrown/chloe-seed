import { CanActivate, Component, ChangeDetectionStrategy, Pipe, PipeTransform } from "../core";
import { AppActionCreator } from "./app.actions";

@Component({
    template: require("./app.component.html"),
    styles: [require("./app.component.css")],
    selector: "app",
    viewProviders: ["appActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    constructor(private appActionCreator: AppActionCreator) { }
  
}


