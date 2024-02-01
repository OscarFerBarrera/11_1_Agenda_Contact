import React from "react";
import "./ContactItem.css"

const ContactItem = React.memo((props) => {
  console.log("Ejecutado el render de ContacItem " + props.contact.name)
  return (
    <div className="contact-item" key={props.id}>
      <img className="contact-item__image" src={props.contact.imageUrl} alt="imangen de"></img>

      <div className="contact-item__info">

        <p className="contact-item__name">{props.contact.name}</p>
        <p className="contact-item__name">{props.contact.lastName}</p>
        <p className="contact-item__name">{props.contact.phoneNumber}</p>
        
      </div>
      <button className="contact-item__delete-button" onClick={() => props.deleteItemContact(props.contact)}>ELIMINAR
      </button>
    </div>
  );
})

export default ContactItem;