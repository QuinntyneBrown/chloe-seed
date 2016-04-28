import { Service } from "../core";
import { VirtualForActionCreator } from "./virtual-for.actions";
import { CollectionManager } from "./collection-manager.service";
import { Container } from "./container.service";
import { RenderedNodes } from "./rendered-nodes.service";
import { ViewPort } from "./view-port.service";
import { VirtualForDependencyResolver } from "./virtual-for-dependency-resolver.service";

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
    constructor(private $compile, private $interval, private getY, private virtualForDependencyResolver: VirtualForDependencyResolver, private safeDigest, private transformY) { }

    createInstance = (options: any) => {
        var instance = new VirtualForRenderer(this.$compile, this.$interval, this.getY, this.virtualForDependencyResolver, this.safeDigest, this.transformY);
        instance._attributes = options.attributes;
        instance._scope = options.scope;
        instance._element = options.element;
        instance._template = options.template;
        instance._viewPort = this.virtualForDependencyResolver.resolve({ interfaceName: "ViewPort", element: instance._element });
        instance._container = this.virtualForDependencyResolver.resolve({ interfaceName: "Container", element: instance._element });
        instance._collectionManager = this.virtualForDependencyResolver.resolve({
            interfaceName: "CollectionManager",
            element: instance._element,
            scope: options.scope,
            items: options.items,
            attributes: options.attributes
        });
        instance._renderedNodes = this.virtualForDependencyResolver.resolve({ interfaceName: "RenderedNodes", container: instance._container });
        instance._scope.$on(instance.scrollEventName, instance.onScrollTo);
        instance._scope.$on(instance.removeItemEventName, instance.renderRemoveItem);
        instance._collectionManager.subscribe({ callback: instance.forceRender });
        instance._container.setHeight(instance._collectionManager.numberOfItems * instance.itemHeight);
        instance.$interval(instance.render, 1, null, false);
        instance.$interval(instance.onResize, 10, null, false);
        return instance;
    }

    public render = (options?: any) => {
        if (options && options.force) return this.forceRender();
        if (this.hasRendered === false) return this.initialRender();
        if (this._viewPort.scrollY > this._lastScrollY) return this.renderTopToBottom();
        if (this._viewPort.scrollY < this._lastScrollY) return this.renderBottomToTop();
    }

    private forceRender = () => {
        if (!this.hasRendered) return;
        this._container.reInitialize({ height: this._collectionManager.numberOfItems * this.itemHeight });
        this.initialRender();
        this.safeDigest(this._scope);
    }

    public initialRender = () => {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < this.numberOfRenderedItems; i++) {
            var childScope: any = this._scope.$new(true);
            childScope[this.itemName] = this._collectionManager.items[i];
            childScope.$$index = i;
            var itemContent = this.$compile(angular.element(this._template))(childScope);
            fragment.appendChild(itemContent[0]);
        }
        this._container.augmentedJQuery[0].appendChild(fragment);
        this.hasRendered = true;
    }

    public renderTopToBottom = () => {
        var reachedBottom = false;
        var allNodesHaveBeenMoved = false;
        var digestNeeded = false;

        do {
            var headAndTail = this._renderedNodes.getHeadAndTail();
            var tail = headAndTail.tail;
            var head = headAndTail.head;

            if ((<any>angular.element(tail.node).scope()).$$index == this._collectionManager.numberOfItems - 1)
                reachedBottom = true;

            if (head.bottom >= this._viewPort.scrollY)
                allNodesHaveBeenMoved = true;

            if (!reachedBottom && !allNodesHaveBeenMoved) {
                var headY: number = this.getY(head.node);
                var tailY: number = this.getY(tail.node);

                var currentY = this._container.top + headY + head.node.offsetTop;
                var desiredY = this._container.top + tailY + tail.node.offsetTop + this.itemHeight;
                var delta = (desiredY - currentY) + headY;

                var index = (<any>angular.element(tail.node).scope()).$$index;
                this.moveAndUpdateScope({
                    node: head.node,
                    position: delta,
                    index: index + 1,
                    item: this._collectionManager.items[index + 1]
                });
                digestNeeded = true;
            }

        } while (!reachedBottom && !allNodesHaveBeenMoved)

        if (digestNeeded) this.safeDigest(this._scope);

        this._lastScrollY = this._viewPort.scrollY;
    }

    public renderBottomToTop = () => {
        console.log(this.calculateScrollBottomDiff());
        var reachedTop = false;
        var allNodesHaveBeenMoved = false;
        var digestNeeded = false;

        do {
            var headAndTail = this._renderedNodes.getHeadAndTail();
            var tail = headAndTail.tail;
            var head = headAndTail.head;

            if ((<any>angular.element(head.node).scope()).$$index == 0)
                reachedTop = true;

            if (tail.top <= (this._viewPort.scrollY + this._viewPort.height))
                allNodesHaveBeenMoved = true;

            if (!reachedTop && !allNodesHaveBeenMoved) {
                var headY: number = this.getY(head.node);
                var tailY: number = this.getY(tail.node);

                var currentY = this._container.top + tailY + tail.node.offsetTop;
                var desiredY = this._container.top + headY + head.node.offsetTop - this.itemHeight;
                var delta = (desiredY - currentY) + tailY;

                var index = (<any>angular.element(head.node).scope()).$$index;
                this.moveAndUpdateScope({
                    node: tail.node,
                    position: delta,
                    index: index - 1,
                    item: this._collectionManager.items[index - 1]
                });
                digestNeeded = true;
            }

        } while (!reachedTop && !allNodesHaveBeenMoved)

        if (digestNeeded) this.safeDigest(this._scope);

        this._lastScrollY = this._viewPort.scrollY;
    }

    public renderRemoveItem = (event: any, options: any) => {
        var renderNodes = this._renderedNodes.getAll({ order: "asc" });
        var scope: any = null;
        this._collectionManager.items.splice(options.index, 1);
        this._collectionManager.numberOfItems = this._collectionManager.numberOfItems - 1;

        for (var i = 0; i < renderNodes.length; i++) {
            scope = angular.element(renderNodes[i].node).scope();
            scope[this.itemName] = this._collectionManager.items[scope.$$index];
        }

        if (renderNodes.length > this._collectionManager.numberOfItems) {
            angular.element(renderNodes[renderNodes.length - 1].node).scope().$destroy();
            this._container.htmlElement.removeChild(renderNodes[renderNodes.length - 1].node);
            this._container.setHeight(renderNodes.length * this.itemHeight);
        } else {
            this._container.setHeight(this._collectionManager.numberOfItems * this.itemHeight);
        }

        this.safeDigest(this._scope);
    }

    public moveAndUpdateScope = (options: any) => {
        this.transformY(options.node, options.position);
        var scope: any = angular.element(options.node).scope();
        scope[this.itemName] = options.item;
        scope.$$index = options.index;
    }

    public calculateScrollBottomDiff = () => {

        return this._container.top;
    }

    public onScrollTo = (event: any, criteria: any) => {
        this._collectionManager.getIndexByCriteriaAsync({ criteria: criteria }).then((result: any) => {
            this._viewPort.scrollTo(result.index * this.itemHeight);
        });
    }

    public onResize = () => {
        if (!this.maxViewPortHeight) this.maxViewPortHeight = this._viewPort.height;
        if (this.maxViewPortHeight && this.maxViewPortHeight < this._viewPort.height) {
            this.maxViewPortHeight = this._viewPort.height;

            var renderedNodesLength = this._renderedNodes.getAll({ order: "asc" }).length;

            while (this.numberOfRenderedItems > renderedNodesLength) {
                var tail = this._renderedNodes.getHeadAndTail().tail;
                var index = (<any>angular.element(tail.node).scope()).$$index + 1;

                var childScope: any = this._scope.$new(true);
                childScope[this.itemName] = this._collectionManager.items[index];
                childScope.$$index = index;
                var itemContent = this.$compile(angular.element(this._template))(childScope);
                this._container.augmentedJQuery.append(itemContent);

                var element = itemContent[0];

                var headY: number = this.getY(element);
                var tailY: number = this.getY(tail.node);

                var currentY = this._container.top + headY + element.offsetTop;
                var desiredY = this._container.top + tailY + tail.node.offsetTop + this.itemHeight;
                var delta = (desiredY - currentY) + headY;

                this.transformY(element, delta);
                renderedNodesLength++;
            }

            this.safeDigest(this._scope);
        }
    }

    public maxViewPortHeight: number;

    public get numberOfRenderedItems() {

        if (this._collectionManager.numberOfItems < this.max)
            return this._collectionManager.numberOfItems;

        return this.max;
    }

    public get max() {
        return Math.ceil(((this._viewPort.height * this.renderPageSize) + this._container.htmlElement.offsetTop) / Number(this.itemHeight));
    }

    public hasRendered: boolean = false;

    public calculateItemHeight = (options: any): number => {
        var itemHeight: number;
        if (options.items.length > 0) {
            var childScope: any = this._scope.$new(true);
            childScope[this.itemName] = options.items[0];
            var itemContent = this.$compile(angular.element(this._template))(childScope);
            this._container.augmentedJQuery.append(itemContent);
            itemHeight = itemContent[0].offsetHeight;
            this._container.htmlElement.removeChild(itemContent[0]);
        }
        alert(itemHeight);
        return itemHeight;
    }

    public get itemName() { return this._attributes[this._controlPrefix + "Of"]; }

    private _itemHeight: number;

    public get itemHeight() {
        if (!this._itemHeight && this._collectionManager.items.length > 0)
            this._itemHeight = this.calculateItemHeight({ items: this._collectionManager.items });

        if (!this._itemHeight) return Number(this._attributes[this._controlPrefix + "ItemHeight"]);

        return this._itemHeight;
    }

    public get renderPageSize() { return 1; }

    public get name() { return this._attributes[this._controlPrefix + "Name"]; }

    public element: ng.IAugmentedJQuery;

    public template: string;

    public get scrollEventName() { return this._controlPrefix + "Scroll" + this.name; }

    public get removeItemEventName() { return this._controlPrefix + "RemoveItem" + this.name; }


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