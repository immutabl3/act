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

## Continuous animation

Continuous animations, or animations that should start and stop declaratively
have a separate control mechanism. To illustrate, we'll create a `Spinner` 
component that will animate when `active`.

```js
import React from 'react';
import { animation } from '@immutabl3/act';
import fluid from '@immutabl3/fluid';

const Spinner = function({ deg }) {
  return (
    <div style={ { transform: `rotate(${deg}deg)` } }/>
  );
};

export default animation({
  // set initial state for the animation.
  state: { deg: 0 },
  // animate when active
  when: props => props.active,
  // the animation to run
  animation(props, state) {
    return fluid(
      { deg: state.deg },
      { deg: 360 },
      { duration: 500, repeat: Infinity }
    );
  },
}, Spinner);
```

## Options

### `act`

`act(config, Component)`

#### *`config.key`* _default: *'act'*

The key that controls the animation state. Changes to the value 
of this key call the matching animation on the configuration object.

#### *`config.state`* _default: *{}*_

The starting state of the component. This can be a static object or 
a function that is passed the component's properties. Note that declarative 
animations require changes to-and-from states to animate. This method allows 
the component to render in the correct state for the current `act` value.

### `animation`

`animation(config, Component)`

#### *`config.animation`*

A function returning the animation to be ran when `when` asserts `true`.

#### *`config.state`* _default: *{}*_

See `act` state above.

#### *`config.when`* _default: *() => true*_

A function that returns a boolean indicating if the animation should be active.

## Lists

Both `act` and `animation` can take an array of React components to render. The 
key will be the index of the element in the array.

## Currying

Both `act` and `animation` are curried, allowing you to functionally compose 
your components:

```js
import act from '@immutabl3/act';
import fluid from '@immutabl3/fluid';

const animation = act({
  state: { x: 0 },
  open(props, state) {
    return fluid(
      { x: state.x },
      { x: 100 }
    );
  },
  close(props, state) {
    return fluid(
      { x: state.x },
      { x: 0 }
    );
  },
});

// animation is a curried function and can
// be called with a component later:
export default animation(Component);
```

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