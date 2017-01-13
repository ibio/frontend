import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';
import SaleProductItem from 'view/component/saleproductitem';

export default class ProductGroup extends React.Component {

  handleProductClick (product){
    this.props.onProductClick(product);
  }

	render () {
		const list = this.props.list.map(function (item) {
      const productList = item.productList.map(function (product) {
        return (
          <SaleProductItem 
            key={Util.uuid()}
            thumb={product.thumb}
            name={product.name}
            salePrice={product.salePrice}
            itemSold={product.itemSold}
            onClick={this.handleProductClick.bind(this, product)}
          />);
      }, this);
      //
      return (
        <div key={Util.uuid()}>
          <h5 className="title">{item.name}</h5>
          <ul className="productlist">
            {productList}
          </ul>
        </div>
      ); 
    }, this);
    //
    return(
			<div className="productgroup">{list}</div>
		);
	}

}