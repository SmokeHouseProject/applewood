import {inject, noView} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CurrentUser} from 'core/current-user';
import event from 'constants/events';
import {Router} from 'aurelia-router';

@noView()
@inject(AuthService, EventAggregator, CurrentUser, Router)
export class Noaccess {

    constructor(authService, ea, user, router) {
        user.clear();
        ea.publish(event.logOut); 
        authService.logout();   
        router.navigateToRoute('root');
    }

}