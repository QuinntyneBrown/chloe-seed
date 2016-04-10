import { IDispatcher } from "core/core";

export class ImageRolloverButtonActionCreator  {
    constructor(public dispatcher: IDispatcher) {
    }    

    enter = (options) => this.dispatcher.dispatch(new ImageRollerButtonMouseEnterAction(options.id));

    leave = (options) => this.dispatcher.dispatch(new ImageRollerButtonMouseLeaveAction(options.id));

    click = (options) => this.dispatcher.dispatch(new ImageRollerButtonMouseClickAction(options.id));
}


export class ImageRollerButtonMouseEnterAction { constructor(public id:string) { } }

export class ImageRollerButtonMouseLeaveAction { constructor(public id: string) { } }

export class ImageRollerButtonMouseClickAction { constructor(public id: string) { } }