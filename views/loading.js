PJ.View.register(
  'loading', 
  React.createClass({
    render: function() {
      var state = this.state;

      return React.createElement('p', null, 'loading');
    }
  })
);
