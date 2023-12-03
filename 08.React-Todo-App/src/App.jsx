import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
function App() {
  // 1. a list of todos to render.
  // 2. a list of users to correspond to them todos.
  // 3. a loading state
  const [todos, setTodos] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  function randomDate(start = new Date(2023, 12, 1), end = new Date()) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  useEffect(() => {
    const fetchTodos = async () => {
      const todoResult = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (todoResult?.ok) {
        const data = await todoResult.json();
        return data;
      }
    };
    const fetchUsers = async () => {
      const usersResult = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (usersResult?.ok) {
        const data = await usersResult.json();
        return data;
      }
    };
    const populateData = async () => {
      setLoading(true);
      const [todo, users] = await Promise.all([fetchTodos(), fetchUsers()]);
      setTodos(todo);
      setUsers(users);
      setLoading(false);
    };
    populateData();
  }, []);
  return (
    <section className='allItemsWrapper'>
      {loading
        ? "Loading..."
        : todos?.map((todo, idx) => (
            <div className='itemWrapper' key={todo?.id}>
              <div className='circle'></div>
              <div className='content'>
                <span className='itemTitle'>{todo?.title}</span>
                <div className='itemFooter'>
                  <span className='itemUser'>
                    - {users?.find((user) => user?.id === todo?.userId)?.name}
                  </span>
                  <span className='dateTime'>
                    {randomDate()?.toDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
    </section>
  );
}

export default App;
