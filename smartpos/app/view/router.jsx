import React from 'react';
import ReactDOM from 'react-dom';
import Director from  'lib/director';
import Config from  'helper/config';
import Util from   'helper/util';
import NewSale from 'view/page/newsale';
import OpenOrder from 'view/page/openorder';
import Product from 'view/page/product';
import PaymentMethod from 'view/page/paymentmethod';
import P404 from 'view/page/p404';

var _router;

function init(debug) {
	var routes = {};
	//https://github.com/flatiron/director#wildcard-routes
	routes['/((\w|.)*)'] = render.bind(this);
	_router = Director.Router(routes);
	_router.init(['', Config.NAV_REGISTER, Config.NAV_SALE].join('/'));
}

function render() {
	var obj = Util.getNav('#/');
	var node = null;
	//
	document.title = Config.MENU[obj.navs[0]];
	switch(obj.navs[0]){
		case Config.NAV_REGISTER:
			node = <NewSale title={document.title} navs={obj.navs} nid={obj.nid} />;
			break;
		case Config.NAV_INVENTORY:
			switch (obj.navs[1]){
				case Config.NAV_PRODUCT:
					node = <Product title={document.title} navs={obj.navs} nid={obj.nid} />;
					break;
				default:
					document.title = 'Page Not Found - ' + document.title;
					node = <P404 title={document.title} navs={obj.navs} nid={obj.nid} />;
			}
			break;
		case Config.NAV_HISTOEY:
			// to be continued ...
			break;
		case Config.NAV_REPORT:
			// to be continued ...
			break;
		case Config.NAV_ADMIN:
			switch (obj.navs[1]){
				case Config.NAV_PAYMENT:
					node = <PaymentMethod title={document.title} navs={obj.navs} nid={obj.nid} />;
					break;
				default:
					document.title = 'Page Not Found - ' + document.title;
					node = <P404 title={document.title} navs={obj.navs} nid={obj.nid} />;
			}
			break;
		default:
			document.title = 'Page Not Found - ' + document.title;
			node = <P404 title={document.title} navs={obj.navs} nid={obj.nid} />;
	}
	//
	if(node){
		ReactDOM.render(node, document.getElementById('app'));
	}
	
}

init();