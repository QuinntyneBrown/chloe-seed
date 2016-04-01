import { CanActivate, Component, ChangeDetectionStrategy } from "../core";

@Component({
    templateUrl: "wwwroot/layout/home-container.component.html",
    selector: "home-container",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent { }
