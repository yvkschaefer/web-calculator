var React = require('react');

var Calculator = require('./Calculator.jsx');


var App = React.createClass({
  render: function() {
    return (
      <main>
        <h1>Calculatrice</h1>
        <Calculator />
        <hr />
      </main>
    );
  }
});

module.exports = App;