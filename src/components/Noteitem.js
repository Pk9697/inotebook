import React from 'react'

const Noteitem = (props) => {
    const {note}=props;
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt mx-2"></i>
                    <i className="far fa-edit"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
