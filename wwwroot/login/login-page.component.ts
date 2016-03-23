import { CanActivate, Component, ChangeDetectionStrategy } from "../core";
import * as actions from "./login.actions";

@Component({
    templateUrl: "wwwroot/login/login-page.component.html",
    selector: "login-page",
    providers: ["loginRedirect"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
    constructor(private loginRedirect) { }

    storeOnChange = state => {
        if (state.lastTriggeredByAction instanceof actions.LoginSuccessAction) {            
            this.loginRedirect.redirectPreLogin()
        }
    }
}
