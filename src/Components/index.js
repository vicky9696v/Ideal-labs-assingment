import {Component} from 'react'
import "./index.css"

const tableContent = [{
    id: 1,
    firstNameValue: 'Ideal',
    lastNameValue: 'labs',
    phoneNum: '9876543210',
}, 
{
    id: 2,
    firstNameValue: 'vinay',
    lastNameValue: 'bandla',
    phoneNum: '9876543211'
}]

class TableValidation extends Component {

    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        tableData: tableContent,
        errors: {

        }
    }
    
    //onChnage function for firstName
    firstNameChnage = e => {
        this.setState({firstName: e.target.value})
    }
    //onChnage function for lattName
    lastNameChnage = e => {
        this.setState({lastName: e.target.value})
    }

//onChnage function for phoneNumber
    phoneNumChange = event => {
        this.setState({phoneNumber: event.target.value})
    }

    //onClick function to delete an item from the list
    deleteFunction = e => {
        const {tableData} = this.state 
     const result = tableData.filter((each, index) => {
         console.log(index, each.id, e.target.id)
         return each.id.toString() !== e.target.id
        })
    console.log(result)
     this.setState({tableData: result});
    }
//validating the form
    validationForm = () => {
        const fields = this.state 
        let isFormValid = true 
        const errors = {}
        
        if(!fields["firstName"] === '') {
            isFormValid = false
            errors["firstName"] =  "*Please Enter Your FirstName" 
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
              isFormValid = false;
              errors["firstName"] = "*Please enter valid first name";
            }
          }
        
        if(fields["lastName"] === "") {
            isFormValid = false
            errors["lasttName"] =  "*Please Enter Your FirstName" 
        }

        if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
              isFormValid = false;
              errors["lastName"] = "*Please enter valid first name";
            }
          }

        

        if(!fields["phoneNumber"] === "") {
            isFormValid = false;
            errors["phoneNumber"] = "*Please enter mobile no.";
        }

        if (typeof fields["phoneNumber"] !== "undefined") {
            if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
              isFormValid = false;
              errors["phoneNumber"] = "*Please enter valid mobile no.";
            }
          }

          //updating the errors
          this.setState({errors: errors})
        return isFormValid
    }
    
    submitForm = e => {
        const {firstName, lastName, phoneNumber, tableData} = this.state
        e.preventDefault()
    
        const formValidation = this.validationForm()
        //update tableData if validation is completed
        if(formValidation) {
            const newData = {
                id: tableData.length + 1,
                firstNameValue: firstName,
                lastNameValue: lastName,
                phoneNum: phoneNumber,
    
            }
    
            //update state feilds to empty
            this.setState(prev => ({tableData: [...prev.tableData, newData]}))
            this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
            })

        }
        
    }

    render() {
        const {firstName, lastName, phoneNumber, tableData, errors} = this.state
        //mapping the tableData and showing in the table 
        let result = tableData.map(eachItem => (
            <tr key={eachItem.id}>
                <td>{eachItem.firstNameValue}</td>
                <td>{eachItem.lastNameValue}</td>
                <td>{eachItem.phoneNum}</td>
                <td>{<i class="fa-solid fa-trash-can" id={eachItem.id} onClick={this.deleteFunction}></i>}</td>
            </tr>
        ))
        return(
            <div className="main-container table table table-bordered">
                <h1 className="heading">Phone Book</h1>
                <table className="table table-container">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        
                    </tr>
                    </thead>
                   <tbody>
                    {result}
                   </tbody>
                </table>
 
                <form className="d-flex flex-row form-class" onSubmit={this.submitForm}>
                    <label htmlFor='firstName'>First Name: </label>
                    <div  className="d-flex flex-column">
                    <input id="firstName" type="text" value={firstName} onChange={this.firstNameChnage}/> 
                    {errors.firstName && <p style={{color: "red"}}>{errors.firstName}</p>}
                    </div>
                    <label htmlFor='lastName'>Last Name: </label>
                    <div  className="d-flex flex-column">
                    <input id="lastName" type="text" value={lastName} onChange={this.lastNameChnage}/> 
                    {errors.lastName && <p style={{color: "red"}}>{errors.firstName}</p>}
                    </div>
                   
                    
                    
                    <label htmlFor='phNumber'> Phone number: </label>
                    <div className="d-flex flex-column">
                    <input id="phNumber" type="text" value={phoneNumber} onChange={this.phoneNumChange}/> 
                    {errors.phoneNumber && <p style={{color: "red"}}>{errors.phoneNumber}</p>}
                    </div>
                    
                    <button className="bt btn-primary ml-3" type="submit">
                        Add Contact
                    </button>
                </form>
            </div>
        )
    }
}

export default TableValidation