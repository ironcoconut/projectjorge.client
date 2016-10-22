PJ.View.register(
  'login', 
  React.createClass({
    getDefaultProps: function () {
      return {
        title: 'Login',
        subtitle: 'Enter either your handle, email or phone and your password to login.',
        elements: [
          {
            type: "text",
            name: "identifier",
            display: "Handle, Email or Phone"
          },
          {
            type: "password",
            name: "password",
            display: "Password"
          }
        ]
      };
    },
    getInitialState: function() {
      return {
        error: null,
        identifier: '',
        password:''
      };
    },
    render: function() {
      var title = this.title();
      var subtitle = this.subtitle();
      var error = this.error();
      var header_row = this.create('div', {className: "header"}, title, subtitle, error);

      var login_form = this.login_form();
      var signup_button = this.signup_button();
      var login_button = this.login_button();

      return this.create('div', {className: 'container'}, header_row, login_form, login_button, signup_button);
    },
    title: function() {
      return React.createElement('h1', {key: 'title'}, this.props.title);
    },
    subtitle: function() {
      return React.createElement('em', {key: 'subtitle'}, this.props.subtitle);
    },
    error: function() {
      return this.state.error ? this.error_span() : null;
    },
    error_span: function() {
      return this.create('span', {className: 'error'}, this.state.error);
    },
    login_form: function() {
      var elements = this.props.elements;
      var mapped = elements.map(this.map_elements, this);

      return this.create('div', {className: 'form-container'}, mapped);
    },
    map_elements: function(element, index) {
      var name = element.name;
      var type = element.type;
      var display = element.display;
      var key = name+index;
      var input_options = {
        type: type,
        name: name,
        value: this.state[name],
        onChange: this.handleChange.bind(this, name)
      };

      var label = this.create('label', {key: key}, display);
      var input = this.create('input', input_options);

      return this.create('div', {key: key}, label, input);
    },
    handleChange(name, event) {
      var data = {};
      data[name] = event.target.value;
      this.setState(data);
    },
    signup_button: function() {
      return this.create('a', {href: PJ.Router.path('signup'), className: "button secondary center"}, "Signup")
    },
    login_button: function() {
      return this.create('a', {onClick: this.login, className: "button primary center"}, "Login")
    },
    login: function() {
      var path = '/users/login';
      var url = PJ.base_url+path;
      var data = {
        identifier: this.state.identifier,
        password: this.state.password
      };

      $.post(url, JSON.stringify(data)).
        done(this.success).
        fail(this.failure);
    },
    success: function() {
      page('/');
    },
    failure: function() {
      this.setState({error: "Invalid id and password."});
    },
    create: React.createElement
  })
);
