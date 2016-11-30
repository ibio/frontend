import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import BaseModel from 'model/base';

const STORAGE_KEY = 'pos-checkout-items';

export default class Checkout extends BaseModel {

	constructor() {
		var data;
		super();
		//initial data
		data = Util.store(STORAGE_KEY, null);
		this.checkoutItemList = _.isArray(data) ? data : [];
	}

	addItem (product, silent) {
		var newItem = true;
		//item {product, quantity, discount}
		this.checkoutItemList.forEach(function (item) {
			//already exists
			//TODO: in the future, it needs to be use mixins as id
			if(item.product.id === product.id){
				item.quantity++;
				newItem = false;
				return;
			}
		});
		if(newItem){
			this.checkoutItemList.push({product:_.cloneDeep(product), quantity:1, discount:0});
		}
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}
	}

	removeItem(index, silent){
		if(index >= 0 && index < this.checkoutItemList.length){
			this.checkoutItemList.splice(index, 1);
		}
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}
	}

	updateItem (index, item, silent){
		if(this.checkoutItemList[index]){
			this.checkoutItemList[index] = _.cloneDeep(item);
		}
		this._saveCheckoutItemList();
		if(!silent){
			this.notify();
		}
	}

	/*
	 * private methods
	 */
	 _saveCheckoutItemList(){
		Util.store(STORAGE_KEY, this.checkoutItemList);
	}

}
