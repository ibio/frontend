import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Bootstrap from 'bootstrap';
import Util from 'helper/util';
import Classnames from 'lib/classnames';
import UpdateCheckoutForm from 'view/component/updatecheckoutform';
import RemoveProductForm from 'view/component/removeproductform';
import UpdateProductForm from 'view/component/updateproductform';
import SaveTransactionForm from 'view/component/savetransactionform';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.onCallback;
    //
    this.state = {
      title : '',
      btnSubmit : '',
      btnCancel : '',
      windowSize : '',
      bodyName : null
    };
  }

  componentDidMount () {
    // $(this.refs.modal).modal();
    $(this.refs.modal).on('hide.bs.modal', this.handleModalHide.bind(this));
  }

  componentWillUnmount() {
    $(this.refs.modal).off();
  }

  //windowSize: modal-lg, modal-sm
  show (title, bodyName, bodyParams, onCallback, btnSubmit = 'Confirm', btnCancel = 'Cancel', windowSize = '') {
    this.onCallback = onCallback;
    //for view change
    this.setState({title, bodyName, bodyParams, btnSubmit, btnCancel, windowSize});
    //pop up modal
    $(this.refs.modal).modal({backdrop: 'static'});
  }

  handleSubmitClick(){
    //by default, for confirm window
    var data = this.state.bodyParams;
    if(this.state.bodyName){
      //NOTICE: getData needed in the body view component.
      data = this.refs.bodyView.getData();
    }
    $(this.refs.modal).modal('hide');
    this.onCallback && this.onCallback(data);
  }

  handleModalHide(){
    this.setState({bodyName: ''});
  }

	render () {
    var bodyView = '';
    switch (this.state.bodyName){
      case 'UpdateCheckoutForm':
        bodyView = <UpdateCheckoutForm {...this.state.bodyParams} ref="bodyView" />;
        break;
      case 'RemoveProductForm':
        bodyView = <RemoveProductForm {...this.state.bodyParams} ref="bodyView" />;
        break;
      case 'UpdateProductForm':
        bodyView = <UpdateProductForm {...this.state.bodyParams} ref="bodyView" />;
        break;
      case 'SaveTransactionForm':
        bodyView = <SaveTransactionForm {...this.state.bodyParams} ref="bodyView" />;
        break;
    }
    //
    return(
			<div className="modal a-popout" tabIndex="-1" role="dialog" ref="modal">
        <div className={Classnames("modal-dialog", this.state.windowSize)} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.state.title}</h4>
            </div>
            <div className="modal-body">
              {bodyView}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.btnCancel}</button>
              <button type="button" className="btn btn-primary" onClick={this.handleSubmitClick.bind(this)}>{this.state.btnSubmit}</button>
            </div>
          </div>
        </div>
      </div>
		);
	}

}