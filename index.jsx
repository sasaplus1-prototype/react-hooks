(function() {
  'use strict';

  const React = window.React;
  const ReactDOM = window.ReactDOM;

  const { useState } = React;

  function UseState() {
    const [count, setCount] = useState(0);
    const [items, setItem] = useState([]);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <p>Add items</p>
        <button
          onClick={() => {
            const newItems = JSON.parse(JSON.stringify(items));

            newItems.push({ caption: Date.now() });

            setItem(newItems);
          }}
        >
          Add item
        </button>
        <ul style={{ maxHeight: 80, overflow: 'scroll' }}>
          {items.map(item => (
            <li key={item.caption}>{item.caption}</li>
          ))}
        </ul>
      </div>
    );
  }

  ReactDOM.render(<UseState />, document.getElementById('js-use-state'));

  const { useEffect } = React;

  function UseEffect() {
    const [count, setCount] = useState(0);

    useEffect(
      () => {
        document.getElementById(
          'js-p'
        ).innerText = `You clicked ${count} times. This element is outside React.`;
      },
      // NOTE: execute function if count is modified
      [count]
    );

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }

  ReactDOM.render(<UseEffect />, document.getElementById('js-use-effect'));

  const { useRef } = React;

  function PrevCount() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();

    // NOTE: save previous value
    useEffect(() => {
      prevCountRef.current = count;
    });

    const prevCount = prevCountRef.current;

    return (
      <div>
        <p>
          now: {count}, prev: {prevCount}
        </p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }

  ReactDOM.render(<PrevCount />, document.getElementById('js-prev-count'));

  const { createRef, forwardRef, useImperativeHandle } = React;

  const Input = forwardRef(function Input(props, ref) {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focusToInput: () => {
        inputRef.current.focus();
      }
    }));

    return <input type="text" ref={inputRef} />;
  });

  function Focus() {
    const ref = createRef();

    const handleClick = () => {
      ref.current.focusToInput();
    };

    return (
      <div>
        <Input ref={ref} />
        <button onClick={handleClick}>focus</button>
      </div>
    );
  }

  ReactDOM.render(<Focus />, document.getElementById('js-focus'));

  const { useReducer } = React;

  const initialState = { count: 0 };

  function reducer(state, action) {
    const { type } = action;

    switch (type) {
      case 'inc':
        return { count: state.count + 1 };
      case 'dec':
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  function Reducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'inc' })}>inc</button>
        <button onClick={() => dispatch({ type: 'dec' })}>dec</button>
      </div>
    );
  }

  ReactDOM.render(<Reducer />, document.getElementById('js-reducer'));
})();
