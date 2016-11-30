import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';

//NOTICE: this class is for popup body use only
export default class SaveTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentList : []
    };
  }

  componentDidMount() {
    $('#savetransaction-quantity').focus();
  }

  //for pupoup use
  getData(){
    return {};
  }

  handleAddPayment () {
    const payMethod = $(this.refs.payMethod).val();
    const amonut = parseFloat($('#savetransaction-pay-amount').val()) || 0;
    var list = _.cloneDeep(this.state.paymentList);
    if(amonut > 0){
      list.push({payMethod, amonut});
      this.setState({paymentList:list});
    }else{
      $('#savetransaction-pay-amount').focus();
    }
  }

  handleRemoveClick (e){
    const index = parseInt($(e.currentTarget).attr('data-index'));
    var list = _.cloneDeep(this.state.paymentList);
    list.splice(index, 1);
    this.setState({paymentList:list});
  }

	render () {
    var subtotal = 0;
    var discount = 0;
    var dueAmount = 0;
    var dueAmount2 = 0;
    var paymentAmount = 0;
    var state = '';
    const paymentListView = this.state.paymentList.map(function (item, index) {
      paymentAmount += item.amonut;
      //
      return (
        <li key={Util.uuid()} className="list-group-item">
          {item.payMethod}
          <button type="button" className="btn btn-danger btn-sm" data-index={index} onClick={this.handleRemoveClick.bind(this)}>Remove</button>
          <b>{item.amonut}</b>
        </li>
      );
    }, this);

    this.props.list.forEach(function (item) {
      subtotal += item.product.salePrice * item.quantity;
      discount += item.discount;
      dueAmount += item.product.salePrice * item.quantity - item.discount;
    }, this);

    dueAmount2 = dueAmount - paymentAmount;
    //needs to pay more
    if(dueAmount2 > 0){
      state = 'Due Amount: ';
    //need to get change
    }else if(dueAmount2 < 0){
      state = 'Change: ';
      dueAmount2 = dueAmount2 * -1;
    }else{
      dueAmount2 = '';
    }

    return(
			<div className="ap-savetransaction">
        <div className="row">
          <div className="col-xs-12 aps-detail">
            <p>Subtotal<b>{subtotal}</b></p>
            <p>Discount<b>{discount}</b></p>
            <p>Taxes<b>0.00</b></p>
            <h4>Due Amount:<b>{dueAmount}</b></h4>
          </div>
        </div>
        <h2>Pay Method</h2>
        <div className="row">
          <div className="col-xs-6">
            <select className="form-control" ref="payMethod">
              <option>Cash</option>
              <option>Cheque</option>
              <option>Credit Card</option>
              <option>Points System</option>
            </select>
          </div>
          <div className="col-xs-3">
            <div className="form-group">
              <input type="number" className="form-control" id="savetransaction-pay-amount" defaultValue={0} placeholder="0.00" />
            </div>
          </div>
          <div className="col-xs-3">
            <button type="button" className="btn btn-block btn-primary" onClick={this.handleAddPayment.bind(this)}>Add</button>
          </div>
        </div>
        <ul className="list-group aps-paymentlist">
          {paymentListView}
        </ul>
        
        <h4>{state}<b>{dueAmount2}</b></h4>
      </div>
		);
	}

}