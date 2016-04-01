import { CanActivate, Component, ChangeDetectionStrategy } from "../core";

@Component({
    template: require("./button.component.html"),
    styles: [require("./button.component.css")],
    selector: "calypso-button",
    componentName: "calypsoButtonComponent",
    inputs: ['caption', 'onClick']
})
export class ButtonComponent {}
