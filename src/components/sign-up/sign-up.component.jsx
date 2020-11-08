import React from 'react';
import './sign-up.styles.scss';
import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

class SignUp extends React.Component{

    constructor(){
        super();

        this.state={
            displayName : '',
            email : '',
            password : '',
            confirmPassword:''
        }
    }
     
    handleSubmit = async event => {
        event.preventDefault();
        const {displayName ,email ,password ,confirmPassword} =  this.state;

        if(password !== confirmPassword)
        {
            alert("passwords do not match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);

           await createUserProfileDocument(user, {displayName});
            
           this.setState({
            displayName : '',
            email : '',
            password : '',
            confirmPassword:''});

        }catch(err)
        {
            console.error(err);
        }
    }
    handleOnChange= e => {
        const {name , value } = e.target;
        this.setState({[name]:value });
    }

    render(){
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                    type = 'text'
                    name = 'displayName'
                    value = {this.state.displayName}
                    label = 'Display Name'
                    onChange = {this.handleOnChange}
                    required
                    />
                    <FormInput 
                    type = 'email'
                    name = 'email'
                    value = {this.state.email}
                    label = 'Email'
                    onChange = {this.handleOnChange}
                    required
                    />
                    <FormInput 
                    type = 'password'
                    name = 'password'
                    value = {this.state.password}
                    label = 'Password'
                    onChange = {this.handleOnChange}
                    required
                    />
                     <FormInput 
                    type = 'password'
                    name = 'confirmPassword'
                    value = {this.state.confirmPassword}
                    label = 'Confirm Password'
                    onChange = {this.handleOnChange}
                    required
                    />
                    <CustomButton type='submit'>Sign UP</CustomButton>
                </form>
                
            </div>
        )
    }
}
export default SignUp;