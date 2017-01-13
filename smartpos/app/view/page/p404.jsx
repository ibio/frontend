import React from 'react';
import ReactDOM from 'react-dom';
import Config from 'helper/config';
import Style from 'style/p404.scss';

export default class P404 extends React.Component {
	constructor(props) {
    super(props);

		this.state = {
			itemList: [],
			selectedItem : {}
		};
	}

	render() {
		//
		return(
			<div className="container-fluid notfound">
				<div className="row">
					<div className="col-sm-12 text-center head">
						<p className="logo"><a href='#/'><img alt="RetailSmart POS" src={Config.STATIC_ROOT + 'res/smplpos-white.png'} /></a></p>
						<h1>404</h1>	
						<h5>PAGE NOT FOUND</h5>	
						<h3>OH MY GOSH! YOU FOUND IT!!!</h3>	
						<p>Looks like the page you're trying to visit doesn't exist. <br />Please check the URL and try your luck again.</p>	
					</div>
				</div>

				<div className="row operate">
					<div className="col-sm-12 text-center">
						<a className="btn btn-primary" href="/" role="button">Take Me Home</a>
					</div>
				</div>
		  </div>
		);
	}

}