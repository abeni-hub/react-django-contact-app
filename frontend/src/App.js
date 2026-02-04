import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [contacts,setContacts] = useState([]);

   useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contacts/")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);

  return (
    <div>
      <h1>Contact List App</h1>
      <p>Total contacts: {contacts.length}</p>
    </div>
  );
}

export default App;
