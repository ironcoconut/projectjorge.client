PJ.new_registry('View', function(view) {

  function render_app(name, data) {
    ReactDOM.render(
      React.createElement(this[name], data), 
      document.getElementById("bodycontainer")
    );
  }

  function register_view(name, cb) {
    var opts = cb(this);
    var instance = React.createClass(opts);
    view.register(name, instance);
  }

  function element_with_class(element, className, opts, children) {
    opts.className = className;
    return React.createElement(element, opts, children);
  }

  view.register('render_app', render_app);
  view.register('register_view', register_view);

  view.register('div',            React.createElement.bind(null, 'div'));
  view.register('header',         React.createElement.bind(null, 'div', {className: "header"}));
  view.register('label',          React.createElement.bind(null, 'label'));
  view.register('input',          React.createElement.bind(null, 'input'));
  view.register('container',      React.createElement.bind(null, 'div', {className: 'container'}));
  view.register('form_container', React.createElement.bind(null, 'div', {className: 'form-container'}));
  view.register('title',          React.createElement.bind(null, 'h1', {}));
  view.register('subtitle',       React.createElement.bind(null, 'em', {}));
  view.register('error',          React.createElement.bind(null, 'span', {className: 'error'}));
  view.register('p',              React.createElement.bind(null, 'p'));

  view.register('primary_button',   element_with_class.bind(null, 'a', 'button primary center'));
  view.register('secondary_button', element_with_class.bind(null, 'a', 'button secondary center'));
});
