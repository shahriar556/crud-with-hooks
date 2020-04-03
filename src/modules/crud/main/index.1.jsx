import React from 'react';
import Axios from 'axios'
// import API from 'api';
import './style.css'

import Mdl from '../features/modal'

const URL = 'http://react.techuno.net/class/crud'
const CREATE_URL = 'http://react.techuno.net/class/crud/create-student'
const DELETE_URL = 'http://react.techuno.net/class/crud/delete-student/'
// const URL = 'https://jsonplaceholder.typicode.com/students'


class StudentPortal extends React.Component { 
    state = {
        student: [],
        formItem: {
            name: "",
            image: "",
            dept: ""
        },
        isModalOpen: false
    }

    componentDidMount(){
        
        Axios.get(URL)
                .then(res => this.setState({student: res.data}))
                .catch(e => console.log(e))
                
        

    }

    createStudent = e => {
        e.preventDefault();
        const {name,dept,image} = this.state.formItem;
        console.log(name,dept,image)

        Axios.post(CREATE_URL,
                {
                name: 'Fred'
            })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error); 
          });

    }

    handleDelete = id => {

        Axios.delete(`${DELETE_URL}${id}`)
            .then(res => {
                if(res.status == 200){
                    const student = this.state.student.filter(student => student.id != id);
                    this.setState({student});
                }
            console.log(res.data);
        }).catch(e => console.log(e));

    }

    changeHandler = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    modalHandler = () => {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }
    modalCloseHandler = () => {
        this.setState({isModalOpen: !this.state.isModalOpen}) 
    }

    render(){
        console.log(this.state)
       
        return (
            // <div>
            //     <h3>Online students</h3>
            //     <ul>
            //         {this.state.student.map(({title,id}) => <li key={id}>{title}</li>)}
            //     </ul>
            // </div>

            <div className="main_portal">
                
                <div className="row">
                    <div className="col-lg-12 viw">
                        <div>
                        <button  className="btn btn-sm btn-info" onClick={this.modalHandler}>Add Student</button>
                        </div>
                        {/* <div className="d-flex justify-content-end">
                        <button onClick={() => handleViewChange("1")} className={`btn btn-${viewStatus === "1" ? "success" : "info"} mr-2`}>List View</button>
                        <button onClick={() => handleViewChange("2")} className={`btn btn-${viewStatus === "2" ? "success" : "info"} mr-2`}>Grid View</button>
                        <button onClick={() => handleViewChange("3")} className={`btn btn-${viewStatus === "3" ? "success" : "info"} mr-2`}>Table View</button>
                        </div> */}
                        <Mdl 
                            isOpen={this.state.isModalOpen}
                            close={this.modalCloseHandler}
                            handleSubmit={this.createStudent}
                            changeHandler={this.changeHandler}
                        />


                        
                        <div className="container grid_view">
                            <h3>Grid View</h3>
                            <div className="row">
                        
                                {this.state.student.map(({id,name,dept,image},indx) =>
                                <div className="col-sm-4" key={id}>
                                    <div className={`item list-group-item-${indx%2===0?"info":"success"}`}>
                                        <img className="profile_img" src={image}/>
                                        <h6>{id}</h6>
                                        <h5>{name}</h5>
                                        <p>{dept}</p>
                                        <button  className="btn btn-sm btn-success mr-2" onClick={this.createStudent}>create</button>
                                        <button  className="btn btn-sm btn-success mr-2" onClick={this.modalHandler}>Edit</button>
                                        <button  className="btn btn-sm btn-danger" onClick={() => this.handleDelete(id)}>delete</button>
                                    </div>
                                </div>
                                )}
                        
                            </div>
                        </div>








                    </div>
                </div>

            </div>
        )
    }
}

export default StudentPortal;