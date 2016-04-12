import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { TabsActionCreator } from "./tabs.actions";

@Component({
    template: require("./tab-content.component.html"),
    styles: [require("./tab-content.component.css")],
    selector: "tab-content",
    transclude: true,
    viewProviders: ["tabsActionCreator"]
})
export class TabContentComponent {
    constructor(private tabsActionCreator: TabsActionCreator) { }
    storeOnChange = state => { }
    ngOnInit = () => this.tabsActionCreator.tabChildLoaded();
}