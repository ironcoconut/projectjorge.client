PJ.View.register(
  'index', 
  React.createClass({
    getInitialState: function() {
      return {view: 'loading'};
    },
    componentDidMount: function() {
      this.props.set_state_callback(this.replaceState.bind(this));
    },
    render: function() {
      var state = this.state;

      return React.createElement(
        PJ.View[state.view],
        state.data
      );
    }
  })
);
