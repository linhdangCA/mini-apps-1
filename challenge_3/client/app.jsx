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
  }

  componentDidMount() {
    this.setState({currentPage: 'userInfo'});
  }

  render() {
    const currentPage = this.state.currentPage;
    let page;
    // homepage
    if (currentPage === 'homepage') {
      page = <Homepage />;
      // form 1
    } else if (currentPage === 'userInfo') {
      page = <UserInfo />
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
  return (<button>CHECKOUT</button>)
}
function UserInfo() {
  return (
    <form>
      <label>Name:
        <input type="text"></input>
      </label>
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