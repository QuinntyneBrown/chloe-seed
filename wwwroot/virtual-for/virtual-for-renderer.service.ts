import { Service } from "../core";
import { VirtualForActionCreator } from "./virtual-for.actions";
import { CollectionManager } from "./collection-manager.service";
import { Container } from "./container.service";
import { RenderedNodes } from "./rendered-nodes.service";
import { ViewPort } from "./view-port.service";

@Service({
    serviceName: "virtualForRenderer",
    viewProviders: [
        "$compile",
        "$interval",
        "getY",
        "virtualForDependencyResolver",
        "safeDigest",
        "transformY"
    ]
})
export class VirtualForRenderer {
    constructor(private $compile, private $interval, private getY, private virtualForDependencyResolver, private safeDigest, private transformY) { }

    createInstance = (options: any) => {
        var instance = new VirtualForRenderer(this.$compile, this.$interval, this.getY, this.virtualForDependencyResolver, this.safeDigest, this.transformY);
        instance._attributes = options.attributes;
        instance._scope = options.scope;
        instance._element = options.element;
        instance._template = options.template;
        instance._viewPort = this.virtualForDependencyResolver.get({ interfaceName: "ViewPort", element: instance._element });
        instance._container = this.virtualForDependencyResolver.get({ interfaceName: "Container", element: instance._element });

        return instance;
    }

    render = (options: any) => { }
    private _template: string;
    private _element: angular.IAugmentedJQuery;
    private _scope: any;
    private _lastScrollY: number = 0;
    private _collectionManager: CollectionManager;
    private _container: Container;
    private _viewPort: ViewPort;
    private _renderedNodes: RenderedNodes;
    private _attributes: ng.IAttributes;
    private get _controlPrefix() { return "virtualFor"; }
}