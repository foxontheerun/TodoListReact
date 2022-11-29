import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

const ToDo = ({todo, removeTask, changeStatus, changeTask}) => {

    const [inputTaskName, setTaskName] = useState(todo.taskName);
    const [inputTaskBody, setTaskBody] = useState(todo.taskBody);
    const [disabledInput, setDisabledIinput] = useState(true);
    const time = dayjs(todo.taskDate).format('MMM D, HH:mm').toString();
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    }, [])

    let timer = setInterval(function () {
        if( !todo.status && ((dayjs() - dayjs(todo.taskDate)) >= 0)) {
            changeStatus(todo.id);
            clearInterval(timer);
        }
    }, 1000);

    const handleBodyChange = (e) => {
        setTaskBody(e.currentTarget.value);
    };

    const handleNameChange = (e) => {
        setTaskName(e.currentTarget.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledIinput(!disabledInput);
        if (!disabledInput) {
            changeTask(todo.id, inputTaskName, inputTaskBody);
        }
       
    }
    
    function showFile() {
        if(todo.taskFile) {
            const preview = document.getElementById('files');
        const file   = todo.taskFile;
        const reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
        reader.readAsDataURL(file);
        }
      }

 return (
     <div key={todo.id} className={todo.status ? "task complete-task" : "task"}>
         <div className="task-header">
             <div className="date">{time}</div>
             {todo.taskFile && <button onClick={showFile}>file</button>}
             <img id="files" src="" height="500" />
             <button
                disabled={todo.status}
                 className="dtn-task"
                 onClick={handleSubmit}>
                 изменить
             </button>
             <button className={todo.status ? "dtn-task not-visible" : "dtn-task "}
                     onClick={() => { 
                                        changeStatus(todo.id);
                                        setDisabledIinput(true)
                                    }}
                >
                завершить
             </button>
             <button className="dtn-task" onClick={() => {
                 removeTask(todo.id)
             }}>
                 Удалить
             </button>
         </div>
         <div className={disabledInput ? "task-container" : "task-container active" }>
            <input ref={inputRef}
                disabled={disabledInput}
                className= "task-name" 
                value = {inputTaskName}
                onChange={handleNameChange}
                
            />
                 {todo.taskBody && <div>
                     <hr color="pink" />
                     <textarea 
                         ref={inputRef}
                         disabled={disabledInput}
                         value={inputTaskBody}
                         className="task-body"
                         onChange={handleBodyChange}
                         />
                 </div>}
         </div>
     </div>
 )
}

export default ToDo;