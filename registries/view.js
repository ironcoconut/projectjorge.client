PJ.new_registry('View', function(view) {

  function render_app(name, data) {
    ReactDOM.render(
      React.createElement(this[name], data), 
      document.getElementById("bodycontainer")
    );
  }

  view.register('render_app', render_app);
});
