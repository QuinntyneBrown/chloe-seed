import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { FooterActionCreator } from "./footer.actions";

@Component({
    template: require("./footer.component.html"),
    styles: [require("./footer.component.css")],
    selector: "footer",
    viewProviders: ["footerActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    constructor(private footerActionCreator: FooterActionCreator) { }
  
}
