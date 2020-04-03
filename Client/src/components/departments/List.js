import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './Form'

class DepartmentList extends React.Component {
    constructor(){
        super()
        this.state = {
            departments: []
        }
    }

    handleSubmit = (formData) => {
        axios.post('/departments',formData,{
            headers: {
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else {
                const department = response.data
                this.setState(prevState => ({
                    departments: prevState.departments.concat(department)
                }))
                
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        axios.get('/departments', {
            headers: {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const departments = response.data
            console.log(departments)
            this.setState({departments})
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    handleRemove = (id) => {
        axios.delete(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const department = response.data
            console.log(response)
            this.setState((prevState) => ({
                departments: prevState.departments.filter(dept => dept._id !== department._id)
            }))
        })
        .catch((err) => {
            alert(err)
        })
    }
    render(){
        return (
            <div className = 'row'>
                <div className='col-md-1'></div>
                <div className='col-md-6'>
                    <h1>Departments - {this.state.departments.length}</h1>
                    {
                        this.state.departments.length === 0 ? (
                            <div className = 'spinner-border'>
                            </div>
                        ) : (
                            <div>
                                <table className =" table border border-primary">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.departments.map(department => {
                                                return (
                                                        <tr key={department._id}>
                                                            <td>{department.name}</td>
                                                            <td><button className = "btn btn-danger" onClick={()=> this.handleRemove(department._id)}>Remove</button></td>
                                                        </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>           
                            </div>
                        )
                    }
                </div>
                
                <div className='col-md-5'>
                    <DepartmentForm handleSubmit= {this.handleSubmit}/>
                </div>

            </div>
        )
    }
}

export default DepartmentList