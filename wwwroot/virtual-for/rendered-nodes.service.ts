import { Service, getX, getY } from "../core";
import { Container } from "./container.service";

@Service({
    serviceName: "renderedNodes",
    viewProviders: ["getX","getY"]
})
export class RenderedNodes {
    constructor(private getX: any, private getY: any) { }

    public createInstance = (options: any) => {
        var instance = new RenderedNodes(this.getX, this.getY);
        instance.container = options.container;
        return instance;
    }

    private get nodes() { return this.container.htmlElement.childNodes; }

    public get map() {
        let map: Array<any> = [];
        let nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = <HTMLElement>nodes[i];
            map.push({
                top: this.getY(node) + node.offsetTop,
                bottom: this.getY(node) + node.offsetTop + node.offsetHeight,
                node: node
            });
        }
        return map;
    }

    public getAll = (options: any): any => {
        let direction: any;
        switch (options.orientation) {
            case "horizontal":
                direction = "left";
                break;

            default:
                direction = "top";
                break;
        }

        switch (options.order) {
            case "desc":
                return this.map.sort((a: any, b: any) => {
                    return b[direction] - a[direction];
                });

            case "asc":
                return this.map.sort((a: any, b: any) => {
                    return a[direction] - b[direction];
                });
        }
    }

    public getHead = () => {
        let map = this.getAll({ order: "asc" });
        if (map.length < 1) { return null; }
        return map[0];
    }

    public getTail = () => {
        let map = this.getAll({ order: "desc" });
        if (map.length < 1) { return null; }
        return map[0];
    }

    public getHeadAndTail = () => {
        let map = this.getAll({ order: "asc" });
        if (map.length < 1) { return null; }
        return {
            head: map[0],
            tail: map[map.length - 1]
        };
    }

    private container: Container;

}
    

