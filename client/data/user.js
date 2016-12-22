import role from 'constants/roles';

//identify data object
const _objName = 'User';

//set min user role for each action
const _permissions = {
    C: role.admin,
    R: role.manager,
    U: role.admin,
    D: role.admin
}

export class User {

    constructor (data) {

        this.id = data ? data._id : '';
        this.username = data ? data.username : '';
        this.password = data ? data.password : '';
        this.displayName = data ? data.displayName : '';
        this.role = data ? data.role : 0;
        this.created = data ? data.created : new Date();

    }

    permissions() {
        return _permissions;
    }

    objName() {
        return _objName;
    }

}

