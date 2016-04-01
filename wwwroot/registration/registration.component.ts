import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { RegistrationActionCreator } from "./registration.actions";

@Component({
    template: require("./registration.component.html"),
    styles: [require("./registration.component.css")],
    selector: "registration",
    viewProviders: ["invokeAsync", "registrationActionCreator"],
    changeDetection: ChangeDetectionStrategy.OnPush  
})
export class RegistrationComponent {
    constructor(private invokeAsync, private registrationActionCreator: RegistrationActionCreator) { }
  
    tryToRegister = () => {  
        this.invokeAsync({
            action: this.registrationActionCreator.register,
            params: {
                data: this.entity
            }
        }).then(() => {
            this.registrationActionCreator.registrationSuccess({ entity: this.entity });
        });     
    }

    entity;
}
