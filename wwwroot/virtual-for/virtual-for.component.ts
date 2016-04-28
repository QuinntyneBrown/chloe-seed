import { CanActivate, ChangeDetectionStrategy, Component, IGetHtmlFn } from "../core";
import { VirtualForActionCreator } from "./virtual-for.actions";
import { VirtualForRenderer } from "./virtual-for-renderer.service";

@Component({
    template: require("./virtual-for.component.html"),
    styles: require("./virtual-for.component.css"),
    selector: "virtual-for",
    viewProviders: ["$attrs","$element","$scope","$transclude","getHtml", "virtualForRenderer"],
    transclude: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    restrict:"A"
})
export class VirtualForComponent {

    constructor(private $attrs: angular.IAttributes, private $element: angular.IAugmentedJQuery, private $scope:angular.IScope, private $transclude, private getHtml: IGetHtmlFn, private virtualForRenderer: VirtualForRenderer) { }

    ngOnInit = () => {        
        this.virtualForRenderer.createInstance({
            attributes: this.$attrs,
            element: this.$element,
            template: this.getHtml(this.clone[0],true),
            items: this.parseItems(this.$scope, this.$attrs),
            scope: this.$scope
        }).render({ lastScrollY: 0, scrollY: 0 });

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

    public verifyRepeatExpression(repeatExpression) {
        if (repeatExpression.match(/limitTo/) || repeatExpression.match(/startFrom/)) {
            throw new Error('"limitTo" and "startFrom" filters are not allowed in directive');
        }
    }

}
