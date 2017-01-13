import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Classnames from 'lib/classnames';
import Config from 'helper/config';
import Util from 'helper/util';
import Style from 'style/component/breadcrumb.scss';

export default class Breadcrumb extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			//
		};
	}

	componentDidMount() {
		var css = $(this.props.parent).offset();
		css.position = 'fixed';
		css.width = 'calc(100% - ' + css.left + 'px)';
		$(this.refs.amBreadcrumb).css(css);
	}

	getBreadcrumb(){
		var i = 0, list = [], key, template, link;
		while(i < this.props.navs.length){
			key = this.props.navs[i];
			//NOTICE: it does not need to have a link here
			// link = this.props.navs.slice(0, i + 1);
			// link.unshift(Config.DIR_RULE);
			// link = link.join('/');
			template = (
				<li key={Util.uuid()} className="">
					<a type="button" href={link} className="btn" aria-label={Config.MENU[key]}>{Config.MENU[key]}</a>
				</li>
			)
			if(i > 0 && i % 1 === 0){
				list.push(<li key={Util.uuid()} className=''><a className="btn disabled"><span className="glyphicon glyphicon-menu-right" /></a></li>);
			}
			list.push(template);
			i++;
		}
		return list;
	}
	
	render() {
		//
		return(
			<div className="breadcrumb" ref="amBreadcrumb">
				<ul className="clearfix">{this.getBreadcrumb()}</ul>
			</div>
		);
	}

}
