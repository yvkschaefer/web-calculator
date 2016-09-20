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
        //as it stands now, when the result of an equation goes through, if I don't hit "clr" first,
        //numbers get concatenated to the result



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
    _parenth: function(type) {
        
        //the code below is commented out until I properly sort out checkParenth() and computeParenth()
        
        
        // return store.newInput = `${store.curInput}${type}`;
    },
    _eq: function(type) {
        //I don't want _eq to work if the last character of the store.curInput was a parenthesis
        var lastChar = store.curInput.split('').pop();

        // console.log(lastChar);

        if (lastChar === '(' || lastChar === ')') {
            return store.curInput = 'error';
        }
        else if (store.curInput) {
            return store.newInput = `${store.curInput} ${type} `;
        }
    },
    _equate: function() {
        //here is where I would call checkParenth followed by computeParenth
        //doing those before the other values are calculated


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
                return store.newInput = `${minus(a, b)}`;
            }
            else if (equation[1] === '*') {
                return store.newInput = `${multiply(a, b)}`;
            }
            else if (equation[1] === '/') {
                return store.newInput = `${divide(a, b)}`;
            }
            else {
                console.log('uncaught error in this equation');
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

module.exports = Calculator;









// --------------------------

//work in progress of parentheses


function checkParenth(str) {
    var firstParenth = str.indexOf('(');
    var lastParenth = str.length - 1 - str.split('').reverse().join('').indexOf(')');

    console.log('first parenthesis is at ', firstParenth);
    console.log('last parenthesis ', lastParenth);

    if (firstParenth != -1 && lastParenth != -1) {
        return true;
    }


    //split str at first and last parentheses positions, then see within the new split middle string which direction 
    //the next parenthesis faces, if it does. 


    //have the outside parentheses, then check inside.

    //check that the number of parentheses are even

}

function computeParenth(str) {

    //this function is called after checkParenth has been called until it returns no more nested parentheses
    //computes the parentheses in order

}