import { Component, ChangeDetectionStrategy } from "../core";
import { ImageRolloverButtonActionCreator, ImageRollerButtonMouseEnterAction, ImageRollerButtonMouseLeaveAction, ImageRollerButtonMouseClickAction } from "./image-rollover-button.actions";

@Component({
    template: require("./image-rollover-button.component.html"),
    styles: require("./image-rollover-button.component.css"),
    selector: "image-rollover-button",
    viewProviders: ["$attrs", "$window", "guid","imageRolloverButtonActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageRolloverButtonComponent {
    constructor(private $attrs: angular.IAttributes, private $window: angular.IWindowService, private guid: Function, private imageRolloverButtonActionCreator: ImageRolloverButtonActionCreator) {}
    storeOnChange = state => {
        if (state.lastTriggeredByAction instanceof ImageRollerButtonMouseEnterAction && state.lastTriggeredByActionId == this.id) 
            this.src = this.$attrs["enter"];
        
        if (state.lastTriggeredByAction instanceof ImageRollerButtonMouseLeaveAction && state.lastTriggeredByActionId == this.id)
            this.src = this.$attrs["leave"];

        if (state.lastTriggeredByAction instanceof ImageRollerButtonMouseClickAction && state.lastTriggeredByActionId == this.id)
            this.$window.open(this.$attrs["url"], this.$attrs["target"]);        
    }

    mouseEnter = () => this.imageRolloverButtonActionCreator.enter({ id: this.id });

    mouseLeave = () => this.imageRolloverButtonActionCreator.leave({ id: this.id });
    
    onClick = () => this.imageRolloverButtonActionCreator.click({ id: this.id });

    src = this.$attrs["leave"];

    id = this.guid();
}
