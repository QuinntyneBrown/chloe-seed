﻿import { ITemplate, ITemplateGetOptions } from "./popover.interfaces";


export class Template implements ITemplate {

    constructor(private $http: ng.IHttpService,
        private $q: ng.IQService,
        private $templateCache: ng.ITemplateCacheService) {}

    public get = (options: ITemplateGetOptions) => {

        var deferred = this.$q.defer();
        var cacheResult = this.$templateCache.get(options.templateUrl);

        if (cacheResult) {
            if (Array.isArray(cacheResult))
                deferred.resolve(cacheResult[1]);
            deferred.resolve(cacheResult);
            return deferred.promise;
        }

        this.$http.get(options.templateUrl, { cache: this.$templateCache }).then((response) => {
            deferred.resolve(<string>response.data);
        });

        return deferred.promise;
    }

}

