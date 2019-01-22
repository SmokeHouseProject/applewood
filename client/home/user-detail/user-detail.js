import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Device} from 'core/device';
import {Repository} from 'data/repository';
import roles from 'constants/roles';
import {Converter} from 'constants/converter';
import {User} from 'data/user';
import md5 from 'blueimp-md5';

@inject(DialogController, Device, Repository, Converter)
export class UserDetail {

    constructor(dialogController, device, dr, converter) {
        this.device = device;
        this.dr = dr;
        
        this.roles = converter.toNameValuePairs(roles, 'roles');
        this.password = null;

        this.dialogController = dialogController;
        bindEvents(dialogController, this);
    }

    activate(model) {

        this.user = model.user;

        //fetch latest => ensures concurrency
        this.dr.fetch(model.user).then(
            data => {
                _.merge(this.user, data);
            },
            err => {
                this.errorMessage = (err.message);
            }
        )

    }

    enterPressed() {
        this.save();
    }

    cancel() {
        _.delay( () => {
            this.dialogController.cancel();
        }, 100)
    }

    save() {

        //encrypted password if user has entered one
        if (!_.isEmpty(this.password)) {
            this.user.password = md5(this.password);
        } else {
            //clear password from model
            this.user.password = null;
        }

        if (this.user.id) {
            //update user
            this.dr.update(this.user).then(
                data => {
                    _.merge(this.user, data);
                    this.cancel();
                },
                err => {
                    this.errorMessage = (err.message);
                }
            );
        } else {
            //add new user
            this.dr.create(this.user).then(
                data => {
                    _.merge(this.user, data);
                    this.cancel();
                },
                err => {
                    this.errorMessage = (err.message);
                }
            );
        }

        //clear password from model
        this.user.password = null;
      
    }

}

//auto close if user taps outside dialog box
function bindEvents(controller, context) {
    let eventType = context.device.platform === 'browser' ? 'click' : 'touchstart';

    controller.settings.position = function (container, overlay) {
        container.addEventListener(eventType, function (e) {
            if (e.target === container) {
                context.cancel();
            }
        }, false);
    }
}
