import { CanActivate, Component, ChangeDetectionStrategy } from "../core";

@Component({
    template: require("./admin-container.component.html"),
    selector: "admin-container",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContainerComponent { }
