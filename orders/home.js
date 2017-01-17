PJ.Order.register('home', function(ctx) {
  var Store = PJ.Store;

  function render(events) {
    PJ.render('home', events);
  }

  Store.events().then(render);
})
