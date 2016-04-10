import { CanActivate, Component, ChangeDetectionStrategy } from "core/core";

@Component({
    template: "<div data-ng-view=''></div>",
    selector: "router-outlet"
})
export class RouterOutletComponent { }
