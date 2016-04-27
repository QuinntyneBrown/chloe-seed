import { Service } from "../core";

@Service({
    serviceName: "collectionManager",
    viewProviders:["$q"]
})
export class CollectionManager {
    constructor(private $q: ng.IQService) { }

    public createInstance = (options: any) => {
        var instance = new CollectionManager(this.$q);
        instance.items = options.items;
        instance.numberOfItems = options.items.length;
        return instance;
    }

    public getIndexByCriteriaAsync = (options: any) => {
        var deferred = this.$q.defer();
        var index: any = null;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i][options.criteria.key] == options.criteria.value) index = i;
        }
        deferred.resolve({ index: index });
        return deferred.promise;
    }

    private _numberOfItems: number;

    public get numberOfItems() { return this._numberOfItems; }

    public set numberOfItems(value: number) { this._numberOfItems = value; }

    private _items: any[];

    public get items() { return this._items; }

    public set items(value: any[]) { this._items = value; }

    public subscriptions: Array<any> = [];

    public subscribe = (options: any) => {
        this.subscriptions.push({
            callback: options.callback,
            id: this.subscriptions.length + 1,
            isActive: true
        });
        return this.subscriptions.length;
    }
}

