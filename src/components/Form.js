import {useState} from "react";
import dayjs from "dayjs";

const Form = (props) => {
    const currentTime = dayjs().format('YYYY-MM-DDTHH:mm').toString();
    const [userInputTaskName, setUserInputTaskName] = useState('');
    const [userInputTaskBody, setUserInputTaskBody] = useState('');
    const [userInputTaskDate, setUserInputTaskDate] = useState(currentTime);

    const handleNameChange = (e) => {
        setUserInputTaskName(e.currentTarget.value)
    };

    const handleBodyChange = (e) => {
        setUserInputTaskBody(e.currentTarget.value)
    };

    const handleDateChange = (e) => {
        setUserInputTaskDate(e.currentTarget.value)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        props.addTask(
            {   taskName: userInputTaskName,
                taskBody: userInputTaskBody,
                taskDate: userInputTaskDate
            });
        setUserInputTaskName('');
        setUserInputTaskBody('');
        setUserInputTaskDate(currentTime);
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="header-task">
                <input
                    className="input-task-name"
                    placeholder="Enter task name"
                    value={userInputTaskName}
                    type="text"
                    onChange={handleNameChange}
                />
                <input type="datetime-local" className="date-input"
                       onChange={handleDateChange}
                       value={userInputTaskDate}/>
                <button className="add-task">Add task</button>
            </div>
            <textarea
                className="task-body input-task-body"
                placeholder="Enter task"
                value={userInputTaskBody}
                onChange={handleBodyChange}
            />
        </form>
    )
}

export default Form;