# act

`act` is a small (`5.5KB` minified, `1.76KB` gzipped), declarative React animation library inspired by [pose](https://popmotion.io/pose/) and built to work with [@immutabl3/fluid](https://github.com/immutabl3/fluid)

## Installation

`$ npm i @immutabl3/act`

## Usage

General usage:

Creating a declarative `Slide` component that will slide when open and closed:

```js
import React from 'react';
import act from '@immutabl3/act';
import fluid from '@immutabl3/fluid';

const Slide = function({ x }) {
	return (
		<div style={ { transform: `translateX(${x}px)` } }>
			hello
		</div>
	);
};

export default act({
	// set initial state for the animation.
	// this can also be a function if we needed
	// to determine the initial x value based on
	// props
	state: { x: 0 },
	// when in the open state...
	open(props, state) {
		return fluid(
			// go from the current x position...
			{ x: state.x },
			// to an "open" x position of 100
			{ x: 100 },
			{ duration: 500 }
		);
	},
	// the reverse of open
	close(props, state) {
		return fluid(
			{ x: state.x },
			{ x: 0 },
			{ duration: 500 }
		);
	},
}, Slide);
```

Using the `Slide` component:

```js
import React from 'react';
import Slide from './Slide';

export default function Container({ active }) {
	return (
		<Slide
			// the "act" property controls which
			// state the component should animate to
			act={ active ? 'open' : 'close' }
		/>
	);
};
```

## Options

// TODO: options

## Tests

Clone the repo, then:

1. `npm install`
2. `npm test`

## License

The MIT License (MIT)

Copyright (c) 2018 Immutable, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.