class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '',
      name: '',
      email: '',
      password: '',
      shipping_id: null,
      billing_id: null
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({currentPage: 'userInfo'});
  }

  // handleSubmit() {

  // }

  handleChange(event) {
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
      page = <UserInfo name={this.state.value} handleChange={this.handleChange}/>
    // form 2
    } else if (currentPage === 'shippingInfo') {
      page = <ShippingInfo />
    // form 3
    } else if (currentPage === 'billingInfo') {
      page = <BillingInfo />
    // confirmation page
    } else if (currentPage === 'confirmation' ) {
      page = <Confirmation />
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
    <form>
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
      <input type="submit" value="Next"></input>
    </form>
  )
}
function ShippingInfo() {
  return (<button>NEXT</button>)
}
function BillingInfo() {
  return (<button>NEXT</button>)
}
function Confirmation() {
  return (<button>NEXT</button>)
}

ReactDOM.render(<App />, document.getElementById('app'))