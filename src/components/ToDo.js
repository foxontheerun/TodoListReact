import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

const ToDo = ({ todo, removeTask, changeStatus, changeTask }) => {
  const [inputTaskName, setTaskName] = useState(todo.taskName);
  const [inputTaskBody, setTaskBody] = useState(todo.taskBody);
  const [disabledInput, setDisabledIinput] = useState(true);
  const time = dayjs(todo.taskDate).format("MMM D, HH:mm").toString();
  const inputRef = useRef(null);
  let fileFlag = false;
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  let timer = setInterval(function () {
    if (!todo.status && dayjs() - dayjs(todo.taskDate) >= 0) {
      changeStatus(todo.id);
      clearInterval(timer);
    }
  }, 1000);

  const handleBodyChange = (e) => {
    setTaskBody(e.currentTarget.value);
  };

  const handleNameChange = (e) => {
    setTaskName(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabledIinput(!disabledInput);
    if (!disabledInput) {
      changeTask(todo.id, inputTaskName, inputTaskBody);
    }
  };


  const showFile = () => {
    const preview = document.getElementById("files");
    const file = todo.taskFile[0];
    if (!fileFlag) {
        const reader = new FileReader();

        reader.onloadend = function () {
          preview.src = reader.result;
        };
        reader.readAsDataURL(file);  
        fileFlag = true; 
    } else {
        fileFlag = false; 
        preview.src = "";
    }
  }

  return (
    <div key={todo.id} className={todo.status ? "task complete-task" : "task"}>
      <div className="task-header">
        <div className="date">{time}</div>
        <button className="dtn-task" onClick={showFile}>file</button>
        <button
          disabled={todo.status}
          className="dtn-task"
          onClick={handleSubmit}
        >
          изменить
        </button>
        <button
          className={todo.status ? "dtn-task not-visible" : "dtn-task "}
          onClick={() => {
            changeStatus(todo.id);
            setDisabledIinput(true);
          }}
        >
          завершить
        </button>
        <button
          className="dtn-task"
          onClick={() => {
            removeTask(todo.id);
          }}
        >
          Удалить
        </button>
      </div>
      <div
        className={disabledInput ? "task-container" : "task-container active"}
      >
        <input
          ref={inputRef}
          disabled={disabledInput}
          className="task-name"
          value={inputTaskName}
          onChange={handleNameChange}
        />
        <img src="" id="files"/>
        {todo.taskBody && (
          <div>
            <hr color="pink" />
            <textarea
              ref={inputRef}
              disabled={disabledInput}
              value={inputTaskBody}
              className="task-body"
              rows={inputTaskBody.split('\n').length}
              onChange={handleBodyChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDo;
