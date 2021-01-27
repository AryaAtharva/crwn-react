import React from 'react';
import CartItem from  '../card-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) =>(
    <div className = 'cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}></CartItem>
                ))
            }
        </div>
        <CustomButton>Go To Checkout</CustomButton>
        </div>
)

const mapStateToProps = ({cart:{cartItems}})=>({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown) ; 