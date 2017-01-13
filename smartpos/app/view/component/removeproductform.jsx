import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Classnames from 'lib/classnames';

//NOTICE: this class is for popup body use only
export default class RemoveProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }

  //for pupoup use
  getData(){
    //use default data
    return this.props;
  }

	render () {
    return(
      <div className="row removeproduct">
        <div className="col-xs-4">
          <img className="img-responsive" title={this.props.name} src={this.props.thumb} />
        </div>
        <div className="col-xs-8">
          <h2>{this.props.name}</h2>
          <p>{this.props.description}</p>
        </div>
      </div>
		);
	}

}