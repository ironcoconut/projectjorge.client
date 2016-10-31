var PJ = (function() {

  function new_registry(name, callback) {
    if (!name) console.error("Name is null");
    if (this[name]) console.error("Element already exists: " + name);

    this[name] = new SimpleRegistry(callback);
  }

  function register(name, item) {
    if (!name) console.error("Name is null");
    if (!item) console.error("Item is null for: " + name);
    if (this[name]) console.error("Element already exists: " + name);

    this[name] = item;
  }

  function SimpleRegistry(callback) {
    this.register = register;

    if (callback) callback(this);
  }

  function render_app(name, data) {
    ReactDOM.render(
      React.createElement(PJ.View[name], data), 
      document.getElementById("bodycontainer")
    );
  }

  function start_app() {
    console.log('ProjectJorge::Gates Starting');
    render_app('loading');
    page.start();
  }

  return new SimpleRegistry(function(pj) {
    pj.register('new_registry', new_registry);
    pj.register('render', render_app);
    pj.register('base_url', 'http://localhost:4201/api');
    pj.register('start', start_app);
  });
}());
