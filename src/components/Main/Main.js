import styles from "./style.module.css";

function Main({
  activeNote,
  onUpdateNote
}) {

  // if note active Note
  if (!activeNote) {
    return (
      <div className={styles.notNote + " " + styles.main}>
        No Active Note
      </div>
    )
  };

  const onNoteChange = (key, value) => {
    const newNote = {
      ...activeNote,
      [key]: value,
      time: Date.now()
    }

    onUpdateNote(newNote);
  }


  return (
    <>
      <div className={styles.main}>
        <div className={styles.main_header}>
          <input onChange={(e) => { onNoteChange("title", e.target.value) }} value={activeNote.title} type="text" autoFocus className={styles.title} />
          <textarea onChange={(e) => { onNoteChange("note", e.target.value) }} value={activeNote.note} className={styles.note}></textarea>
        </div>
        <div className={styles.main_footer}>
          <div className={styles.prevs}>
            <div>Title's Preview</div>
            {activeNote.title}
          </div>
          <div className={styles.prevs}>
            <div>Note's Preview</div>
            {activeNote.note}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main