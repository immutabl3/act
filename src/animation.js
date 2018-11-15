import React, { Component } from 'react';
import curry from 'lodash.curry';

const truthy = () => true;

const actAnimation = function(config = {}, View) {
	const {
		state = {},
		when = truthy,
	} = config;

	const isArray = Array.isArray(View);

	return function actAnimationWrap(animator) {
		const animation = animator();

		return class ActAnimation extends Component {
			constructor(props) {
				super(props);

				this.start = this.start.bind(this);
				this.stop = this.stop.bind(this);
				this.onUpdate = this.onUpdate.bind(this);
				this.renderView = this.renderView.bind(this);

				const initialState = typeof state === 'function' ? 
					state(props) : 
					Object.assign({}, state);
				this.state = initialState;

				if (when(this.props, this.state)) this.start();
			}

			componentDidUpdate(prevProps, prevState) {
				const shouldRun = when(this.props, this.state, prevProps, prevState);
				if (shouldRun) return this.start();
				this.stop();
			}

			componentWillUnmount() {
				this.stop();
			}

			onUpdate(obj) {
				this.setState(obj);
			}

			start() {
				if (this.anim && this.anim.playing) return;

				this.anim = animation(this.props, this.state)
					.on('update', this.onUpdate)
					.start();
			}

			stop() {
				if (!this.anim || !this.anim.playing) return;

				this.anim.stop();
				this.anim = undefined;
			}

			renderView(View, key) {
				return React.createElement(
					View,
					Object.assign(
						{ key },
						this.props,
						this.state
					)
				);
			}

			render() {
				return isArray ? 
					View.map(this.renderView) : 
					this.renderView(View);
			}
		};
	};
};

export default curry(actAnimation);