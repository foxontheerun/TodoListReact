import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";

const ToDo = ({ todo, removeTask, changeStatus, changeTask }) => {
  /** Состояния для имени и содержимого задачи */
  const [inputTaskName, setTaskName] = useState(todo.taskName);
  const [inputTaskBody, setTaskBody] = useState(todo.taskBody);
  /** Состояние активности интутов */
  let [disabledInput, setDisabledIinput] = useState(true);
  /** Флаг для показа/скрытия файла при рендере */
  let [isFileShowing, setIsFileShowing] = useState(false);

  const time = dayjs(todo.taskDate).format("MMM D, HH:mm").toString();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    let timer = setInterval(function () {
      /** Если время выполнения задачи истекло, меняется ее статус */
      if (!todo.status && dayjs() - dayjs(todo.taskDate) >= 0) {
        changeStatus(todo.id);
        clearInterval(timer);
      }
    }, 1000);
  }, []);

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
    if (todo.taskFile) {
      setIsFileShowing(!isFileShowing);
    }
  };

  return (
    <div key={todo.id} className={todo.status ? "task complete-task" : "task"}>
      <div className="task-header">
        <div className="date">{time}</div>
        {todo.taskFile && <button onClick={showFile}>file</button>}
        <button
          disabled={todo.status}
          className="dtn-task"
          onClick={handleSubmit}
        >
          change
        </button>
        <button
          className={todo.status ? "dtn-task not-visible" : "dtn-task "}
          onClick={() => {
            changeStatus(todo.id);
            setDisabledIinput(true);
          }}
        >
          finish
        </button>
        <button
          className="dtn-task"
          onClick={() => {
            removeTask(todo.id);
          }}
        >
          remove
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
        <div>
          <hr color="pink" />
          <textarea
            ref={inputRef}
            disabled={disabledInput}
            value={inputTaskBody}
            className="task-body"
            onChange={handleBodyChange}
            rows={inputTaskBody.split("\n").length}
          />
        </div>
        {isFileShowing && <img id="file" src={todo.taskFile} />}
      </div>
    </div>
  );
};

export default ToDo;
