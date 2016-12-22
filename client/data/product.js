import role from 'constants/roles';

//identify data object
const _objName = 'Product';

//set min user role for each action
const _permissions = {
    C: role.user,
    R: role.user,
    U: role.user,
    D: role.user
}

export class Product {

    constructor (data) {

        this.id = data ? data._id : '';
        this.name= data ? data.name : '';
        this.model = data ? data.model : '';
        this.description = data ? data.description : '';
        this.price = data ? data.price : 0;

    }
    
    permissions() {
        return _permissions;
    }

    objName() {
        return _objName;
    }

}