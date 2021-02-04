import React from 'react';
import ReactDOM from 'react-dom';
import { Counter } from './../components';

beforeEach(() => {
    document.body.innerHTML = '';
})
test('counter increments and decrements when the button are clicked', () => {
    // creating div
    const div  = document.createElement('div');
    document.body.append(div);
    // render Counter inside div
    ReactDOM.render(<Counter />, div);
    // console.log(document.body.innerHTML);
    
    const [increment, decrement] = div.querySelectorAll('button');
    const message = div.firstChild.querySelector('span');
    // console.log(message.textContent);
    
    expect(message.textContent).toBe('Count: 0');
    increment.click();
    expect(message.textContent).toBe('Count: 1');
    decrement.click();
    expect(message.textContent).toBe('Count: 0');
    // console.log(document.body.innerHTML);
});

// dispatchEvent
// increment.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0}));
