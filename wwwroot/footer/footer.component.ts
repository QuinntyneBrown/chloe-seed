import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { FooterActionCreator } from "./footer.actions";

@Component({
    templateUrl: "wwwroot/footer/footer.component.html",
    selector: "footer",
    providers: ["footerActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    constructor(private footerActionCreator: FooterActionCreator) { }
  
}
