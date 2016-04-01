import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { HeaderActionCreator } from "./header.actions";

@Component({
    template: require("./header.component.html"),
    styles: [require("./header.component.css")],
    selector: "header",
    viewProviders: ["headerActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    constructor(private headerActionCreator: HeaderActionCreator) { }
  
}
