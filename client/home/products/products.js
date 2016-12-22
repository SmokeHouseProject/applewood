import {inject} from 'aurelia-dependency-injection';
import {Repository} from 'data/repository';
import {Product} from 'data/product';
import {ProductDetail} from '../product-detail/product-detail';
import {DialogService} from 'aurelia-dialog';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {I18N} from 'aurelia-i18n';

@inject(Repository, DialogService, CommonDialogs, I18N)
export class Products {
    
    constructor(dr, dialogService, commonDialogs, i18n) {

        this.products;
        this.dr = dr;
        this.dialogService = dialogService;
        this.commonDialogs = commonDialogs;
        this.i18n = i18n;

        this.refresh();
    }

    refresh() {
        this.dr.fetchAll(Product).then(
            data => {
                this.products = data;
            },
            err => {
                this.message = (err.message);
            }
        ); 
    }

    add() {
        let product = new Product();
        return this.dialogService
            .open({ viewModel: ProductDetail, model: { product } })
            .then(response => {
                this.refresh();
        });
    }

    delete(product) {

        let msg = this.i18n.tr('product.delete-message', { name: product.name });

        return this.commonDialogs
            .showMessage(msg, 'product.delete-title', ['cancel', 'ok'])
            .then(response => {
                if (!response.wasCancelled) {
                    //delete product
                    this.dr.delete(product).then(
                        ok => {
                            this.refresh();
                        },
                        err => {
                            this.message = (err.message);
                        }
                    );
                }
            });
    }

    getDetail(product) {
        return this.dialogService
            .open({ viewModel: ProductDetail, model: { product } })
            .then(response => {
                this.refresh();
            }
        );
    }


}