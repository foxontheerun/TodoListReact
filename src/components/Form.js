import {useState} from "react";

const Form = (props) => {
    const [userInput, setUserInput] = useState('');
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addTask(userInput);
        setUserInput('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Enter task name"
                value={userInput}
                type="text"
                onChange={handleChange}
            />
            <button className="addTask">Add task</button>
        </form>
    )
}

export default Form;