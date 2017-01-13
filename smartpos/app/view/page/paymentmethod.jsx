import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';
import SideMenu from 'view/component/sidemenu';
import Breadcrumb from 'view/component/breadcrumb';
import Style from 'style/payentmethod.scss';

export default class PaymentMethod extends React.Component {
	constructor(props) {
    super(props);
    
		//instead of return in getInitialState 
		this.state = {
			//
		};
	}

  componentWillUnmount () {
    // this._$window.off('resize', this.handleResize.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
  	// console.log(prevState);
  }

	render() {
		//
		return(
			<div>
			  <div className="container-fluid">
			  	<div className="row">
			  		<div className="col-sm-2 sidemenu-container">
			  			<SideMenu navs={this.props.navs} />
			  		</div>
			  		<div className="col-sm-offset-2 col-sm-10 breadcrumb-container">
			  			<Breadcrumb navs={this.props.navs} parent=".breadcrumb-container" />

			  			<div className="row paymentmethod">
				  			<div className="col-sm-12">
					  			<h2>To be continued ...</h2>	
					  		</div>
				  		</div>

			  		</div>
			  	</div>
			  </div>
		  </div>
		);
	}

}
