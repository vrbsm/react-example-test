import * as React from 'react';
function Counter() {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);

    return (
        <div>
            <span>Count: {count}</span>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}
export default Counter;