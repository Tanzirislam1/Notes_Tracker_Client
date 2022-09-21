import React from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");


//don't worry its just a package for modal. just go and explore https://www.npmjs.com/package/react-modal

export default function UpdateModal({ id, isReload, setIsReload }) {

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const updatePost = event => {
    // console.log('update');
    event.preventDefault();
    const userName = event.target.userName.value;
    const title = event.target.title.value;

    const url = `http://localhost:5000/note/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ userName, title })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsReload(!isReload);
      })
  }

  return (

    <div>
      <button onClick={openModal} className="color-801336 btn-sm btn">
        {" "}
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="btn btn-sm btn-warning">
          close
        </button>
        <div>Please insert your text</div>
        <div className=" p-3 color-4D4C7D">
          <form onSubmit={updatePost} className="container " >
            <div className="input-group mb-3 mt-5">
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
                aria-label="userName"
                name="userName"
              />
            </div>

            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                name="title"
              ></textarea>
            </div>
            <div className="mt-4">
              <input type="submit" value="submit" className="btn btn-info" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

