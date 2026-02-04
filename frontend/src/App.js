import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contacts/")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);

  function handleAddContact() {
    if (name.trim() === "" || email.trim() === "" || phone.trim() === "") {
      return;
    }

    fetch("http://127.0.0.1:8000/api/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setName("");
        setEmail("");
        setPhone("");
      });
  }
  function handleDeleteContact(id) {
    fetch(`http://127.0.0.1:8000/api/contacts/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
    });
  }


  return (
    <div>
      <h1>Contact List App</h1>
      <p>Total contacts: {contacts.length}</p>
      <h2>Add Contact</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />

      <button onClick={handleAddContact}>Add Contact</button>
      <ul></ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <strong>{contact.name}</strong>
          <br />
          {contact.email} <br />
          {contact.phone}
          <button onClick={() => handleDeleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}

export default App;
