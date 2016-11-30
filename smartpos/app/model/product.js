import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import BaseModel from 'model/base';

export default class ProductModel extends BaseModel {

	constructor() {
		super();
		this.productGroup = [];
		this.productList = [];
	}
	
	getFavoriteLabelList(silent, callback, scope) {
		var that = this;
		$.get(Config.URL_FAVORITE_LABELS, function(response) {
			response = response || [];
			//
			that.productGroup = that._parseFavoriteLabelList(response.data);
			if(!silent){
				that.notify();
			}
			callback && callback.call(scope);
		});
	}

	getProductList(silent, callback, scope){
		var that = this;
		$.get(Config.URL_ALL_PRODUCTS, function(response) {
			response = response || [];
			//
			that.productList = that._createProductList(response);
			// console.log('productList', that.productList);
			if(!silent){
				that.notify();
			}
			callback && callback.call(scope);
		});
	}

	updateProduct (product, silent, callback, scope){
		const index = _.findIndex(this.productList, function(o) { return o.id === product.id; });
		//TODO: update to the backend
		//create
		if(index === -1){
			this.productList.unshift(_.cloneDeep(product));
		}else{
			this.productList[index] = _.cloneDeep(product);
		}
		if(!silent){
			this.notify();
		}
		callback && callback.call(scope);
	}

	removeProduct (product, silent, callback, scope){
		const index = _.findIndex(this.productList, function(o) { return o.id === product.id; });
		//TODO: update to the backend
		if(index >= 0 && index < this.productList.length){
			this.productList.splice(index, 1);
		}
		if(!silent){
			this.notify();
		}
		callback && callback.call(scope);
	}

	search (keyword, callback, scope) {
		const list = _.filter(this.productList, function (item) {
			return _.includes(_.lowerCase(item.name), _.lowerCase(keyword));
		});
		callback && callback.call(scope, list);
	}

	

	/*
	 * private methods
	 */
	_parseFavoriteLabelList(list){
		//
		var favoriteList = list.map(function (item) {
			return {
				id: item.id,
				name: item.name,
				storeId: item.StoreId,
				productList: this._createProductList(item.Products)
			}
		}, this);
		//default: sort by alphabetical
		favoriteList = _.orderBy(favoriteList, 'name', 'asc');
		return favoriteList;
	}

	_createProductList(list){
		var result = list.map(function (item) {
			return {
				id: item.id, 
				name: item.name.substring(0, 20), 
				description: item.description, 
				thumb: item.imageUrl, 
				active: item.isActive, 
				favorite: item.favorite, 
				balanceQuantity: item.balanceQuantity,
				itemSold: item.itemSold,
				salePrice: item.salePrice, 
				costPrice: item.costPrice, 
				createdDate: item.createdAt
			};
		}, this);
		result = _.orderBy(result, 'name', 'asc');
		return result;
	}

}
