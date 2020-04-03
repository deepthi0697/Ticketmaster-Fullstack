import React from 'react'

class DepartmentForm extends React.Component {
    constructor(){
        super()
        this.state = {
            name: ''
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
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }
    render(){
        return (
            <div>
                <h3>Add department</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name</label> {' '}
                    <input type='text' name='name' id='name' onChange={this.handleChange} value={this.state.name} /> <br/>

                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default DepartmentForm