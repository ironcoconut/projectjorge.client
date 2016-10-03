// Items from the store should **ALWAYS** be wrapped in a promise

PJ.new_registry(
  'Store', 
  function(store) {
    var events = null;
    var current_user = null;
    var base_url = 'http://localhost:4201/api';

    // utility

    function get(path) {
      return $.get(base_url + path);
    }

    function promise(item) {
      return $.Deferred().resolve(item).promise();
    }

    // current user

    function current_user_promise() {
      return promise(current_user);
    }

    function load_current_user() {
      return get('/users').then(function(res) {
        current_user = res.data;
        return current_user;
      });
    }

    // events

    function events_promise() {
      return promise(events);
    }

    function load_events() {
      return get('/events').then(function(res) {
        events = res.data;
        return events;
      });
    }

    // store

    store.register('current_user', function() {
      return current_user ? current_user_promise() : load_current_user();
    });
    store.register('events', function() {
      return events ? events_promise() : load_events();
    });
  }
);
