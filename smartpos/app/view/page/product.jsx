import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';
import ProductModel from 'model/product';
import Popup from 'view/component/popup';
import SideMenu from 'view/component/sidemenu';
import Breadcrumb from 'view/component/breadcrumb';
import ManageProductItem from 'view/component/manageproductitem';
import Style from 'style/product.scss';

export default class Product extends React.Component {
	constructor(props) {
    super(props);
    this._productModel = new ProductModel();
    this._productModel.subscribe(function () {
			this.setState({productList:this._productModel.productList});
		}, this);
		//instead of return in getInitialState 
		this.state = {
			productList : []
		};
	}

	componentDidMount (){
		$('body').css('left', 0);
		//
		this._productModel.getProductList();
		$('#amps-sbox').focus();
  }

  componentWillUnmount (){
    // this._$window.off('resize', this.handleResize.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
  	// console.log(prevState);
  }

  handleSearchChange (e){
  	const keyword = $(e.currentTarget).val();
  	if(keyword === ''){
  		this._productModel.getProductList();
  	}else{
  		this._productModel.search(keyword, function (list) {
  			this.setState({productList : list});
  		}, this);
  	}
  }

  handleFavorieProduct(product){
  	var newProduct = _.cloneDeep(product);
  	//
  	newProduct.favorite = !newProduct.favorite;
  	this._productModel.updateProduct(newProduct);
  }

  handleActivateProduct(product){
  	var newProduct = _.cloneDeep(product);
  	//
  	newProduct.active = !newProduct.active;
  	this._productModel.updateProduct(newProduct);
  }

  handleRemoveProduct (product){
  	//confirm window
  	this.refs.popup.show('Are you sure to remove: ', 'RemoveProductForm', product, this.handleRemoveConfirm.bind(this), 'Confirm', 'Cancel', 'modal-sm');
  }

  handleRemoveConfirm (product) {
  	this._productModel.removeProduct(product);	
  }

  handleModifyProduct (product){
  	console.log(product);
  	//popup
  	this.refs.popup.show('Edit Product', 'UpdateProductForm', product, this.handleUpdateConfirm.bind(this), 'Save Changes', 'Cancel', 'modal-lg');
  }

  handleCreateProduct () {
  	const product = {name:'', costPrice:0, salePrice:0};
  	this.refs.popup.show('Add New Product', 'UpdateProductForm', product, this.handleUpdateConfirm.bind(this), 'Add New Item', 'Cancel', 'modal-lg');
  }

  handleUpdateConfirm (product){
  	this._productModel.updateProduct(product);
  }

	render() {
		const productListView = this.state.productList.map(function (product) {
        return (
          <ManageProductItem 
            key={Util.uuid()}
            name={product.name}
            salePrice={product.salePrice}
            itemSold={product.itemSold}
            active={product.active}
            favorite={product.favorite}
            balanceQuantity={product.balanceQuantity}
            onFavorite={this.handleFavorieProduct.bind(this, product)}
            onActivate={this.handleActivateProduct.bind(this, product)}
            onModify={this.handleModifyProduct.bind(this, product)}
            onRemove={this.handleRemoveProduct.bind(this, product)}
          />);
      }, this);


		//
		return(
			<div>
				<Popup ref="popup" />
			  <div className="container-fluid">
			  	<div className="row">
            <div className="col-sm-2 sidemenu-container">
              <SideMenu navs={this.props.navs} />
            </div>
            <div className="col-sm-offset-2 col-sm-10 breadcrumb-container">
              <Breadcrumb navs={this.props.navs} parent=".breadcrumb-container" />
              <div className="product-hr" />
              <div className="row product">
                <div className="col-sm-8">
                  <div className="form-group search">
                    <label htmlFor="amps-sbox">Search</label>
                    <div className="clearfix">
                      <input type="email" className="form-control pull-left sbox" id="amps-sbox" onChange={this.handleSearchChange.bind(this)} placeholder="Search for items ..." />
                      <button type="button" className="btn btn-primary">Search</button>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="operation">
                    <button type="button" className="btn btn-primary" aria-label="Create" onClick={this.handleCreateProduct.bind(this)}>Add New Item</button>
                  </div>
                </div>
              </div>

              <div className="row product">
                <div className="col-sm-12">
                  <table className="table table-striped table-hover list">
                    <thead>
                      <tr> 
                        <th width="5%"></th> 
                        <th width="15%">Product Name</th> 
                        <th width="10%">Category</th> 
                        <th width="30%">Tags</th> 
                        <th width="10%">Stocks</th> 
                        <th width="10%">Price</th> 
                        <th width="10%">Active</th> 
                        <th width="10%"></th>
                      </tr> 
                    </thead>
                    <tbody> 
                      {productListView}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
					</div>
			  </div>
		  </div>
		);
	}

}
