import {inject} from 'aurelia-framework';
import {DialogController, DialogService} from 'aurelia-dialog';
import {Device} from 'core/device';
import {AuthService} from 'aurelia-auth';
import {I18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CurrentUser} from 'core/current-user';
import md5 from 'md5';
import event from 'constants/events';
import error from 'constants/errors';

@inject(DialogController, DialogService, Device, AuthService, I18N, EventAggregator, CurrentUser)
export class Login {
    constructor(dialogController, dialogService, device, authService, i18n, ea, user) {
        this.device = device;
        this.auth = authService;
        this.i18n = i18n;
        this.ea = ea;

        this.user = user;

        this.dialogService = dialogService;
        this.dialogController = dialogController;
        bindEvents(dialogController, this);
    }

    activate(model) {
        this.model = model;
    }
    
    attached() {
        //ios requires a longer delay before focus - no delay causes keyboard to appear and disappear
        let delay = this.device.platform === 'browser' ? 100 : 500;
        _.delay(() => {this.un.focus()} , delay);
    }

    detached() {
        //forces mobile keyboard to hide
        this.un.blur();
        this.pw.blur();
    }

    enterPressed() {
        if (this.username && this.password) {
            this.un.blur();
            this.pw.blur();
            this.login();
        }
    }

    login() {
        let _this = this;
        this.auth.login({ username: this.username.toLowerCase(), password: md5(this.password) })
            .then(response => {
                if (response.code) {
                    this.errorMessage = response.message;
                }
                else {
                    //persist logged in user
                    this.user.set(response.user).then(
                        () => {
                            _this.ea.publish(event.logIn);
                            _this.cancel();
                        }
                    );
                }
            })
            .catch(err => {
                console.error(err);
                this.errorMessage = error.networkError;
            });
    }

    cancel() {

        this.dialogController.cancel();

        //sometimes dialog re-appears after closing - not sure why
        //force the dialog to close if it is still open
        if (this.dialogService.hasActiveDialog) {
            _.each(this.dialogService.controllers, (controller) => {
                controller.cancel();
            })
        }
    }
    
}

//auto close if user taps outside dialog box
function bindEvents(controller, context) {  
    let eventType = context.device.platform === 'browser' ? 'click' : 'touchstart';

    controller.settings.position = function (container, overlay) {
        container.addEventListener(eventType, (e) => {
            if (e.target === container) {
                context.cancel();
            }
        }, false);
    }
}





