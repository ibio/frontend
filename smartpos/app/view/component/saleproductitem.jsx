import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'lib/classnames';

export default class SaleProductItem extends React.Component {

  handleFavClick (e) {
    e.stopPropagation();
    this.props.onFavClick();
  }

	render () {
    return(
			<li className={Classnames("item", {'active':false})} onClick={this.props.onClick}>
        <figure>
          <img src={this.props.thumb} alt={this.props.name} className="img-responsive center-block" />
          <figcaption>
            <h5 className="ellipsis">{this.props.name}</h5>
            <h6>${this.props.salePrice}<span>|</span><b>{this.props.itemSold}</b></h6>
          </figcaption>
        </figure>
      </li>
		);
	}

}