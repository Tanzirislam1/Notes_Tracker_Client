import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";



function App() {
  const [notes, setNotes] = useState([]);

  /* re-render state : amra akta user create korar por amader page reload nh korle user ta ui tae show kore nh...ai problem ta solve korte amra akta state niye ter initial value false kore amra jei khane data load kortase ter moddhe dependency set kore dibo jer fole oi data ta abar load hbe...terpor amra niche POST method theke data create kortase oikhane .then er moddhe data k console kore terpor amra isReload name diye jei state nise sheikhane oi state ta k ulta kore means !statename kore setState(!) amra setIsReload state er moddhei set kore dise jer fole amra ui tae user ta k reload kora chara peye jacchi.....  */
  const [isReload, setIsReload] = useState(false);

  /* dependency jodi set kora hoy tahole fetch ta k abar call kora hoy */
  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [isReload]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header

  */

  const handleSearch = event => {
    event.preventDefault();

    const queryText = event.target.searchText.value;
    // console.log(queryText);

    if (!queryText) {
      alert('please search valid user name');
    }
    else {
      /* fetch data and set queryText dynamically for search query */
      fetch(`http://localhost:5000/notes?userName=${queryText}`)
        .then(res => res.json())
        .then(data => setNotes(data))
    }

  }

  /*2. here there will be a function named handleDelete
  to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
   */

  const handleDelete = id => {
    console.log(id, 'hello');
    const procced = window.confirm('Are You Sure!!');

    if (procced) {
      const url = `http://localhost:5000/note/${id}`;
      fetch(url, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          /* delete form ui : ui theke kono user k delete kora mne hocche oi user ta k bad diye baki user gulo k access kora ba remaining kora */
          const remaining = notes.filter(note => note._id !== id);
          setNotes(remaining);
        });
    }

  }

  /*
3. for updateing data you need to pass isReload, setIsReload as props to noteCard component 
 */

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

  const handlePost = event => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const title = event.target.title.value;

    fetch('http://localhost:5000/note', {
      method: 'POST',
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
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes?.map(note => (
          <NoteCard key={note._id}
            note={note} handleDelete={handleDelete} isReload={isReload} setIsReload={setIsReload}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
