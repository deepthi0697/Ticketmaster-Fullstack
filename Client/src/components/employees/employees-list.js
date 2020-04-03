import React from 'react'
import {Link } from 'react-router-dom'
import axios from '../../config/axios'

class EmployeesList extends React.Component {
    constructor(){
        super()
        this.state={
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/employees', {
            headers: {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const employee = response.data
            this.setState((prevState) => ({
                employees: prevState.employees.concat(employee)
            }))
        })
       
    }

    handleRemove = (id) => {
        axios.delete(`/employees/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const removedEmployee = response.data
            this.setState((prevState) => ({
                employees: prevState.employees.filter(emp => emp._id !== removedEmployee._id)
            }))
        })
        .catch((err) => {
            alert(err)
        })
    }
    
    render(){
        console.log(this.state.employees)
        return (
            <div className = 'row'>
                <div className = 'col-md-1'></div>
                <div className = 'col-md-10'>
                    <h1>Employees - {this.state.employees.length}</h1>
                    {
                        this.state.employees.length === 0 ? (
                            <div className = 'spinner-border'></div>
                        ) : (
                            <div>
                                 <table className =" table border border-primary ">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Department</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>                      
                                            {
                                                this.state.employees.map((emp) => {
                                                    return (
                                                        <tr key={emp._id}>
                                                            <td>{emp.name}</td>
                                                            <td>{emp.email}</td>
                                                            <td>{emp.mobile}</td>
                                                            <td>{emp.department.name}</td>
                                                            <td><button className = "btn btn-danger" onClick={() => this.handleRemove(emp._id)}>Remove</button></td>
                                                        </tr>                                        
                                                    )
                                                })
                                            }
                                        
                                    </tbody>
                                </table> 
                                <Link to='employees/new'>Add Employee</Link>
                            </div>
                        )
                    }
            
                </div>
            </div>
        )
    }
}

export default EmployeesList