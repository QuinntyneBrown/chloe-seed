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

    createInstance = (options:any) => {
        var instance = new VirtualForRenderer(this.$compile, this.$interval, this.getY, this.virtualForDependencyResolver, this.safeDigest, this.transformY);

        return instance;
    }

    render = (options: any) => { }

    private _scope: any;
    private _lastScrollY: number = 0;
    private _collectionManager: CollectionManager;
    private _container: Container;
    private _viewPort: ViewPort;
    private _renderedNodes: RenderedNodes;
    private _attributes: ng.IAttributes;
    private get _controlPrefix() { return "virtualFor"; }
}