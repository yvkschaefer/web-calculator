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
                {this.state.text}
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


        //here, I need to differentiate between if an equation has already gone through or not



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

            var a = (equation[0].indexOf('.') === -1) ? parseInt(equation[0]) : parseFloat(equation[0]);
            var b = (equation[2].indexOf('.') === -1) ? parseInt(equation[2]) : parseFloat(equation[2]);


            if (equation[1] === '+') {
                return store.newInput = `${sum(a, b)}`;
            }
            else if (equation[1] === '-') {
                return store.newInput = `${minus(a, b)}`
            }
            else if (equation[1] === '*') {
                return store.newInput = `${multiply(a, b)}`
            }
            else if (equation[1] === '/') {
                return store.newInput = `${divide(a, b)}`
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

HELLO HELLO I AM HERE

let store = {
    get curInput() {
        return this.input;
    },
    set newInput(str) {
        let curInput = str,
            oldInput = this.curInput;
        this.input = curInput;
        ee.emit('calculateNumbers', [this.curInput]);
    },
    set result(str) {
        //to properly deal with the math starting on line 167






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


function checkParenth (str){
    
    var firstParenth = str.indexOf('(')
    var lastParenth = str.split('').reverse.join('').indexOf(')') 
    
    //have the outside parentheses, then check inside.
    
    //check parenths are even
    
}

module.exports = Calculator;