import React from 'react'
import axios from '../../config/axios'

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData)
        .then((response) => {
            console.log(response.data)
            if(response.data.hasOwnProperty('error')){
                window.alert(response.data.error)
            }else{
                const  token  = response.data
                localStorage.setItem('authKey',token)
                this.props.history.push('/')
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){  
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>

                    <div className = 'form-group'>
                        <label htmlFor='email'>Email</label> {' '}
                        <input type='text' id='email' name='email' value={this.state.email} onChange={this.handleChange} /> 
                    </div>

                    <div className = 'form-group'> 
                        <label htmlFor='password'>Password</label> {' '}
                        <input type='password' id='password' name='password' value={this.state.password} onChange={this.handleChange} /> 
                    </div>

                    <input className="btn btn-primary" type='submit' value='Login' />
                </form>
            </div>
        )
    }
}

export default Login