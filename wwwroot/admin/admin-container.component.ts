import { CanActivate, Component, ChangeDetectionStrategy } from "core/core";

@Component({
    templateUrl: "wwwroot/layout/admin-container.component.html",
    selector: "admin-container",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContainerComponent { }
