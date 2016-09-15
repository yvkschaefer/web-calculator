var React = require('react');

var Calculator = React.createClass({
  render: function() {
    return (
      <main>
        <div className="containerBox">
        <div className="screen">
        </div>
        <div>
            <div className="numbersAndOperators">
                <div className="numbers">
                    <div>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                    </div>
                    <div>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                    </div>
                    <div>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </div>
                    <div>
                        <button>0</button>
                    </div>
                </div>
                <div className="operators">
                    <div>
                        <button>(</button>
                        <button>)</button>
                    </div>
                    <div>
                        <button>*</button>
                        <button>/</button>
                    </div>
                    <div>
                        <button>+</button>
                        <button>-</button>
                    </div>
                    <div>
                        <button>.</button>
                        <button>=</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </main>
    );
  }
});

module.exports = Calculator;