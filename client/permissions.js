import {inject} from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {CurrentUser} from 'core/current-user';

@inject(CurrentUser)
export class Permissions{
  constructor(user) {
    this.user = user;
  }
  run(routingContext, next) {
    let logoutRoute = '#/noaccess';

    if (routingContext.getAllInstructions().some(i => i.config.permission > this.user.role)) {
      console.error('Unauthorized Access Attempted');
      return next.cancel(new Redirect(logoutRoute));
    }

    return next();
  }
}