class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '',
      name: '',
      email: '',
      password: '',
      shipping_id: null,
      billing_id: null,
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: null
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({currentPage: 'userInfo'});
  }

  handleNext(e) {
    console.log(this)
    e.preventDefault();
    if (this.state.currentPage === 'homepage') {
      this.setState({currentPage: 'userInfo'})
    } else if (this.state.currentPage === 'userInfo') {
      this.setState({currentPage: 'shippingInfo'})
    } else if (this.state.currentPage === 'shippingInfo') {
      this.setState({currentPage: 'billingInfo'})
    } else if (this.state.currentPage === 'billingInfo') {
      this.setState({currentPage: 'confirmationPage'})
    } else {
      this.setState({currentPage: 'homepage'})
    }
  }

  handleChange(e) {
    e.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const currentPage = this.state.currentPage;
    let page;
    // homepage
    if (currentPage === 'homepage') {
      page = <Homepage />;
    // form 1
    } else if (currentPage === 'userInfo') {
      page = <UserInfo handleNext={this.handleNext} handleChange={this.handleChange}/>
    // form 2
    } else if (currentPage === 'shippingInfo') {
      page = <ShippingInfo handleNext={this.handleNext} handleChange={this.handleChange}/>
    // form 3
    } else if (currentPage === 'billingInfo') {
      page = <BillingInfo handleNext={this.handleNext} handleChange={this.handleChange}/>
    // confirmation page
    } else if (currentPage === 'confirmationPage' ) {
      page = <ConfirmationPage handleNext={this.handleNext} handleChange={this.handleChange}/>
    }

    return (
      <div>{page}</div>
    );
  }
}

function Homepage() {
  return (<button type="submit">CHECKOUT</button>)
}
function UserInfo(props) {
  return (
    <form onSubmit={()=>props.handleNext(event)}>
      <h1>Account creation</h1>
      <label>Name:
        <input name="name" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Email Address:
        <input name="email" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Password:
        <input name="password" type="password" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <button>Next</button>
    </form>
  )
}
function ShippingInfo(props) {
  return (
    <form onSubmit={()=>props.handleNext(event)}>
      <h1>Shipping Information</h1>
      <label>Address (Line 1):
        <input name="address1" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Address (Line 2):
        <input name="address2" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>City:
        <input name="city" type="password" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>State:
        <input name="state" type="password" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Zipcode:
        <input name="zipcode" type="password" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <button>Next</button>
    </form>
  )
}
function BillingInfo(props) {
  return (<button>NEXT</button>)
}
function confirmationPage(props) {
  return (<button>NEXT</button>)
}

ReactDOM.render(<App />, document.getElementById('app'))