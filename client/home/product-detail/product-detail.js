import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Device} from 'core/device';
import {Repository} from 'data/repository';
import {User} from 'data/user';


@inject(DialogController, Device, Repository)
export class ProductDetail {

    constructor(dialogController, device, dr) {
        this.device = device;
        this.dr = dr;
        
        this.dialogController = dialogController;
        bindEvents(dialogController, this);
    }

    activate(model) {

        this.product = model.product;

        //fetch latest => ensures concurrency
        this.dr.fetch(model.product).then(
            data => {
                _.merge(this.product, data);
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

        if (this.product.id) {
            //update product
            this.dr.update(this.product).then(
                data => {
                    _.merge(this.product, data);
                    this.cancel();
                },
                err => {
                    this.errorMessage = (err.message);
                }
            );
        } else {
            //add new user
            this.dr.create(this.product).then(
                data => {
                    _.merge(this.product, data);
                    this.cancel();
                },
                err => {
                    this.errorMessage = (err.message);
                }
            );
        }
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