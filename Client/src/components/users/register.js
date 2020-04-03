import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/register', formData)
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                this.props.history.push('/users/login')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){  
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className = 'form-group'>
                        <label htmlFor='username'>username</label> {' '}
                        <input type='text' id='username' name='username' value={this.state.username} onChange={this.handleChange} /> 
                    </div>

                    <div className = 'form-group'>
                        <label htmlFor='email'>Email</label> {' '}
                        <input type='text' id='email' name='email' value={this.state.email} onChange={this.handleChange} /> 
                    </div>

                    <div className = 'form-group'>
                        <label htmlFor='password'>Password</label> {' '}
                        <input type='password' id='password' name='password' value={this.state.password} onChange={this.handleChange} /> 
                    </div>
                   

                    <input className = 'btn btn-primary'type='submit' value='Register with us' />
                </form>
            </div>
        )
    }
}

export default Register