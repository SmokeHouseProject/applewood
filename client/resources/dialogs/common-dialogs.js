import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {MessageBox} from './message-box';
import {Prompt} from './prompt';
import {Login} from './login';

@inject(DialogService)
export class CommonDialogs {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    showMessage(message, title = 'message.title', options = ['ok']) {
        return this.dialogService.open({ viewModel: MessageBox, model: { message, title, options } });
    }

    prompt(message, title = 'prompt.title') {
        return this.dialogService.open({ viewModel: Prompt, model: { message, title } });
    }

    login() {
        return this.dialogService.open({ viewModel: Login });
    }

}