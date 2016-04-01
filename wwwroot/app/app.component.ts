import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { AppActionCreator } from "./app.actions";

@Component({
    templateUrl: "wwwroot/app/app.component.html",
    selector: "app",
    viewProviders: ["appActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    constructor(private appActionCreator: AppActionCreator) { }
  
}
