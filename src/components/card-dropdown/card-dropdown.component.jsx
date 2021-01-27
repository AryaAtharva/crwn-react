import React from 'react';
import CartItem from  '../card-item/cart-item.component';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import './cart-dropdown.styles.scss';
import {toggleCartHidden} from '../../redux/cart/cart.action';



const CartDropdown = ({cartItems , history , dispatch}) =>(
    <div className = 'cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?(
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}></CartItem>
                ))
                ):
                <span className='empty-message'>Your Cart is Empty.</span>
            }
        </div>
        <CustomButton onClick={()=>{
             history.push('/checkout')
            dispatch(toggleCartHidden())    
        }}>
                 Go To Checkout</CustomButton>
        </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown)); 