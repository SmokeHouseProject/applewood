import {inject} from 'aurelia-framework';
import roles from 'constants/roles';
import {I18N} from 'aurelia-i18n';

//  sample usage
//  ${roleValue | role} 

@inject(I18N)
export class RoleValueConverter {

    constructor(i18n) {
        this.i18n = i18n;
    }

    toView(value) {
        let roleKey = _.findKey(roles, (role) => {
            return role === value;
        }) || 'unknown';
        return this.i18n.tr('roles.' + roleKey);
    }

}