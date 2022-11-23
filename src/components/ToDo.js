const ToDo = ({todo, removeTask, pipa: changeStatus}) => {

 return (
     <div key={todo.id} className="task">
         <div className="task-header">
             <div className="date">Date</div>
             <input
                 className={todo.status ? "task-text done" : "task-text"}
                 onClick={() => changeStatus(todo.id)}
                 value = {todo.task}
             />
             <div className="files">files</div>
             <button className="delete-task" onClick={() => removeTask(todo.id)}>
                 Удоли
             </button>
         </div>
         <textarea/>
     </div>
 )
}

export default ToDo;