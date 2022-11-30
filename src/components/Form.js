import { useState } from "react";
import React from "react";
import dayjs from "dayjs";

const Form = (props) => {
  const currentTime = dayjs().format("YYYY-MM-DDTHH:mm").toString();
  const [userInputTaskName, setUserInputTaskName] = useState("");
  const [userInputTaskBody, setUserInputTaskBody] = useState("");
  const [userInputTaskDate, setUserInputTaskDate] = useState(currentTime);
  const [inputFile, setFile] = useState("");
  /** Обработка файла */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      /** Когда файл прочтен, отправляем его в состояние */
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (e) => {
    setUserInputTaskName(e.currentTarget.value);
  };

  const handleBodyChange = (e) => {
    setUserInputTaskBody(e.currentTarget.value);
  };

  const handleDateChange = (e) => {
    setUserInputTaskDate(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask({
      taskName: userInputTaskName,
      taskBody: userInputTaskBody,
      taskDate: userInputTaskDate,
      taskFile: inputFile,
    });
    console.log();
    setUserInputTaskName("");
    setUserInputTaskBody("");
    setUserInputTaskDate(currentTime);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="header-task">
        <input
          type="text"
          className="input-task-name"
          placeholder="Enter task name"
          value={userInputTaskName}
          onChange={handleNameChange}
        />
        <input
          type="datetime-local"
          className="date-input"
          onChange={handleDateChange}
          value={userInputTaskDate}
        />

        <div id="upload-container">
          <input
            id="file-input"
            onChange={handleFileChange}
            type="file"
            name="file"
            multiple
          />
          <label htmlFor="file-input">
            <span className="material-symbols-outlined">attach_file</span>
          </label>
        </div>

        <button className="add-task">Add task</button>
      </div>
      <textarea
        className="task-body input-task-body"
        placeholder="Enter task"
        value={userInputTaskBody}
        onChange={handleBodyChange}
      />
    </form>
  );
};

export default Form;
