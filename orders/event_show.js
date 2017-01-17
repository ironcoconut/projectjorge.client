PJ.Order.register('event_show', function(ctx) {
  var id = ctx.id;
  var Store = PJ.Store;

  function render(evt) {
    PJ.render('event_show', evt);
  }

  Store.find_event(id).then(render);
})
