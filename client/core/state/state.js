
export class State {

    constructor(objName) {
        let _this = this;
        this._objName= objName;  
        this._properties = [];
        this._needsReset = false;             
        
        document.addEventListener("pause", () => {
            if (!_.isUndefined(_this._objName)){
                _persist(_this);
            }
        }, false);

        document.addEventListener("resume", () => {
            if (!_.isUndefined(_this._objName)){
                _hydrate(_this, JSON.parse(localStorage.getItem(_this._objName)));
            }
        }, false);

        if (localStorage.getItem(_this._objName)) {
            this._needsReset = true;
        }
    }

    setState(properties) {
        this._properties = properties;
        _persist(this);
    }

    reset() {
        _hydrate(this, JSON.parse(localStorage.getItem(this._objName)));
    }

}

function _stringify(obj) {
    let result = {};
    _.each(obj._properties, function(property) {
        if (obj.hasOwnProperty(property)) {
            result[property] = obj[property];
        }
    })
    //add the base properties
    result['_objName'] = obj._objName;
    result['_properties'] = obj._properties;
    return JSON.stringify(result);
}

function _hydrate(obj, data) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            obj[property] = data[property]; 
        }
    }
}

function _persist(obj) {
    localStorage.setItem(obj._objName, _stringify(obj));
}


