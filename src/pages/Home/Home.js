import { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import Sidebaar from "../../components/Sidebaar/Sidebaar";
import styles from "./style.module.css";

function Home() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes"))||[]);
    const [active, setActive] = useState(false);

    useEffect(()=>{
        localStorage.setItem("notes" , JSON.stringify(notes));
    },[notes]);

    // this function will create a note
    const addNote = () => {
        const newNote = {
            id: String(Date.now() + Math.random() * 10),
            title: "Untitled - Note Here",
            note: "",
            time: Date.now()
        };

        console.log(newNote.id)

        // adding new note to the note
        setNotes(notes.concat(newNote));
    };

    // this function will be used to delete notes
    const deleteNote = (id) => {
        // filtered note
        const filteredNotes = notes.filter(note => note.id !== id);
        // setting note again
        setNotes(filteredNotes);
        // setting active false
        setActive(false);
    };

    // this function will be used to make note active
    const makeNoteActive = (id) => {
        // setting active
        setActive(id);
    };

    // this function return actual note using active note
    const getActiveNote = () => {
        if (active) {
            return notes.find(note => note.id === active);
        }

        return false;
    };

    // this function will be used to update note
    const updateNote =(updatedNote)=>{
        const newNotes = notes.map(note =>{
            if(updatedNote.id === note.id){
                return updatedNote;
            }

            return note;
        })

        // setting note
        setNotes(newNotes);
    }

    return (
        <div className={styles.home}>
            <Sidebaar
                onAddNote={addNote}
                notes={notes}
                onDeleteNote={deleteNote}
                onClickNote={makeNoteActive}
                isActive={active}
            />
            <Main
                activeNote={getActiveNote()}
                onUpdateNote={updateNote}
            />
        </div>
    )
}

export default Home