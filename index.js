(function () {
  'use strict';

  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const {
    useState
  } = React;

  function UseState() {
    const [count, setCount] = useState(0);
    const [items, setItem] = useState([]);
    return React.createElement("div", null, React.createElement("p", null, "You clicked ", count, " times"), React.createElement("button", {
      onClick: () => setCount(count + 1)
    }, "Click me"), React.createElement("p", null, "Add items"), React.createElement("button", {
      onClick: () => {
        const newItems = JSON.parse(JSON.stringify(items));
        newItems.push({
          caption: Date.now()
        });
        setItem(newItems);
      }
    }, "Add item"), React.createElement("ul", {
      style: {
        maxHeight: 80,
        overflow: 'scroll'
      }
    }, items.map(item => React.createElement("li", {
      key: item.caption
    }, item.caption))));
  }

  ReactDOM.render(React.createElement(UseState, null), document.getElementById('js-use-state'));
  const {
    useEffect
  } = React;

  function UseEffect() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      document.getElementById('js-p').innerText = `You clicked ${count} times. This element is outside React.`;
    }, // NOTE: execute function if count is modified
    [count]);
    return React.createElement("div", null, React.createElement("p", null, "You clicked ", count, " times"), React.createElement("button", {
      onClick: () => setCount(count + 1)
    }, "Click me"));
  }

  ReactDOM.render(React.createElement(UseEffect, null), document.getElementById('js-use-effect'));
  const {
    useRef
  } = React;

  function PrevCount() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(); // NOTE: save previous value

    useEffect(() => {
      prevCountRef.current = count;
    });
    const prevCount = prevCountRef.current;
    return React.createElement("div", null, React.createElement("p", null, "now: ", count, ", prev: ", prevCount), React.createElement("button", {
      onClick: () => setCount(count + 1)
    }, "Click me"));
  }

  ReactDOM.render(React.createElement(PrevCount, null), document.getElementById('js-prev-count'));
  const {
    createRef,
    forwardRef,
    useImperativeHandle
  } = React;
  const Input = forwardRef(function Input(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focusToInput: () => {
        inputRef.current.focus();
      }
    }));
    return React.createElement("input", {
      type: "text",
      ref: inputRef
    });
  });

  function Focus() {
    const ref = createRef();

    const handleClick = () => {
      ref.current.focusToInput();
    };

    return React.createElement("div", null, React.createElement(Input, {
      ref: ref
    }), React.createElement("button", {
      onClick: handleClick
    }, "focus"));
  }

  ReactDOM.render(React.createElement(Focus, null), document.getElementById('js-focus'));
  const {
    useReducer
  } = React;
  const initialState = {
    count: 0
  };

  function reducer(state, action) {
    const {
      type
    } = action;

    switch (type) {
      case 'inc':
        return {
          count: state.count + 1
        };

      case 'dec':
        return {
          count: state.count - 1
        };

      default:
        throw new Error();
    }
  }

  function Reducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return React.createElement("div", null, React.createElement("p", null, "Count: ", state.count), React.createElement("button", {
      onClick: () => dispatch({
        type: 'inc'
      })
    }, "inc"), React.createElement("button", {
      onClick: () => dispatch({
        type: 'dec'
      })
    }, "dec"));
  }

  ReactDOM.render(React.createElement(Reducer, null), document.getElementById('js-reducer'));
})();

//# sourceMappingURL=index.js.map