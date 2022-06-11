import styles from "./style.module.css";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";

function Sidebaar({
  notes,
  onAddNote,
  onDeleteNote,
  onClickNote,
  isActive,
  onSetDirection
}) {
  return (
    <>
      <div className={styles.sidebaar}>

        <div className={styles.sidebaar_header}>
          <div className={styles.sidebaar_title}>
            Notepad
          </div>
          <div style={{width:'20%',display:"flex" , alignItems:"center" , justifyContent:"space-around"}}>
            <IoMdAddCircle onClick={onAddNote} className={styles.sidebaar_add} size={25} />
            <FaExchangeAlt style={{marginLeft:"20px"}} onClick={onSetDirection} color="black" className={styles.sidebaar_add} size={25}/>
          </div>
        </div>

        <div className={styles.contianer}>
          {notes.map(({ id, title, note, time }, index) => {
            return <div key={index} onClick={() => { onClickNote(id) }} className={`${isActive && isActive === id ? styles.active : styles.notes}`}>
              <div className={styles.header}>
                <div className={`${styles.title} ${isActive && isActive === id ? styles.white : styles.black}`}>
                  {title.length > 25 ? title.substring(0,25)+"...":title.substring(0,25)}
                </div>
                <MdDelete onClick={(e) => { e.stopPropagation(); onDeleteNote(id); }} className={styles.icon_delete} size={25} />
              </div>
              <div className={styles.footer}>
                <div className={styles.note_preview}>
                  {note.length > 33 ? note.substring(0,33)+"...":note.substring(0,33)}
                </div>
                <div className={styles.lastModified}>
                  Last Modified - {new Date(time).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebaar