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
            <button onClick={this._handleClick}>
                 <span>{this.props.text}</span>
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

    _handleKeys: function(e) {
        
        //this whole area is problematic, my first if statement doesn't seem to filter out the 
        //unwanted keyboard inputs such as letters
        
        
        
        
        if  (e.charCode === 8 || //backspace
            48 <= e.charCode <= 57 || //0-9
            96 <= e.charCode <= 110) { //numpad 0-9, multiply, add, subtract, decimal point, divide
                
                
                
            if (!store.curInput) {
                return String.fromCharCode(e.charCode);
            }
            else {
                return store.newInput = `${store.curInput}${String.fromCharCode(e.charCode)}`;
                
                //doesn't automatically space the same way the button inputs do
                
            }
        }
        else if (e.charCode === 13) { //enter
            ee.emit('equals');
            console.log('equals was emitted');
        }
        else {
            return store.curInput;
        }




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
                <textarea className="screen" onKeyPress={this._handleKeys} value={this.state.text} />
            </section>
        );
    }
});




var NumberButtons = React.createClass({

    _number: function(num) {
        if (!store.curInput) {
            return store.newInput = num;
        }

        return store.newInput = `${store.curInput}${num}`;
    },

    _decimal: function() {

        if (!store.curInput) {
            return store.newInput = '0.';
        }
        else if (store.curInput) {
            var eachNum = store.curInput.split(' ');
            if (eachNum.indexOf('.') === -1) {
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

    _parenth: function(type) {

        if (!store.curInput) {
            if (`${type}` === '(') {
                return store.newInput = `${type}`;
            }
            else {
                return store.newInput = '';
            }
        }
        else {
            return store.newInput = `${store.curInput}${type}`;
        }
    },
    
    componentDidMount: function(){
        //this event doesn't get heard :(
        
      ee.on('equals', this._equate);  
    },

    _eq: function(type) {

        if (!store.curInput) {
            return store.newInput = 'error';
        }

        else {
            return store.newInput = `${store.curInput} ${type} `;
        }
    },

    _equate: function() {

        if (!store.curInput) {
            return '';
        }
        else if (store.curInput.indexOf(' ') === -1) {
            return store.newInput = 'error';
        }
        else {

            var eqSplitByChar = store.curInput.split('');
            computeParenth(eqSplitByChar);
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
        let curInput = str;
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



function computeParenth(equation) {
    function filterOpen(a) {
        return a === '(';
    }

    function filterClosed(a) {
        return a === ')';
    }
    var openParenths = equation.filter(filterOpen);
    var closingParenths = equation.filter(filterClosed);

    if (openParenths.length === closingParenths.length) {
        if (openParenths.length === 0 && closingParenths.length === 0) {
            let eq = store.curInput;
            return store.newInput = compute(eq);

        }
        else if (openParenths.length > 0 && closingParenths.length > 0) {
            var firstParenth = equation.indexOf('(');
            var lastParenth = equation.length - 1 - equation.reverse().indexOf(')');

            equation.reverse();

            var innerEquation = equation.splice(firstParenth, (lastParenth + 1));

            innerEquation.shift();
            innerEquation.pop();
            var eqStr = innerEquation.join('');

            var equatedInner = compute(eqStr);

            equation.splice(firstParenth, 0, equatedInner);

            var toCompute = equation.join('');
            console.log('new equation to compute ', toCompute);


            return store.newInput = compute(toCompute);
        }
    }
    else {
        return store.newInput = 'error';
    }

}



function compute(str) {
    let equation = str.split(' ');

    var a = (equation[0].indexOf('.') === -1) ? parseInt(equation[0]) : parseFloat(equation[0]);
    var b = (equation[2].indexOf('.') === -1) ? parseInt(equation[2]) : parseFloat(equation[2]);

    //compute still needs handlers for equations that are longer than 3 index spaces, for example if 
    //my sum function wanted to take three arguments not just 2


    if (equation[1] === '+') {
        return `${sum(a, b)}`;
    }
    else if (equation[1] === '-') {
        return `${minus(a, b)}`;
    }
    else if (equation[1] === '*') {
        return `${multiply(a, b)}`;
    }
    else if (equation[1] === '/') {
        return `${divide(a, b)}`;
    }
    else {
        return store.newInput = 'error';
    }
}

module.exports = Calculator;