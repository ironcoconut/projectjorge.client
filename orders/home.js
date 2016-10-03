PJ.Order.register('home', function(ctx) {
  var Store = PJ.Store;
  var Presenter = PJ.Presenter;

  function update_home(events) {
    var data = {
      markers: Presenter.event_markers(events)
    };

    PJ.render('home', data);
  }

  $.Store.events().then(update_home);
})
