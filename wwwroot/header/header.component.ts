import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { HeaderActionCreator } from "./header.actions";

@Component({
    templateUrl: "wwwroot/header/header.component.html",
    selector: "header",
    providers: ["headerActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    constructor(private headerActionCreator: HeaderActionCreator) { }
  
}
