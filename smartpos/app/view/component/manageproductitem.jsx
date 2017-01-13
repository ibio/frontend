import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'lib/classnames';

export default class ManageProductItem extends React.Component {

  handleItemClick (e) {
    e.stopPropagation();
    // this.props.onFavClick();
    if(e.target === this.refs.amplFavorite || 
       e.target === this.refs.amplActive   || 
       e.target === this.refs.amplModify   || 
       e.target === this.refs.amplRemove){
    }else{
      this.props.onModify();
    }
  }

	render () {
    const activeView = this.props.active ? 'Active' : 'Inactive';
    // <th></th>
    // <th>Product Name</th> 
    // <th>Category</th> 
    // <th>Tags</th> 
    // <th>Stocks</th> 
    // <th>Price</th> 
    // <th>Active</th> 
    // <th></th>
    return(
      <tr onClick={this.handleItemClick.bind(this)}>
        <td>
          <button type="button" className="btn favorite" aria-label="Favorite" ref="amplFavorite" onClick={this.props.onFavorite}>
            <span className={Classnames('glyphicon', {'glyphicon-heart' : this.props.favorite, 'glyphicon-heart-empty' : !this.props.favorite})} aria-hidden="true"></span>
          </button>
        </td>
        <td>{this.props.name}</td> 
        <td>Category</td> 
        <td>Tags</td> 
        <td>{this.props.balanceQuantity}</td> 
        <td>{this.props.salePrice}</td> 
        <td>
          <button type="button" className={Classnames('btn', 'active', {'btn-primary' : this.props.active, 'btn-warning' : !this.props.active})} aria-label="Active" ref="amplActive" onClick={this.props.onActivate}>{activeView}</button>
        </td> 
        <td>
          <button type="button" className="btn modify" aria-label="Modify" ref="amplModify" onClick={this.props.onModify}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </button>
          <button type="button" className="btn remove" aria-label="Remove" ref="amplRemove" onClick={this.props.onRemove}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </td> 
      </tr> 
		);
	}

}