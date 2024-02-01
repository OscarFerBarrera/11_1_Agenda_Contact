import "./ContacList.css";
import React from 'react';
import ContactItem from "../ContactItem/ContactItem"

const ContacList = React.memo(() => {

  const API_URL = "http://localhost:3004/contacts";

  const [contactList, setContactList] = React.useState([]);
  const [newContact, setNewContact] = React.useState({ name: "", lastName: "", phoneNumber: "", imageUrl: ""});

  const getAllContactsFromAPI = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setContactList(data));
  }

  React.useEffect(() => {
    getAllContactsFromAPI();
  }, []);

  const deleteContact = React.useCallback((contact) => {

    fetch(`${API_URL}/${contact.id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => getAllContactsFromAPI());
  }, []);


  const addNewContact = (event) => {
    event.preventDefault()

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        getAllContactsFromAPI();
        setNewContact({ name: "", lastName: "", phoneNumber: "", imageUrl: ""}) // con esta linea se limpia el formulario
      });
  }

  return (
    <div className="contact-list">
      <h1>Mi Agenda</h1>

      <h3>Añadir Nuevo Contacto:</h3>
      <form onSubmit={(event) => addNewContact(event)}>
        <p>
          <label>Nombre:</label>
          <input type="text" name="name" id="name" value={newContact.name} onChange={(event) => setNewContact({
            ...newContact,
            name: event.target.value,
          })}></input>
        </p>
        <p>
          <label>Apellido:</label>
          <input type="text" name="lastName" id="lastName" value={newContact.lastName} onChange={(event) => setNewContact({
            ...newContact,
            lastName: event.target.value,
          })}></input>
        </p>
        <p>
          <label>Teléfono:</label>
          <input type="text" name="phoneNumber" id="phoneNumber" value={newContact.phoneNumber} onChange={(event) => setNewContact({
            ...newContact,
            phoneNumber: event.target.value,
          })}></input>
        </p>
        <p>
          <label>Imagen:</label>
          <input type="text" name="imageUrl" id="imageUrl" value={newContact.imageUrl} onChange={(event) => setNewContact({
            ...newContact,
            imageUrl: event.target.value,
          })}></input>
        </p>
        <button type="submit">Añadir Contacto</button>

        <h3>Número total de Contactos: {contactList.length}</h3>

      </form>

      {contactList.map(contact =>
        <ContactItem
          key={contact.id}
          contact={contact}
          deleteItemContact={deleteContact}>
        </ContactItem>
      )}
    </div>
  );

})

export default ContacList;
