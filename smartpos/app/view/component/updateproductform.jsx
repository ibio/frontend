import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'lib/classnames';

//NOTICE: this class is for popup body use only
export default class UpdateProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markupPercentage : 0,
      salePrice : 0
    };
  }

  componentDidMount() {
    const percentage = this.getPercentage(this.props.salePrice, this.props.costPrice);
    this.setState({markupPercentage: percentage, salePrice:this.props.salePrice});
    $('#updateproduct-upc-code').focus();
  }

  //round 2 digits
  getPercentage (salePrice, costPrice) {
    const result = Math.round((salePrice - costPrice) / costPrice * 10000) / 100;
    return result || 0;
  }

  //for pupoup use
  getData(){
    var data = _.cloneDeep(this.props);
    data.name = $('#updateproduct-name').val();
    data.costPrice = parseFloat($('#updateproduct-cost-price').val());
    data.salePrice = parseFloat($('#updateproduct-selling-price').val());
    return data;
  }

  handleCostPriceChange(e){
    const value = parseFloat(e.currentTarget.value) || 0;
    const salePrice = Math.round(value * (1 + this.state.markupPercentage / 100) * 100) / 100;
    this.setState({salePrice:salePrice});
  }

  handleMarkupPercentageChange(e){
    const value = parseFloat(e.currentTarget.value) || 0;
    const costPrice = parseFloat($('#updateproduct-cost-price').val()) || 0;
    const salePrice = Math.round(costPrice * (1 + value / 100) * 100) / 100;
    this.setState({markupPercentage:value, salePrice:salePrice});
  }

  handleSalePriceChange(e){
    const value = parseFloat(e.currentTarget.value) || 0;
    const costPrice = parseFloat($('#updateproduct-cost-price').val()) || 0;
    const percentage = this.getPercentage(value, costPrice);
    //
    this.setState({markupPercentage:percentage, salePrice:value});
  }

	render () {
    const imgView = this.props.thumb ? this.props.thumb : 'res/empty-item-img.png';
    return(
			<div className="ap-updateproduct">
        <div className="row">
          <div className="col-xs-12"><h3>1. PRODUCT INFORMATION</h3></div>
          <div className="col-xs-2">
            <img src={imgView} className="img-responsive" />
            <button type="button" className="btn btn-primary apu-upload" disabled aria-label="Upload">
              <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> Upload
            </button>
          </div>
          <div className="col-xs-10">
            <div className="row">
              <div className="col-xs-6">
                <div className="form-group apu-code">
                  <label htmlFor="updateproduct-upc-code">UPC code</label>
                  <input type="text" className="form-control" id="updateproduct-upc-code" defaultValue={0} placeholder="0" />
                  <button type="button" className="btn btn-primary apuc-generate" disabled aria-label="Generate">Generate</button>
                </div>
              </div>
              <div className="col-xs-6">
                <div className="form-group">
                  <label htmlFor="updateproduct-name">Product name</label>
                  <input type="text" className="form-control" id="updateproduct-name" defaultValue={this.props.name} placeholder="Product name" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="updateproduct-unit-price">Description</label>
              <textarea rows="5" className="form-control" id="updateproduct-unit-price" placeholder="Product description" />
            </div>
            <div className="form-group">
              <label htmlFor="updateproduct-unit-price">Tags</label>
              <input type="text" rows="5" className="form-control" id="updateproduct-unit-price" placeholder="Tags" />
            </div>
            <div className="form-group">
              <label htmlFor="updateproduct-unit-price">Category</label>
              <input type="text" rows="5" className="form-control" id="updateproduct-unit-price" placeholder="Category" />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-xs-6">
            <h3>2. BARCODES</h3>
            <div className="form-group apu-code">
              <input type="text" className="form-control" id="updateproduct-quantity" defaultValue={0} placeholder="0" />
              <button type="button" className="btn btn-primary apuc-generate" disabled aria-label="Add">Add</button>
            </div>
          </div>
          <div className="col-xs-6">
            <h3>3. PRICING</h3>
            <div className="row">
              <div className="col-xs-6">
                <div className="form-group">
                  <label htmlFor="updateproduct-cost-price">Cost price</label>
                  <input type="number" className="form-control" id="updateproduct-cost-price" defaultValue={this.props.costPrice} onChange={this.handleCostPriceChange.bind(this)} placeholder="0" />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="form-group">
                  <label htmlFor="updateproduct-markup-percentage">Markup-Percentage (%)</label>
                  <input type="number" className="form-control" id="updateproduct-markup-percentage" value={this.state.markupPercentage} onChange={this.handleMarkupPercentageChange.bind(this)} placeholder="0" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="updateproduct-selling-price">Selling Price</label>
              <input type="number" className="form-control" id="updateproduct-selling-price" value={this.state.salePrice} onChange={this.handleSalePriceChange.bind(this)} placeholder="0" />
            </div>
          </div>
        </div>

      </div>
		);
	}

}