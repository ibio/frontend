import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';
import ProductModel from 'model/product';
import CheckoutModel from 'model/checkout';
import SideMenu from 'view/component/sidemenu';
import Breadcrumb from 'view/component/breadcrumb';
import ProductGroup from 'view/component/productgroup';
import Popup from 'view/component/popup';
import Checkout from 'view/component/checkout';

export default class NewSale extends React.Component {
	constructor(props) {
    super(props);
    this._productModel = new ProductModel();
    this._checkoutModel = new CheckoutModel();
		this._productModel.subscribe(function () {
			this.setState({productGroup:this._productModel.productGroup});
		}, this);
		this._checkoutModel.subscribe(function () {
			this.setState({checkoutItemList:this._checkoutModel.checkoutItemList});
		}, this);
		//instead of return in getInitialState 
		this.state = {
			productGroup : [],
			checkoutItemList : this._checkoutModel.checkoutItemList
		};
	}

	componentDidMount () {
		this._productModel.getFavoriteLabelList();
		this._productModel.getProductList(true);
		$('body').css('left', 0);
		$('#ams-sbox').focus();
  }

  componentWillUnmount () {
    // this._$window.off('resize', this.handleResize.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
  	// console.log(prevState);
  }

  handleProductClick(product){
  	this._checkoutModel.addItem(product);
  }

  //check item
  handleItemRemove(index){
  	this._checkoutModel.removeItem(index);
  }

  //check item
  handleItemUpdate(index, item){
  	this.refs.popup.show(item.product.name, 'UpdateCheckoutForm', {index, item}, this.handleItemSave.bind(this), 'Save');
  }

  handleItemSave(data){
  	this._checkoutModel.updateItem(data.index, data.item);
  }

  handleSearchChange(e){
  	const keyword = $(e.currentTarget).val();
  	if(keyword === ''){
  		this._productModel.getFavoriteLabelList();
  	}else{
  		this._productModel.search(keyword, function (list) {
  			this.setState({productGroup : [{id:0, name: 'Result for: ' + keyword, productList : list}]});
  		}, this);
  	}
  }

  handlePayClick(){
  	this.refs.popup.show('Your Order', 'SaveTransactionForm', {list: this.state.checkoutItemList}, this.handlePaySave.bind(this), 'Save Transaction');
  }

  handlePaySave(data){
  	// console.log(data);
  	alert('Demo - Save Transaction Successfully!');
  }

	render() {
		const title = $('#ams-sbox').val() === '' ? 'Favorite Labels' : 'Search result(s):';
		var totalItems = 0;
		this.state.checkoutItemList.forEach(function (item) {
			totalItems += item.quantity;
		}, this);
		return(
			<div>
				<Popup ref="popup" />
			  <div className="container-fluid a-main">
			  	<div className="row">
			  		<div className="col-sm-2 am-smcontainer">
			  			<SideMenu navs={this.props.navs} />
			  		</div>
			  		<div className="col-sm-offset-2 col-sm-10 am-bcontainer">
			  			<Breadcrumb navs={this.props.navs} parent=".am-bcontainer" />

			  			<div className="row am-registersale">
			  				<div className="col-sm-8">
						  		<div className="row am-search">
						  			<div className="form-group">
									    <label htmlFor="ams-sbox">Search or scan item</label>
									    <div className="clearfix">
									    	<input type="email" className="form-control pull-left ams-sbox" id="ams-sbox" onChange={this.handleSearchChange.bind(this)} placeholder="Enter item name or scan barcode ..." />
									    	<button type="button" className="btn btn-primary">Search</button>
									    </div>
									  </div>
							  	</div>
							  	<div className="row am-operation">
					  				<h4>{title}</h4>
					  			</div>
					  			<ProductGroup list={this.state.productGroup} onProductClick={this.handleProductClick.bind(this)} />
					  		</div>

					  		<div className="col-sm-4 am-checkout">
					  			<div className="form-group amc-customer">
								    <label htmlFor="amcc-box">Search customer</label>
								    <div className="clearfix">
								    	<input type="email" className="form-control pull-left amcc-box" id="amcc-box" placeholder="eg: Joseph Yawar" />
								    	<button type="button" className="btn btn-primary" disabled>Search</button>
								    </div>
								  </div>
					  		
					  			<div className="clearfix amc-note">
					  				<h4 className="pull-left">{totalItems} Cart</h4>
					  				<button type="button" className="btn btn-primary pull-right" disabled>Add note</button>
					  			</div>
					  			<Checkout checkoutItemList={this.state.checkoutItemList} onItemRemove={this.handleItemRemove.bind(this)} onItemUpdate={this.handleItemUpdate.bind(this)} />
					        <div className="clearfix amc-operation">
					  				<button type="button" className="btn btn-default pull-left" disabled>Hold</button>
					  				<button type="button" className="btn btn-default pull-right" disabled>Cancel</button>
					  			</div>
					  			<div className="amc-pay">
					  				<button type="button" className="btn btn-danger" onClick={this.handlePayClick.bind(this)}>Pay</button>
					  			</div>
					  		</div>
			  			</div>
				  	
			  		</div>
			  	</div>
			  </div>
		  </div>
		);
	}

}
