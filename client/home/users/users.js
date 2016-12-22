import {inject} from 'aurelia-dependency-injection';
import {Repository} from 'data/repository';
import {User} from 'data/user';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {I18N} from 'aurelia-i18n';
import {DialogService} from 'aurelia-dialog';
import {UserDetail} from '../user-detail/user-detail';
import {CurrentUser} from 'core/current-user';

@inject(Repository, CommonDialogs, I18N, DialogService, CurrentUser)
export class Users {
    
    constructor(dr, commonDialogs, i18n, dialogService, currentUser) {

        this.users;
        this.dr = dr;
        this.commonDialogs = commonDialogs;
        this.i18n = i18n;
        this.dialogService = dialogService;
        this.currentUser = currentUser;

        this.refresh();
    }

    refresh() {
        this.dr.fetchAll(User).then(
            data => {
                this.users = data;
            },
            err => {
                this.message = (err.message);
            }
        ); 
    }

    add() {
        let user = new User();
        return this.dialogService
            .open({ viewModel: UserDetail, model: { user } })
            .then(response => {
                this.refresh();
        });
    }

    delete(user) {

        let msg = this.i18n.tr('user.delete-message', { username: user.displayName });

        return this.commonDialogs
            .showMessage(msg, 'user.delete-title', ['cancel', 'ok'])
            .then(response => {
                if (!response.wasCancelled) {
                    //delete user
                    this.dr.delete(user).then(
                        ok => {
                            this.refresh();
                        },
                        err => {
                            this.message = (err.message);
                        }
                    );
                }
            });
    }

    getDetail(user) {
        return this.dialogService
            .open({ viewModel: UserDetail, model: { user } })
            .then(response => {
                this.refresh();
            }
        );
    }

    canDelete(user) {
        return user.id !== this.currentUser.id;
    }

}