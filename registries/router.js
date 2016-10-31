PJ.new_registry(
  'Router',
  function(router) {
    var routes = {};

    // public api

    router.register('path', function(name, opts) {
      return routes[name](opts);
    });

    // route registration

    build_route({path: '/signup', name: 'signup', auth: false});
    build_route({path: '/login', name: 'login', auth: false});
    build_route({path: '/', name: 'home', auth: true});

    build_route({path: '/events/:id', name: 'event_show', auth: true});
    build_route({path: '/events/:id/copy', name: 'event_copy', auth: true});
    build_route({path: '/events/:id/invite', name: 'event_invite', auth: true});
    build_route({path: '/events/new', name: 'event_new', auth: true});
    build_route({path: '/invite', name: 'event_new', auth: true});

    // default redirect to home
    page('*', '/');

    // implementation

    function build_route(opts) {
      var path = opts['path'];
      var name = opts['name'];
      var auth = opts['auth'] || false;
      var ctrl = handler.bind({}, name);

      // page lives in the global: https://visionmedia.github.io/page.js/
      if(auth) {
        page(path, loggedin, ctrl)
      } else {
        page(path, ctrl)
      }

      routes[name] = get_path.bind({}, path);
    }

    function get_path(path, opts) {
      if(opts && opts.length > 0) {
        opts.reduce(function(pre, cur) {
          return pre.replace(/(:\w+)/, cur);
        }, path)
      } else {
        return path;
      }
    }

    function loggedin(ctx, next) {
      PJ.Store.current_user().then(
        function(current_user) {
          next();
        },
        function() {
          page('/login');
        }
      );
    }

    function handler(name, ctx) {
      return PJ.Order[name](ctx.params);
    }
  }
);
