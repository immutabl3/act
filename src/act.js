import React, { Component } from 'react';
import curry from 'lodash.curry';

const act = function(cnfg = {}, View) {
	const config = typeof cnfg === 'function' ? 
		cnfg() : 
		Object.assign({}, cnfg);

	const {
		key = 'act',
		state = {},
	} = config;

	return class Act extends Component {
		constructor(props) {
			super(props);

			this.onUpdate = this.onUpdate.bind(this);
			this.start = this.start.bind(this);
			this.stop = this.stop.bind(this);

			const initialState = typeof state === 'function' ? 
				state(props) : 
				Object.assign({}, state);
			this.state = initialState;
		}

		componentDidMount() {
			// check for an animation function
			const fn = config[this.props[key]];
			if (!fn) return;

			// create the animation
			const anim = fn(this.props, this.state);

			this.anim = Array.isArray(anim) ? 
				anim.map(this.start) : 
				this.start(anim);
		}

		componentDidUpdate(prevProps) {
			// no change
			if (this.props[key] === prevProps[key]) return;
			
			// check for an animation function
			const fn = config[this.props[key]];
			if (!fn) return;

			// cleanup the current animation
			this.stop();

			// create the animation
			const anim = fn(this.props, this.state);

			this.anim = Array.isArray(anim) ? 
				anim.map(this.start) : 
				this.start(anim);
		}

		componentWillUnmount() {
			this.stop();
		}
		
		onUpdate(obj) {
			this.setState(obj);
		}

		start(anim) {
			return anim
				.on('update', this.onUpdate)
				.start();
		}

		stop() {
			if (!this.anim) return;

			if (Array.isArray(this.anim)) {
				this.anim.forEach(anim => anim.stop());
			} else {
				this.anim.stop();
			}
			
			this.anim = undefined;
		}

		render() {
			return (
				React.createElement(
					View,
					Object.assign(
						{},
						this.props,
						this.state
					)
				)
			);
		}
	};
};

export default curry(act);