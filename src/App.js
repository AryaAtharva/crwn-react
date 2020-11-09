import React from 'react';
import {Switch ,Route , Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import {connect} from 'react-redux';
import ShopPage from "./pages/shop/shop.component";
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action'
import './App.css';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    
    const {setCurrentUser} =this.props;
   this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if(userAuth)
      {
        const userRef =await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          console.log(snapshot.data());
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
          })
        });
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signin'  render={()=> 
        this.props.currentUser ?(<Redirect to='/' />):(<SignInAndSignUpPage />) }/>
      </Switch>
    </div>
  );
  }
}

const mapStatetoProps = ({user})=>({
currentUser:user.currentUser  
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user =>dispatch(setCurrentUser(user))

});

export default connect(mapStatetoProps ,mapDispatchToProps)(App);
