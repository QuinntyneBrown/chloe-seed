export class Renderer {

    setElementStyle = (element: HTMLElement, propertyName: string, propertyValue: string) => {
        element.style[propertyName] = propertyValue;
    }

}

angular.module("renderer", []).service("renderer", Renderer);