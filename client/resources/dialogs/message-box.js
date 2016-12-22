import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Device} from 'core/device';

@inject(DialogController, Device)
export class MessageBox {
    constructor(dialogController, device) {
        this.device = device;
        this.dialogController = dialogController;
        bindEvents(dialogController, this);
    }

    activate(model) {
        this.model = model;
    }

    selectOption(option) {
        if (isCancel(option)) {
            this.dialogController.cancel(option);
        } else {
            this.dialogController.ok(option);
        }
    }

    cancel() {
        _.delay(() => {
            this.dialogController.cancel();
        }, 100)
    }
}

function isCancel(option) {
    return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
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