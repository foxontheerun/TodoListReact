import { useState, useEffect } from "react";
import Form from "./components/Form";
import ToDo from "./components/ToDo";
import dayjs from "dayjs";
import firebaseConfig from "./firebase";
import firebase from "firebase/compat/app";
import { getDatabase, set, ref, child, get, remove } from "firebase/database";

function App() {
  useEffect(() => {
    /** Инициализация firebse при первом рендере компоненты */
    firebase.initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());
    /** Запрос на сервер для получения хранимых задачм*/
    get(child(dbRef, `/tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const tasksArray = Object.values(snapshot.val());
          /** Отправка массива задач в состояние */
          setTodoState(tasksArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  /** Состояние с массивом задач */
  const [todoState, setTodoState] = useState([]);
  /** Функция дабавления задач в состояние и на сервер
   * @param {string} userInput имя задачи
   */
  const addTask = async (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(20).substring(5, 15),
        taskName: userInput.taskName,
        taskBody: userInput.taskBody,
        taskDate: userInput.taskDate,
        taskFile: userInput.taskFile,
        /** Статус выполнения зачачи */
        status: dayjs() - dayjs(userInput.taskDate) >= 0 ? true : false,
      };
      setTodoState([...todoState, newItem]);
      const db = getDatabase();
      /** Отправка на сервер */
      set(ref(db, "/tasks/" + newItem.id), newItem);
    }
  };
  /** Удаление задачи
   * @param {string} id идентификатор задачи
   */
  const removeTask = (id) => {
    setTodoState([...todoState.filter((todo) => todo.id !== id)]);
    const db = getDatabase();
    remove(ref(db, "/tasks/" + id));
  };
  /** Изменение статса выполнения задачи
   * @param {string} id идентификатор задачи
   */
  const changeStatus = (id) => {
    setTodoState([
      ...todoState.map((todo) =>
        todo.id === id ? { ...todo, status: true } : { ...todo }
      ),
    ]);
    const db = getDatabase();
    set(ref(db, "/tasks/" + id + "/status"), true);
  };
  /** Изменение имени и содержимого задачи
   *@param {string} id идентификатор задачи
   * @param {string} name имя задачи
   * @param {string} body описание задачи
   */
  const changeTask = (id, name, body) => {
    setTodoState([
      ...todoState.map((todo) =>
        todo.id === id
          ? { ...todo, taskName: name, taskBody: body }
          : { ...todo }
      ),
    ]);
    const db = getDatabase();
    set(ref(db, "/tasks/" + id + "/taskName"), name);
    set(ref(db, "/tasks/" + id + "/taskBody"), body);
  };

  return (
    <div className="App">
      <header>
        <h1>ToDo list</h1>
        <h2>Tasks: {todoState.length}</h2>
      </header>
      <Form addTask={addTask} changeStatus={changeStatus} />
      {todoState.map((todo) => {
        return (
          <ToDo
            todo={todo}
            changeStatus={changeStatus}
            changeTask={changeTask}
            removeTask={removeTask}
            key={todo.id}
          />
        );
      })}
    </div>
  );
}

export default App;
