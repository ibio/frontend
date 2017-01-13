import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'lib/classnames';

const OP_DOLLAR = 'dollar';
const OP_PERCENTAGE = 'percentage';

//NOTICE: this class is for popup body use only
export default class UpdateCheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    //
    this.salePrice;
    this.quantity;
    this.discount;
    this.state = {
      totalPrice : 0
    };
  }

  componentDidMount() {
    this.salePrice = this.props.item.product.salePrice;
    this.quantity = this.props.item.quantity;
    this.discount = this.props.item.discount;
    this.setState({totalPrice : this.salePrice * this.quantity - this.discount});
    $('#updatecheckout-quantity').focus();
  }

  //for pupoup use
  getData(){
    var item = _.cloneDeep(this.props.item);
    item.product.salePrice = this.salePrice;
    item.quantity = this.quantity;
    item.discount = this.discount;
    return {
      index : this.props.index,
      item
    };
  }

  handleValueChange(){
    const discountOption = $('input[name=updatecheckout-option]:checked').val();
    const price = parseFloat($('#updatecheckout-unit-price').val()) || 0;
    const quantity = parseInt($('#updatecheckout-quantity').val()) || 0;
    const discount = parseFloat($('#updatecheckout-discount').val()) || 0;
    const amount = price * quantity;
    var compoundDiscount;
    var result = 0;
    //
    if(discountOption === OP_DOLLAR){
      compoundDiscount = discount;
    }else{
      compoundDiscount = amount * (discount / 100);
    }
    result = amount - compoundDiscount;
    //record
    this.salePrice = price;
    this.quantity = quantity;
    this.discount = compoundDiscount;
    //
    this.setState({totalPrice:result});
  }

	render () {
    return(
			<div className="updatecheckout" onChange={this.handleValueChange.bind(this)}>
        <div className="row">
          <div className="col-xs-6">
            <div className="form-group">
              <label htmlFor="updatecheckout-quantity">Quantity</label>
              <input type="number" className="form-control" id="updatecheckout-quantity" defaultValue={this.props.item.quantity} placeholder="1" />
            </div>
          </div>
          <div className="col-xs-6">
            <div className="form-group">
              <label htmlFor="updatecheckout-unit-price">Unit Price</label>
              <input type="number" className="form-control" id="updatecheckout-unit-price" defaultValue={this.props.item.product.salePrice} placeholder="0.00" />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="updatecheckout-discount">Discount</label>
          <div className="apu-option">
            <input type="number" className="form-control input" id="updatecheckout-discount" defaultValue={this.props.item.discount} placeholder="0" />
            <label className="radio-inline radio">
              <input type="radio" name="updatecheckout-option" value={OP_DOLLAR} defaultChecked={true} /> $
            </label>
            <label className="radio-inline radio">
              <input type="radio" name="updatecheckout-option" value={OP_PERCENTAGE} /> %
            </label>
          </div>
        </div>
          
        <h4>Total price: {this.state.totalPrice}</h4>
      </div>
		);
	}

}