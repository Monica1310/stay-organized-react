import './NewTodo.css';
import { useState, useEffect } from 'react';

function NewTodo() {
    const [usersLoading, setUsersLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userid, setUser]= useState();
    const [category, setCategory]= useState();
    const [description , setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [priority, setPriority] = useState();



    useEffect(() => {
        setUsersLoading(true);
        fetch("http://localhost:8083/api/users")
          .then((response) => response.json())
          .then((users) => {
            setUsers(users);
            setUsersLoading(false);
          })
          .catch(() => setUsersLoading(false));
      }, []);


      useEffect(() => {
        setUsersLoading(true);
        fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(categories => {
            setCategories(categories);
        });
      }, []);

      if (usersLoading) {
        return <h6>Getting users....</h6>;
      } 


      const handleOnSave=(e)=>{
        e.preventDefault();
        console.log(userid);
        console.log(category);
        console.log(description);
        console.log(deadline);
        console.log(priority);
      }


      const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ));

      const categoriesOptions = categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ));

      
    return (
        <>
            <div class="container">
                <h1 class="text-center my-4">Add New User</h1>
                <form>
                    <div class="form-group text-left">
                        <label for="userSelect" >Select User:</label>
                        <select id="userSelect"
                                className="form-control"
                                onChange={(e)=>setUser(e.target.value)}
                        >
                        {usersOptions}
                        </select>
                    </div>
                    <div class="form-group text-left">
                        <label for="categorySelect" style={{}}>Category:</label>
                        <select id="categorySelect" class="form-control"
                         onChange={(e)=>setCategory(e.target.value)}>
                        {categoriesOptions}
                        </select>
                    </div>
                    <div class="form-group text-left">
                       <label for="description" style={{}}>Description:</label>
                        <textarea id="description" class="form-control" rows="4" required  onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div class="form-group text-left">
                        <label for="deadline" style={{}}>Deadline:</label>
                        <input type="date" id="deadline" class="form-control" required onChange={(e) => setDeadline(e.target.value)} />
                    </div>

                    <div class="form-group text-left">
                        <label for="prioritySelect" style={{}}>Priority:</label>
                        <select id="prioritySelect" class="form-control"  required onChange={(e) => setPriority(e.target.value)}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                    </div>
                    <button type="submit" class="btn btn-success" id="newTodoForm" onSubmit={handleOnSave}>Add ToDo</button>
                </form>
            </div>
            <br></br>
        </>
    )
}


export default NewTodo;