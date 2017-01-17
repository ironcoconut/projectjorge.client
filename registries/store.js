// Items from the store should **ALWAYS** be wrapped in a promise

PJ.new_registry(
  'Store', 
  function(store) {
    var current_user = null;
    var base_url = PJ.base_url;

    // utility

    function load_data(res) {
      return res.data;
    }

    function get(paths) {
      return $.get(base_url(paths)).then(load_data);
    }

    // current user

    function current_user_promise() {
      return $.Deferred().resolve(current_user).promise();
    }

    function load_current_user() {
      return get(['users']).then(function(data) {
        current_user = data;
        return current_user;
      });
    }

    // store

    store.register('current_user', function() {
      return current_user ? current_user_promise() : load_current_user();
    });
    store.register('events', function() {
      return get(['events']);
    });
    store.register('find_event', function(id) {
      return get(['events', id]);
    });
  }
);
