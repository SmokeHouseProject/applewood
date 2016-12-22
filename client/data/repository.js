import environment from '../environment';
import {inject} from 'aurelia-framework';
import {Core} from 'core';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CurrentUser} from 'core/current-user';
import error from 'constants/errors';
import event from 'constants/events';

@inject(Core, HttpClient, EventAggregator, CurrentUser)   
export class Repository {

    constructor(core, httpClient, ea, user) {

        this.tokenName = core.config.authApi.tokenPrefix + '_' + core.config.authApi.tokenName;
        this.baseUrl = core.config.webApi.baseUrl
        this.client = new HttpClient();
        this.user = user;
        
        ea.subscribe(event.logOut, response => {
            this.config();
        });

        ea.subscribe(event.logIn, response => {
            this.config();
        });

        this.config();
    }

    config(){
        let token = localStorage.getItem(this.tokenName) || '';

        if (environment.debug) {
            this.client.configure(config => {
                config
                    .withBaseUrl(this.baseUrl)
                    .withDefaults({
                        credentials: 'same-origin',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .withInterceptor({
                        request(request) {
                            console.log(`Requesting ${request.method} ${request.url}`);
                            return request;
                        },
                        response(response) {
                            console.log(`Received ${response.status} ${response.url}`);
                            return response;
                        }
                    });
            });
        } else {
            this.client.configure(config => {
                config
                    .withBaseUrl(this.baseUrl)
                    .withDefaults({
                        credentials: 'same-origin',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }
                    });
            });
        }
        return;
    }

    //todo -
    //  add fetchList => returns a list of id's and names - use a parameter for list of fields to return
    //  add fetchID => use signature (id, entity) to go find and return a single item

    fetchAll(entity) {
        return new Promise((resolve, reject) => {
            //enforce permissions
            let permission = new entity().permissions().R;
            if (this.user.role < permission) {
                return reject(formatError(error.noPermission));
            }

            let results = [];
            let route = new entity().objName().toLowerCase() + '/';

            this.client.fetch(route)
            .then( (response) => {
                response.json().then(data => {
                    if (response.ok) {
                         _.each(data, (item) => {
                            results.push(new entity(item));
                        })
                        return resolve(results);
                    } else {
                        return reject(formatError(data.message));
                    }
                })
            })
            .catch(
                err => {
                    console.error(err);
                    return reject(formatError(error.networkError));
                }
            )
        });
    }

    fetch(entity) {
        return new Promise((resolve, reject) => {
            //enforce permissions
            let permission = entity.permissions().R;
            if (this.user.role < permission) {
                return reject(formatError(error.noPermission));
            }

            let route = entity.objName().toLowerCase() + '/' + entity.id;

            this.client.fetch(route)
            .then( (response) => {
                response.json().then(data => {
                    if (response.ok) {
                        return resolve(data);
                    } else {
                        return reject(formatError(data.message));
                    }
                })
            })
            .catch(
                err => {
                    console.error(err);
                    return reject(formatError(error.networkError));
                }
            )
        });
    }

    create(entity) {
        return new Promise((resolve, reject) => {
            //enforce permissions
            let permission = entity.permissions().C;
            if (this.user.role < permission) {
                return reject(formatError(error.noPermission));
            }

            let route = entity.objName().toLowerCase() + '/'; 

            this.client.fetch(route, {
                method: "POST",
                body: JSON.stringify(entity)
            })
            .then( (response) => {
                response.json().then(data => {
                    if (response.ok) {
                        return resolve(data);
                    } else {
                        return reject(formatError(data.message));
                    }
                })
            })
            .catch(
                err => {
                    console.error(err);
                    return reject(formatError(error.networkError));
                }
            )
        });
    }

    update(entity) {
        return new Promise((resolve, reject) => {
            //enforce permissions
            let permission = entity.permissions().U;
            if (this.user.role < permission) {
                return reject(formatError(error.noPermission));
            }

            let route = entity.objName().toLowerCase() + '/' + entity.id;

            this.client.fetch(route, {
                method: "PUT",
                body: JSON.stringify(entity)
            })
            .then( response => {
                response.json().then(data => {
                    if (response.ok) {
                        return resolve(data);
                    } else {
                        return reject(formatError(data.message));
                    }
                });
            })
            .catch(
                err => {
                    console.error(err);
                    return reject(formatError(error.networkError));
                }
            )
        });
    }

    delete(entity) {
        return new Promise((resolve, reject) => {
            //enforce permissions
            let permission = entity.permissions().D;
            if (this.user.role < permission) {
                return reject(formatError(error.noPermission));
            }

            let route = entity.objName().toLowerCase() + '/' + entity.id;

            this.client.fetch(route, { method: "DELETE" })
            .then( response => {
                if (response.ok) {
                    return resolve('ok');
                } else {
                    return reject(formatError(data.message));
                }         
            })
            .catch(
                err => {
                    console.error(err);
                    return reject(formatError(error.networkError));
                }
            )
        });
    }

}

function formatError(message) {
    let error = new Error();
    error.message = message;
    return error;
}
