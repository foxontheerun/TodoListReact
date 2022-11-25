import dayjs from "dayjs";

const ToDo = ({todo, removeTask, changeStatus}) => {

    if( (dayjs() - dayjs(todo.taskDate)) >= 0) {
        todo.status = true;
    }

    const time = dayjs(todo.taskDate).format('MMM D, HH:mm').toString();

 return (
     <div key={todo.id} className={todo.status ? "task complete-task" : "task"}>
         <div className="task-header">
             <div className="date">{time}</div>
             {/*<input type="file" accept="image/png, image/jpeg" className="files"/>*/}
             <button className="dtn-task">
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
             />
                 {todo.taskBody && <div>
                     <hr color="pink" noshade/>
                     <div className="task-body" contentEditable="true">{todo.taskBody}</div>
                 </div>}
         </div>
     </div>
 )
}

export default ToDo;