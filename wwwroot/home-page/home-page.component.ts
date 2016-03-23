import { CanActivate, Component, ChangeDetectionStrategy } from "../core";

import { HomePageActionCreator } from "./home-page.actions";

@Component({
    templateUrl: "wwwroot/home-page/home-page.component.html",
    selector: "home-page",
    providers: ["homePageActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    constructor(private homePageActionCreator: HomePageActionCreator) { }
  
}
