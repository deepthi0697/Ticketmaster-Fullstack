import React from 'react'
import axios from '../../config/axios'

class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            customer: '',
            department: '',
            employees: [],
            employee: '',
            message: '',
            priority: '',
            customers: [],
            departments: [],
            priorities:['High', 'Medium' , 'Low']
        }
    }

    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const customers = response.data
            this.setState({customers})
        })
        .catch((err) => {
            alert(err)
        })

        axios.get('/departments', {
            headers: {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const departments = response.data
            this.setState({departments})
        })
        .catch((err) => {
            alert(err)
        })

       axios.get('/employees', {
           headers : {
               'x-auth' : localStorage.getItem('authKey')
           }
       })
       .then((response) => {
            const employees = response.data
            this.setState({employees})
       })
       .catch((err) => {
           alert(err)
       })

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employees: this.state.employee,
            message: this.state.message,
            priority: this.state.priority
        }
        axios.post('/tickets', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                this.props.history.push('/tickets')
                {console.log(formData)}
            }
        })
        .catch((err) => {
            alert(err)
        })
    }
    render(){
        return (
            <div>
                <h1>Add Ticket</h1>

                <form  onSubmit = {this.handleSubmit}>

                    <label htmlFor='code'>Code </label>
                    <input type='text' id='code' name='code' value={this.state.code} onChange={this.handleChange}/> <br />

                    <label htmlFor='customer'>Customer </label>
                    <select onChange={this.handleChange} name='customer'>
                        <option key='select'>Select</option>
                        {
                            this.state.customers.map(customer => {
                                return <option key={customer._id} value={customer._id}>{customer.name}</option>
                            })
                        }
                    </select> <br />
                    
                    <label htmlFor='department'>Department </label>
                    <select onChange={this.handleChange} name='department'>
                        <option key='select'>Select</option>
                        {
                            this.state.departments.map(department => {
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })
                        } 
                    </select> <br />
                

                    <label htmlFor='employee'> Employees </label>
                    <select onChange={this.handleChange} name='employee'>
                        <option key='select'>Select</option>
                        {
                            this.state.employees.filter(employee => employee.department._id === this.state.department).map(employee => {
                                return <option key={employee._id} value={employee._id}>{employee.name}</option>
                            })        
                        } 
                    </select> <br />
                        {console.log(this.state.employee)}
                    <label htmlFor='message'>Message </label>
                    <input type='text' id='message' value={this.state.message} name='message' onChange={this.handleChange} /> <br />

                    <label>Priority </label>
                    {this.state.priorities.map(p => {
                        return (
                            <div>
                                <input type='radio' value={p} name='priority' onChange={this.handleChange} /> {p} <br />
                            </div>
                        )
                    })}
                    
                    <input type='submit' />

                </form>

            </div>
        )
    }
}

export default TicketForm