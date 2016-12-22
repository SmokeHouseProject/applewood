import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CurrentUser} from 'core/current-user';
import routes from './routes';
import event from 'constants/events';

@inject(AuthService, EventAggregator, CurrentUser)
export class Home {

    constructor(authService, ea, user) {
        this.auth = authService;
        this.ea = ea;
        this.user = user;
    }

    configureRouter(config, router) {
        this.router = router;
        config.map(routes);
    }

    logout() {
        this.user.clear();
        this.ea.publish(event.logOut); 
        return this.auth.logout(); 
    }

}




