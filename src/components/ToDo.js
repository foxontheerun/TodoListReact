import dayjs from "dayjs";
import {useState} from "react";

const ToDo = ({todo, removeTask, changeStatus, changeTask}) => {

    const [inputTaskName, setTaskName] = useState(todo.taskName);
    const [inputTaskBody, setTaskBody] = useState(todo.taskBody);

    if( (dayjs() - dayjs(todo.taskDate)) >= 0) {
        changeStatus(todo.id)
    }

    const time = dayjs(todo.taskDate).format('MMM D, HH:mm').toString();

    const handleBodyChange = (e) => {
        setTaskBody(e.currentTarget.value)
    };

    const handleNameChange = (e) => {
        setTaskName(e.currentTarget.value)
    };

    const submit = (e) => {
        e.preventDefault();
        changeTask(todo.id, inputTaskName, inputTaskBody)
    }

 return (
     <div key={todo.id} className={todo.status ? "task complete-task" : "task"}>
         <div className="task-header">
             <div className="date">{time}</div>
             <button
                 className="dtn-task"
                 onClick={submit}>
                 изменить
             </button>
             <button className={todo.status ? "dtn-task not-visible" : "dtn-task "}
                     onClick={() => changeStatus(todo.id)}>
                завершить
             </button>
             <button className="dtn-task" onClick={() => {
                 removeTask(todo.id)
             }}>
                 Удалить
             </button>
         </div>
         <div className="task-container" >
             <input
                 className={todo.status ? "task-name done" : "task-name"}
                 defaultValue = {todo.taskName}
                 onChange={handleNameChange}
             />
                 {todo.taskBody && <div>
                     <hr color="pink" />
                     <textarea
                         value={todo.taskBody}
                         className="task-body"
                         onChange={handleBodyChange}
                         />
                     {/*<div className="task-body" contentEditable="true">{todo.taskBody}</div>*/}
                 </div>}
         </div>
     </div>
 )
}

export default ToDo;