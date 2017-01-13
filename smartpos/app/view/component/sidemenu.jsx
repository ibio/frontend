import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'lib/classnames';
import CSSPlugin from 'lib/greensock/plugins/CSSPlugin';
import TweenLite from 'lib/greensock/TweenLite';
import Config from 'helper/config';
import Util from 'helper/util';
import style from 'style/component/sidemenu.scss';

export default class SideMenu extends React.Component {
	constructor(props) {
    super(props);
		this._$window = $(window);
		//instead of return in getInitialState 
		this.state = {
			mainNav : this.props.navs[0],
			secondNav : this.props.navs[1]
		};
	}

	componentDidMount () {
		// this._$window.on('resize', this.handleResize.bind(this));
		// this._$window.click(this.handleWindowClick.bind(this));
  }

  componentWillUnmount () {
    // this._$window.off('resize', this.handleResize.bind(this));
		// this._$window.off('click', this.handleWindowClick.bind(this));
		// $(this.refs.ansButtons).find('a').off('click', this.handleMenuBtnClick.bind(this));
  }

	getMainNavList(){
		const mainNavSource = [Config.NAV_REGISTER, Config.NAV_INVENTORY, Config.NAV_HISTOEY, Config.NAV_REPORT, Config.NAV_ADMIN];
		const mainNavIcons = ['glyphicon-certificate', 'glyphicon-tasks', 'glyphicon-globe', 'glyphicon-wrench', 'glyphicon-certificate'];
		var list = [], i = 0, j = 0, main, second, hasChild, status, icon, link, secondNavSource;
		while(i < mainNavSource.length){
			main = mainNavSource[i];
			secondNavSource = Config.SECOND_NAV[main] || [];
			if(secondNavSource.length){
				//default at index 0
				link = [Config.DIR_RULE, main, secondNavSource[0]].join('/');
			}else{
				link = [Config.DIR_RULE, main].join('/');
			}
			icon = mainNavIcons[i];
			status = '';
			if(main === this.state.mainNav){
				status = 'active';
				//has child
				if(secondNavSource.length){
					status = 'open';
				}
			}
			list.push(this.generateNavItem('main', secondNavSource.length > 0, status, main, icon, link));
			//second navs
			if(main === this.state.mainNav){
				// console.log('secondNavSource', secondNavSource);
				while(j < secondNavSource.length){
					second = secondNavSource[j];
					link = [Config.DIR_RULE, main, second].join('/');
					status = second === this.state.secondNav ? 'active' : '';
					//TODO icon
					list.push(this.generateNavItem('second', false, status, second, icon, link));
					j++;
				}
			}
			i++;
		}
		return list;
	}

	generateNavItem(category, hasChild, status, key, icon, link){
		var arrowElement = '';
		if(category === 'main' && hasChild){
			arrowElement = <i className="glyphicon glyphicon-menu-down amsn-arrow" />;
		}
		return(	<li key={Util.uuid()} className={Classnames(category, status)}>
							<a type="button" href={link} className="btn" aria-label={Config.MENU[key]}> 
								<span className={Classnames('glyphicon', icon)} aria-hidden="true"></span> {Config.MENU[key]}
							</a>
							{arrowElement}
						</li>
					)
	}
	
	handleResize(){
		const w = this._$window.width();
		const h = this._$window.height();
		// $(this.refs.amSidemenu).height(bodyH);
	}
	
	render() {
		//
		return(
			<div className="sidemenu" ref="amSidemenu">
				<p className="brand"><a>CellSmart POS</a></p>
				<ul className="nav-list">{this.getMainNavList()}</ul>
			</div>
		);
	}

}
