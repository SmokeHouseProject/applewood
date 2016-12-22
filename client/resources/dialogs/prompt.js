import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';

@inject(DialogController)
export class Prompt {
    constructor(dialogController) {
        this.dialogController = dialogController;
        this.answer = null;
    }
  
    activate(model) {
        this.model = model;
    }
  
    ok() {
        if (this.answer) {
            this.dialogController.ok(this.answer);
        }
    }
  
    cancel() {
        this.dialogController.cancel();
    }
}