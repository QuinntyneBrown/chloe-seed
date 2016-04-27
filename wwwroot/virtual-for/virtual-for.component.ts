import { CanActivate, ChangeDetectionStrategy, Component, IGetHtmlFn } from "../core";
import { VirtualForActionCreator } from "./virtual-for.actions";
import { VirtualForRenderer } from "./virtual-for-renderer.service";

@Component({
    template: require("./virtual-for.component.html"),
    styles: require("./virtual-for.component.css"),
    selector: "virtual-for",
    viewProviders: ["$transclude","getHtml", "virtualForRenderer"],
    transclude: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    restrict:"A"
})
export class VirtualForComponent {

    constructor(private $transclude, private getHtml: IGetHtmlFn, private virtualForRenderer: VirtualForRenderer) { }

    ngOnInit = () => {
        this.removeCustomAttributes(this.clone, "virtual-for");
        var s = this.template;
        var y = this.clone;
    }

    public clone: angular.IAugmentedJQuery;
    public template: angular.IAugmentedJQuery;
    public get parentElement() { return this.template.parent(); }

    public parseItems(scope: ng.IScope, attributes: ng.IAttributes): Array<any> {
        var match = attributes["virtualFor"].match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
        if (match) {
            var collectionStringArray = match[2].split(".");
            var items: any = scope;
            for (var i = 0; i < collectionStringArray.length; i++) {
                items = items[collectionStringArray[i]];
            }
            return items;
        } else {
            return JSON.parse(attributes["virtualFor"]);
        }
    }

    public removeCustomAttributes(clone: ng.IAugmentedJQuery, prefix: string) {
        var names: Array<string> = [];
        var attributes = clone[0].attributes;
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].nodeName.indexOf(prefix) > -1)
                names.push(attributes[i].nodeName);
        }
        names.forEach((name: string) => { clone[0].removeAttribute(name); });
    }

    public verifyRepeatExpression(repeatExpression) {
        if (repeatExpression.match(/limitTo/) || repeatExpression.match(/startFrom/)) {
            throw new Error('"limitTo" and "startFrom" filters are not allowed in directive');
        }
    }

}
