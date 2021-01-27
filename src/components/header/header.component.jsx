import React from 'react';
import './header.styles.scss';
import CartDropdown from "../card-dropdown/card-dropdown.component";
import {auth} from '../../firebase/firebase.utils';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo } from '../../assets/crown.svg';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';

const Header = ({currentUser , hidden})=>(
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/shop' className='option'>
                CONTACT
            </Link>
            
                {
                currentUser?
                <div className='option' onClick={()=>auth.signOut()}>Sign Out</div>
                :
                <Link className='option' to='/signin'>Sign In</Link>
            }
            <CartIcon/>
            {
                hidden ? null : <CartDropdown />
            }
            
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser, 
    hidden : selectCartHidden
});

export default connect(mapStateToProps)(Header);