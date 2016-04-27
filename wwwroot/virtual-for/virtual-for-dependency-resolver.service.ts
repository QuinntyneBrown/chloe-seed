import { Service } from "../core";
import { CollectionManager } from "./collection-manager.service";
import { Container } from "./container.service";
import { ViewPort } from "./view-port.service";
import { RenderedNodes } from "./rendered-nodes.service";

@Service({
    serviceName: "virtualForDependencyResolver",
    viewProviders: ["$injector"]
})
export class VirtualForDependencyResolver {

    constructor(private $injector: ng.auto.IInjectorService) { }

    public get = (options: any): any => {
        switch (options.interfaceName) {
            case "CollectionManager":
                return (<CollectionManager>this.$injector.get("collectionManager")).createInstance({ items: options.items });

            case "ViewPort":
                return (<ViewPort>this.$injector.get("viewPort")).createInstance({ element: options.element });

            case "Container":
                return (<Container>this.$injector.get("container")).createInstance({ element: options.element });

            case "RenderedNodes":
                return (<RenderedNodes>this.$injector.get("renderedNodes")).createInstance({ container: options.container });
        }
    }
}