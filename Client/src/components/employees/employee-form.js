import React from 'react'
import axios from '../../config/axios'

class NewEmployee extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            mobile: '',
            departments: [],
            department: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount() {
        axios.get('/departments', {
            headers :{
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const departments = response.data
            this.setState({departments})
        })
        .catch((err) => {
            alert(err)
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }
        axios.post('/employees', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                this.props.history.push('/employees')
            }
        })
        .catch((err) => {
            alert(err)
        })
    }

   render() {
       return (
           <div>
               <h1>Add employee</h1>
               <form onSubmit={this.handleSubmit}>

                   <label htmlFor='name'>Name</label>
                   <input type='text' name='name' id='name' value={this.state.name} onChange={this.handleChange} /> <br/>

                   <label htmlFor='email'>Email</label>
                   <input type='text' name='email' id='email' value={this.state.email} onChange={this.handleChange} /> <br/>

                   <label htmlFor='mobile'>Mobile</label>
                   <input type='text' name='mobile' id='mobile' value={this.state.mobile} onChange={this.handleChange} /> <br/>

                   <label>Department</label>
                   <select onChange={this.handleChange}  name='department'>
                       <option key='select'>Select</option>
                       {
                           this.state.departments.map((department) => {
                               return <option key={department._id} value={department._id} >{department.name}</option>
                           })
                       }
                   </select>
                   
                   <input type='submit' />
                   
               </form>
           </div>
       )
   }
}

export default NewEmployee