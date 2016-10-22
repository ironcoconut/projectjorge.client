PJ.View.register(
  'signup', 
  React.createClass({
    getDefaultProps: function () {
      return {
        title: 'Sign Up',
        subtitle: 'Enter your handle, an email or phone number and a password to join.',
        elements: [
          {
            type: "text",
            name: "handle",
            display: "Handle"
          },
          {
            type: "email",
            name: "email",
            display: "Email"
          },
          {
            type: "tel",
            name: "phone",
            display: "Phone"
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
        handle: '',
        email: '',
        phone: '',
        password:''
      };
    },
    render: function() {
      var title = this.title();
      var subtitle = this.subtitle();
      var error = this.error();
      var header_row = this.create('div', {className: "header"}, title, subtitle, error);

      var signup_form = this.signup_form();
      var signup_button = this.signup_button();
      var login_button = this.login_button();

      return this.create('div', {className: 'container'}, header_row, signup_form, signup_button, login_button);
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
    signup_form: function() {
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
      return this.create('a', {onClick: this.signup, className: "button primary center"}, "Signup")
    },
    login_button: function() {
      return this.create('a', {href: PJ.Router.path('login'), className: "button secondary center"}, "Login")
    },
    signup: function() {
      var path = '/users';
      var url = PJ.base_url+path;
      var data = {
        handle: this.state.handle,
        email: this.state.email,
        phone: this.state.phone,
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
      this.setState({error: "Invalid signup information."});
    },
    create: React.createElement
  })
);
