import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingContactId, setEditingContactId] = useState(null);

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

  // UPDATE
  if (editingContactId !== null) {
    fetch(`http://127.0.0.1:8000/api/contacts/${editingContactId}/`, {
      method: "PUT",
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
      .then((updatedContact) => {
        setContacts(
          contacts.map((c) =>
            c.id === updatedContact.id ? updatedContact : c
          )
        );
        resetForm();
      });

    return;
  }

  // CREATE
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
      resetForm();
    });
}
function resetForm() {
  setName("");
  setEmail("");
  setPhone("");
  setEditingContactId(null);
}

  function handleDeleteContact(id) {
    fetch(`http://127.0.0.1:8000/api/contacts/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
    });
  }
function startEditContact(contact) {
  setName(contact.name);
  setEmail(contact.email);
  setPhone(contact.phone);
  setEditingContactId(contact.id);
}


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Contact List App</h1>
        <p>Total contacts: {contacts.length}</p>
        <h2>Add Contact</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-blue-500"
        />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-blue-500"
        />
        <br />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-blue-500"
        />
        <br />

        <button onClick={handleAddContact}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-gray-700 transition duration-200">
          {editingContactId ? "Update Contact" : "Add Contact"}
        </button>

        <ul className="space-y-4"></ul>
        {contacts.map((contact) => (
          <li key={contact.id}
            className="border rounded-lg p-4 shadow-sm"
>
            <strong>{contact.name}</strong>
            <br />
            {contact.email} <br />
            {contact.phone}
            <button onClick={() => startEditContact(contact)}>Edit</button>
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
