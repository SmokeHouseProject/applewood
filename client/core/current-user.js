import {State} from './state/state';

//identify data object
const _objName = 'CurrentUser';

export class CurrentUser extends State {

    constructor () {
        super(_objName);
 
        this.id = '';
        this.username = '';
        this.password = '';
        this.displayName = '';
        this.role = 0;

        if (this._needsReset) {
            super.reset();
        }

    }

    set(data) {
        return new Promise((resolve) => {
            this.id = data ? data._id : '';
            this.username = data ? data.username : '';
            this.password = '';
            this.displayName = data ? data.displayName : '';
            this.role = data ? data.role : 0;
            this.persist();

            return resolve();
        });
    }

    persist() {
        //list the properties to persist
        super.setState(['id','username','displayName','role']);
    }

    clear() {
        this.set();
        this.persist();
    }

}

