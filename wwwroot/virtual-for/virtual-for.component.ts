import { CanActivate, ChangeDetectionStrategy, Component, IGetHtmlFn } from "../core";
import { VirtualForActionCreator } from "./virtual-for.actions";

@Component({
    template: require("./virtual-for.component.html"),
    styles: require("./virtual-for.component.css"),
    selector: "virtual-for",
    viewProviders: ["getHtml", "virtualForActionCreator"],
    transclude: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualForComponent {
    constructor(private getHtml: IGetHtmlFn, private virtualForActionCreator: VirtualForActionCreator) { }
  
}
