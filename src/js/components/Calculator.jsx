var React = require('react');
var EventEmitter = require('events').EventEmitter;

var ee = new EventEmitter;




var Calculator = React.createClass({
    render: function() {
        return (
            <main>
        <section className="containerBox">
            <div className="screen">
                <Screen />
            </div>
            <div className="numbersAndOperators">
                <NumberButtons className="numbers" />
                <OperatorButtons />
            </div>
        </section>
      </main>
        );
    }
});

var Button = React.createClass({
    _handleClick: function() {
        let text = this.props.text,
            cb = this.props.onClick;
        if (cb) {
            cb.call(null, text);
        }
    },
    render: function() {
        return (
            <button className={this.props.class} onClick={this._handleClick}>
                 <span className="title">{this.props.text}</span>
            </button>
        );
    }
});

var ContentEditable = React.createClass({
    _handleClick: function() {
        const cb = this.props.clickHandler;

        if (cb) {
            cb.call(this);
        }
    },
    render: function() {
        return (
            <div onClick={this._handleClick}>{this.props.text}</div>
        );
    }
});


var Screen = React.createClass({
    _updateField: function(newStr) {
        return this.setState({
            text: newStr
        });
    },
    getInitialState: function() {
        return {
            text: this.props.text
        };
    },
    componentWillMount: function() {
        ee.on('calculateNumbers', this._updateField);
    },
    render: function() {
        return (
            <section>
                <ContentEditable text={this.state.text} clickHandler={this.state.onClick} />
            </section>
        );
    }
});




var NumberButtons = React.createClass({
    _number: function(num) {
        // console.log('_number was called');
        if (!store.curInput) {
            return store.newInput = num;
        }
        return store.newInput = `${store.curInput}${num}`;
    },
    _decimal: function() {

        //have to split the array by (' ') and then if indexOf below is === -1 for each string....

        if (store.curInput.indexOf('.') === -1) {
            if (!store.curInput) {
                return store.newInput = '0.';
            }
            else if (store.curInput) {
                return store.newInput = store.curInput.concat('.');
            }
        }
        else {
            return store.curInput;
        }
    },
    render: function() {
        return (
            <section>
                <div>
                    <Button text="7" onClick={this._number} />
                    <Button text="8" onClick={this._number} />
                    <Button text="9" onClick={this._number} />
                </div>
                <div>
                    <Button text="4" onClick={this._number} />
                    <Button text="5" onClick={this._number} />
                    <Button text="6" onClick={this._number} />
                </div>
                <div>
                    <Button text="1" onClick={this._number} />
                    <Button text="2" onClick={this._number} />
                    <Button text="3" onClick={this._number} />
                </div>
                <div>
                    <Button text="0" onClick={this._number} />
                    <Button text="." onClick={this._decimal} />
                </div>
            </section>
        );
    }
});

var OperatorButtons = React.createClass({
    _parenth: function() {

    },
    _eq: function(type) {
        if (store.curInput) {
            return store.newInput = `${store.curInput} ${type} `;
        }
    },
    _equate: function(type) {
        if (!store.curInput) {
            return '';
        }
        else if (store.curInput.indexOf(' ') === -1) {
            return store.curInput;
        }
        else {
            var equation = store.curInput.split(' ');
            
            
            //check for decimals (indexOf?) and then make a decision about parseFloat vs parseInt for each 
            //instance in the equation
            
            
            if (equation[1] === '+') {
                return store.newInput = `${sum(parseInt(equation[0]), parseInt(equation[2]))}`;
            }
            else if (equation[1] === '-') {
                return store.newInput = `${minus(parseInt(equation[0]), parseInt(equation[2]))}`
            }
            else if (equation[1] === '*') {
                return store.newInput = `${multiply(parseInt(equation[0]), parseInt(equation[2]))}`
            }
            else if (equation[1] === '/') {
                return store.newInput = `${divide(parseInt(equation[0]), parseInt(equation[2]))}`
            }
            else {
                console.log('uncaught error in this equation...');
            }
        }
    },
    _clear: function() {
        store.newInput = '';
    },
    render: function() {
        return (
            <section>
                <div>
                    <Button text="(" onClick={this._parenth} />
                    <Button text=")" onClick={this._parenth} />
                </div>
                <div>
                    <Button text="*" onClick={this._eq} />
                    <Button text="/" onClick={this._eq} />
                </div>
                <div>
                    <Button text="+" onClick={this._eq} />
                    <Button text="-" onClick={this._eq} />
                </div>
                <div>
                    <Button text="=" onClick={this._equate} />
                    <Button text="clr" onClick={this._clear} />
                </div>
            </section>
        );
    }
});

let store = {
    get curInput() {
        return this.input;
    },
    set newInput(str) {
        let curInput = str,
            oldInput = this.curInput;
        this.input = curInput;
        ee.emit('calculateNumbers', [this.curInput]);
    }
};

function sum(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

module.exports = Calculator;