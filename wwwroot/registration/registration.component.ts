import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import { RegistrationActionCreator } from "./registration.actions";

@Component({
    templateUrl: "wwwroot/registration/registration.component.html",
    styleUrls: ["wwwroot/registration/registration.component.css"],
    selector: "registration",
    providers: ["invokeAsync", "registrationActionCreator"],
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
