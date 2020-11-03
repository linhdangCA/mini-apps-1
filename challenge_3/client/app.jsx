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
      zipcode: null,
      phoneNumber: null,
      creditCard: null,
      expiryDate: null,
      cvv: null,
      billingZipcode: null,
      id: null
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // ----------- event handlers ------------
  componentDidMount() {
    this.setState({currentPage: 'homepage'});
  }

  handleNext(e) {
    var state = Object.assign({}, this.state);
    if (this.state.currentPage === 'confirmationPage') {
    }
    e.preventDefault();
    if (this.state.currentPage === 'homepage') {
      this.setState({currentPage: 'userInfo'})
    } else if (this.state.currentPage === 'userInfo') {
      axios.post('/user', state)
        .then((res)=>this.setState({currentPage: 'shippingInfo', id: res.data[0].id}))
        .catch((err)=>console.log(err));
    } else if (this.state.currentPage === 'shippingInfo') {
      axios.post('/shipping', state)
        .then((res)=>this.setState({currentPage: 'billingInfo'}))
        .catch((err)=>console.log(err));
    } else if (this.state.currentPage === 'billingInfo') {
      axios.post('/billing', state)
        .then((res)=>this.setState({currentPage: 'confirmationPage'}))
        .catch((err)=>console.log(err));
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

  // --------------- rendering ---------------
  render() {
    const currentPage = this.state.currentPage;
    let page;
    // homepage
    if (currentPage === 'homepage') {
      page = <Homepage handleNext={this.handleNext} />;
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
      page = <ConfirmationPage state={this.state} handleNext={this.handleNext}/>
    }

    return (
      <div>{page}</div>
    );
  }
}

// ------------ pages and forms ---------------
function Homepage(props) {
  return (
    <form onSubmit={()=>props.handleNext(event)}>
      <button>CHECKOUT</button>
    </form>
  )
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
        <input name="city" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>State:
        <input name="state" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Zipcode:
        <input name="zipcode" type="number" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Phone number:
        <input name="phoneNumber" type="number" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <button>Next</button>
    </form>
  )
}
function BillingInfo(props) {
  return (
    <form onSubmit={()=>props.handleNext(event)}>
      <h1>Billing Information</h1>
      <label>Credit Card #:
        <input name="creditCard" type="number" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Expiry Date:
        <input name="expiryDate" type="text" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>CVV:
        <input name="cvv" type="number" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <label>Billing Zipcode:
        <input name="billingZipcode" type="number" onChange={()=>props.handleChange(event)}></input>
      </label>
      <br />
      <button>Next</button>
    </form>
  )
}
function ConfirmationPage(props) {
  var info = props.state;
  return (
    <div>
      name: {info.name} <br />
      email: {info.email} <br />
      address1: {info.address1} <br />
      address2: {info.address2} <br />
      city: {info.city} <br />
      state: {info.state} <br />
      zipcode: {info.zipcode} <br />
      phoneNumber: {info.phoneNumber} <br />
      creditCard: {info.creditCard} <br />
      expiryDate: {info.expiryDate} <br />
      cvv: {info.cvv} <br />
      billingZipcode: {info.billingZipcode} <br />
      <form>
        <button>Confirm purchase!</button>
      </form>
    </div>
  )
}

// ---------- render to html ------------
ReactDOM.render(<App />, document.getElementById('app'))