import { CanActivate, Component, ChangeDetectionStrategy, Inject } from "../core";

@Component({
    template: require("./admin-side-nav.component.html"),
    styles: [require("./admin-side-nav.component.css")],
    selector: "admin-side-nav",
})
export class AdminSideNavComponent {
    constructor() { }
}