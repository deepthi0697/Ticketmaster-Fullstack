import React from 'react'

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.customer ? props.customer.name : '',
            email: props.customer ? props.customer.email : '',
            mobile: props.customer ? props.customer.mobile : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        this.props.handleSubmit(formData)
    }
    render(){
        return (
            <div className = 'row'>
                <div className ='col-md-1'></div>
                <div className ='col-md-2'>
                <form  onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='name'>Name</label>
                        <input type="text" id='name' value={this.state.name} name='name' onChange={this.handleChange} /> <br/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input type="text" id='email' value={this.state.email} name='email' onChange={this.handleChange} /> <br/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor='mobile'>Mobile</label>
                        <input type="text" id='mobile' value={this.state.mobile} name='mobile' onChange={this.handleChange} /> <br/>
                    </div>

                    <input type = 'submit' />
                </form>
                </div>
            </div>
        )
    }
}
export default Form