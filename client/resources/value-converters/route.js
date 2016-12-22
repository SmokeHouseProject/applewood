import {inject} from 'aurelia-framework';
import {CurrentUser} from 'core/current-user';

//filters routes based on current user permissions

@inject(CurrentUser)
export class RouteValueConverter {

    constructor(user) {
        this.user = user;
    }

    toView(routes) {
        let result = [];

        _.each(routes, (route) => {

            let permission = route.config.permission;
            if (_.isUndefined(permission)) {
                result.push(route);
            } else {
                if (permission <= this.user.role) {
                    result.push(route);
                }
            }
        });

        return result;

    }

}