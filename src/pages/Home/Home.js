import { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import Sidebaar from "../../components/Sidebaar/Sidebaar";
import styles from "./style.module.css";

function Home() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes"))||[]);
    const [active, setActive] = useState(false);
    const [direction , setDirection] = useState(localStorage.getItem("direction")||"row-reverse");

    useEffect(()=>{
        localStorage.setItem("notes" , JSON.stringify(notes));
    },[notes]);

    useEffect(()=>{
        localStorage.setItem("direction" , direction);
    },[direction]);
    
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
        // setting active with toggling
        if(active === id){
            setActive(false);
        }else{
            setActive(id);
        }
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
    };

    // this function will be used to change the direction of the editor and note populater
    const changeDirection=()=>{
        // toggling the dirctions
        if(direction === "row"){
            setDirection("row-reverse");
        }else{
            setDirection("row");
        }
        console.log(direction)
    };

    return (
        <div style={{flexDirection:direction}} className={styles.home}>
            <Sidebaar
                onAddNote={addNote}
                notes={notes}
                onDeleteNote={deleteNote}
                onClickNote={makeNoteActive}
                isActive={active}
                onSetDirection={changeDirection}
            />
            <Main
                activeNote={getActiveNote()}
                onUpdateNote={updateNote}
            />
        </div>
    )
}

export default Home