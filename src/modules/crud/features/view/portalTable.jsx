import React from 'react';

const PortalTable = ({post,error,modalHandler,handleDelete}) => {
    return (
        <div className="table_view">
            <h3>Table View</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    <th scope="col" style={{width: "153px"}}>Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {post.map(({id,title,body},indx) => 
                        <tr key={id}>
                            <th scope="row">{id}</th>
                            <td>{title}</td>
                            <td>{body}</td>
                            <td>
                                <button onClick={() => modalHandler(2,id)} className="btn btn-sm btn-success mr-2">Edit</button>
                                <button onClick={() => handleDelete(id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PortalTable;