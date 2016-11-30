import Util from 'helper/util';

export default class BaseModel {

	constructor() {
		// this.key = key;
		// this.todos = util.store(this.key) || [];
		//for updating views
		this.subscriberList = [];
		// console.log('call BaseModel constructor');
	}

	subscribe (callback, scope) {
		this.subscriberList.push({callback, scope});
	}

	notify () {
		this.subscriberList.forEach(function (props) { props.callback && props.callback.call(props.scope); });
	}

}
