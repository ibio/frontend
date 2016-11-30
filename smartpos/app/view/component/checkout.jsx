import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';

export default class Checkout extends React.Component {

  componentDidMount() {
    //
  }
  
  componentWillUnmount() {
    // $(this.refs.amcCheck).off();
  }

  handleItemClick(item, index, e){
    //remove btn
    if($(e.target).hasClass('amcci-remove')){
      this.props.onItemRemove(index);
    }else{
      this.props.onItemUpdate(index, item);
    }
  }

  handleMouseOver(e){
    $(e.currentTarget).find('button').show();
  }

  handleMouseOut(e){
    $(e.currentTarget).find('button').hide();
  }

	render () {
    var totalDiscount = 0;
    var subAmount = 0;
    var checkoutItemListView = this.props.checkoutItemList.map(function (item, index) {
      const oldPrice = item.product.salePrice * item.quantity;
      const newPrice = oldPrice - item.discount;
      const oldPriceView = oldPrice === newPrice ? '' : (<del>${oldPrice}</del>);
      subAmount += item.product.salePrice * item.quantity;
      totalDiscount += item.discount;
      return(
        <h3 key={Util.uuid()} className={Classnames("amcc-item")} 
          onClick={this.handleItemClick.bind(this, item, index)} 
          onMouseEnter={this.handleMouseOver.bind(this)} 
          onMouseLeave={this.handleMouseOut.bind(this)} >

          <span>{item.quantity}X</span><b className="ellipsis">{item.product.name}</b><em>${newPrice}</em>{oldPriceView}
          <button type="button" className="btn amcci-remove" aria-label="Remove">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </h3>
      )
    }, this);
    //if it's empty
    if(this.props.checkoutItemList.length === 0){
      checkoutItemListView = (<img src="res/shopping-cart.jpg" className="img-responsive" alt={this.props.name} />);
    }
    //
    return(
			<div className="amc-check">
        {checkoutItemListView}
        <footer>
          <h5>Subtotal: <b>${subAmount}</b></h5>
          <h5>Discount: <b>${totalDiscount}</b></h5>
          <h5>Tax: <b>$0</b></h5>
        </footer>
      </div>
		);
	}

}