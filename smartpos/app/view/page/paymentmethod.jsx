import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Util from 'helper/util';
import Classnames from 'lib/classnames';
import SideMenu from 'view/component/sidemenu';
import Breadcrumb from 'view/component/breadcrumb';

export default class PaymentMethod extends React.Component {
	constructor(props) {
    super(props);
    
		//instead of return in getInitialState 
		this.state = {
			//
		};
	}

	componentDidMount () {
		$('body').css('left', 0);
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
			  <div className="container-fluid a-main">
			  	<div className="row">
			  		<div className="col-sm-2 am-smcontainer">
			  			<SideMenu navs={this.props.navs} />
			  		</div>
			  		<div className="col-sm-offset-2 col-sm-10 am-bcontainer">
			  			<Breadcrumb navs={this.props.navs} parent=".am-bcontainer" />

			  			<div className="row am-payment">
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
