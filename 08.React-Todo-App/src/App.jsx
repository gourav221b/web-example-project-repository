import { useEffect, useState } from "react";
import "./App.css";
import "./ToDo.css";
export default function App() {
  const [toDos, setToDos] = useState([
    {
      id: 0,
      title: "Something to do",
      completed: false,
    },
    {
      id: 1,
      title: "Something to do",
      completed: true,
    },
  ]);

  const addToDo = (e) => {
    e.preventDefault();
    let todoData = new FormData(e.target);
    let toDo = {
      id: toDos[toDos.length - 1]?.id + 1,
      title: todoData.get("taskInput"),
      completed: false,
    };
    setToDos([...toDos, toDo]);
    e.target.reset();
  };
  const deleteToDo = (todo) => {
    let temp = structuredClone(toDos);
    let filteredList = temp.filter((item) => item.id !== todo.id);
    setToDos(filteredList);
  };

  useEffect(() => {
    localStorage.setItem("AllToDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <main>
      <form onSubmit={addToDo}>
        <input
          type='text'
          placeholder='Enter todays task'
          name='taskInput'
          id='taskInput'
        />
        <button>Add task</button>
      </form>
      <section className='toDoSectionWrapper'>
        {toDos?.length == 0 && <>No task available yet</>}
        {toDos.map((todo, idx) => (
          <div
            key={idx}
            className={"toDoItem " + (todo.completed ? "completed" : "")}
          >
            <span> {todo.title}</span>
            <button onClick={() => deleteToDo(todo)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-check-circle-2'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='m9 12 2 2 4-4' />
              </svg>
            </button>
            <button onClick={() => deleteToDo(todo)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-trash-2'
              >
                <path d='M3 6h18' />
                <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                <line x1='10' x2='10' y1='11' y2='17' />
                <line x1='14' x2='14' y1='11' y2='17' />
              </svg>
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
