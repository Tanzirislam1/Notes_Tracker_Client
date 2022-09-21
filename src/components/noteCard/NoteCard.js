import React from 'react';
import UpdateModal from '../updateModal/UpdateModal';


const customStyles = {
  position: "absolute",
  top: "-40px",
  left: "43%",
  height: "80px",
  width: "80px",
};

const NoteCard = ({ note, handleDelete, isReload, setIsReload }) => {
  // you will receive isReload, setIsReload as props and pass them to <UpdateModal /> along with note: _id
  const { _id, userName, title } = note || {};
  return (
    <div className="col mt-5" style={{ position: "relative" }}>
      <div className="rounded h-100 color-060930 note-card">
        <div
          className=" bg-warning  rounded-circle mx-auto mt-2"
          style={customStyles}
        >
          {/* subString : amra subString use kore user er name er 1st word ta k ui tae dekhacchi jmn amader gmail login korle gmail er name er 1st word ta show kore.... */}
          <p className="text-center p-2  fs-2 fw-bold text-dark">
            {""}
            {userName.substring(1, 0)}
          </p>
        </div>
        <div className="card-body mt-5">
          <h5 className="card-title">Author : {userName}</h5>
          <p className="card-text">{title}</p>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <div>
            <button
              className="color-801336 btn btn-sm mx-2 "
              onClick={() => handleDelete(_id)}
            >
              delete
            </button>
          </div>
          {/* <button>update</button> */}
          <UpdateModal id={_id} isReload={isReload} setIsReload={setIsReload}/>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;