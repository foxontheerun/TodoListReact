import { useState } from "react";
import Form from "./components/Form";
import ToDo from "./components/ToDo";

function App() {
  const [todoState, setTodoState] = useState([])

  const addTask = (userInput) => {
    if(userInput) {
        const newItem = {
            id: Math.random().toString(20).substring(5, 15),
            taskName: userInput.taskName,
            taskBody: userInput.taskBody,
            taskDate: userInput.taskDate,
            taskFile: userInput.taskFile,
            status: false,
        }
      console.log(userInput.taskFile);
        setTodoState([...todoState,  newItem])
    }


  }

  const removeTask = (id) => {
    setTodoState([...todoState.filter((todo) => todo.id !== id)])
  }

  const changeStatus = (id) => {
    setTodoState([
        ...todoState.map((todo) =>
        todo.id === id ? { ...todo, status: true } : {...todo})
    ])
  }

  const changeTask = (id, name, body) => {
      setTodoState([
          ...todoState.map((todo) =>
              todo.id === id ? { ...todo, taskName: name, taskBody: body } : {...todo})
      ])
      
  }

  return (
      <div className="App">
        <header>
          <h1>ToDo list</h1>
          <h2>Tasks: {todoState.length}</h2>
        </header>
        <Form addTask={addTask}/>
          {
              todoState.map((todo) => {
                  return (
                      <ToDo
                          todo={todo}
                          changeStatus={changeStatus}
                          changeTask={changeTask}
                          removeTask={removeTask}
                          key={todo.id}
                      />
                  )
              } )
          }
      </div>
  );
}

export default App;
