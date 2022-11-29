import { useState, useEffect } from "react";
import Form from "./components/Form";
import ToDo from "./components/ToDo";
import dayjs from "dayjs";
import firebaseConfig from "./firebase"
import firebase from 'firebase/compat/app';
import { getDatabase, set, ref, Database, push, child, get } from "firebase/database";


function App() {
  useEffect(() => {
   firebase.initializeApp(firebaseConfig);
   const dbRef = ref(getDatabase());
    get(child(dbRef, `/tasks`)).then((snapshot) => {
      if (snapshot.exists()) {
        const tasksArray = Object.values(snapshot.val());
        setTodoState(tasksArray)
        console.log(tasksArray);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  const [todoState, setTodoState] = useState([])
 
  const addTask = async (userInput) => {
    if(userInput) {
        const newItem = {
            id: Math.random().toString(20).substring(5, 15),
            taskName: userInput.taskName,
            taskBody: userInput.taskBody,
            taskDate: userInput.taskDate,
            taskFile: userInput.taskFile[0],
            status:  ( ((dayjs() - dayjs(userInput.taskDate)) >= 0)) ?
              true :
              false,
        }
        setTodoState([...todoState,  newItem])
        pushData(newItem);
        // set(ref(db, "/tasks"), newItem);
// 
    }
  }


  const pushData =  (item) => {
    const db = getDatabase();
    const taskRef = push(ref(db, "/tasks"));
    set(taskRef, item);
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
        <Form addTask={addTask}
         changeStatus={changeStatus}/>
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
