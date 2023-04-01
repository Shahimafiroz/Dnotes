import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
// import { dkeeper_backend } from "../../../declarations/dkeeper_backend";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }
  //useeffect hook for 1st loading of the page // note the square bracks in line 26 are very imp(7.51 in lec 462) ensures use effect runs only once
  useEffect(() => {
    console.log("UF triggered");
    fetchData();
  }, []);
  // fetch data is being split because it  has to be async
  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }
  //delete note using deleteNote function
  function deleteNote(id) {
    dkeeper_backend.deleteNote(id);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
