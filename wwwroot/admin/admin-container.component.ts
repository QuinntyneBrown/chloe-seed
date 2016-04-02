import { CanActivate, Component, ChangeDetectionStrategy } from "../core";

@Component({
    templateUrl: "wwwroot/layout/admin-container.component.html",
    selector: "admin-container",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContainerComponent { }
