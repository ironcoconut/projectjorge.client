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

  function register_partial(name, cb) {
    var opts = cb(this);
    var instance = React.createClass(opts);
    view.register(name, React.createElement.bind(null, instance));
  }

  function element_with_class(element, className, opts, children) {
    opts.className = className;
    return React.createElement(element, opts, children);
  }

  view.register('render_app', render_app);
  view.register('register_view', register_view);
  view.register('register_partial', register_partial);

  view.register('div',            React.createElement.bind(null, 'div'));
  view.register('label',          React.createElement.bind(null, 'label'));
  view.register('input',          React.createElement.bind(null, 'input'));
  view.register('container',      React.createElement.bind(null, 'div', {className: 'container-fluid'}));
  view.register('button',         React.createElement.bind(null, 'div'));
  view.register('h1',             React.createElement.bind(null, 'h1'));
  view.register('h2',             React.createElement.bind(null, 'h2'));
  view.register('h6',             React.createElement.bind(null, 'h6'));
  view.register('ul',             React.createElement.bind(null, 'ul'));
  view.register('li',             React.createElement.bind(null, 'li'));
  view.register('em',             React.createElement.bind(null, 'em'));
  view.register('br',             React.createElement.bind(null, 'br'));
  view.register('p',              React.createElement.bind(null, 'p'));
  view.register('a',              React.createElement.bind(null, 'a'));
  view.register('span',           React.createElement.bind(null, 'span'));
  view.register('strong',         React.createElement.bind(null, 'strong'));

  view.register('primary_button',   element_with_class.bind(null, 'a', 'button primary center'));
  view.register('secondary_button', element_with_class.bind(null, 'a', 'button secondary center'));
});
