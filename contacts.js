const shortid = require("shortid");

const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "db/contacts.js");

const fileName = "db/contacts.json";

// function listContacts() {
//   fs.readFile(fileName, "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//      console.log(data);
//   });
// }

function listContacts() {
  fs.readFile(fileName, "utf8")
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
}

// function getContactById(contactId) {
//   fs.readFile(fileName, "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const contact = data.find((contact) => contact.id === contactId)
//     console.log(contact);
//   });
// }

function getContactById(contactId) {
  fs.readFile(fileName, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(fileName, "utf8")
  .then((data) => {
    const contacts = JSON.parse(data);
    const newContacts = JSON.stringify(contacts.filter(contact => contact.id !== contactId))
    fs.writeFile(fileName, newContacts, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .catch((err) => console.log(err.message));
    console.log(newContacts);
  })
}

function addContact(name, email, phone) {
  fs.readFile(fileName, "utf8")
  .then((data) => {
    const contacts = JSON.parse(data);
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    const newArr = contacts.push(newContact)
    const normilizedArr = JSON.stringify(contacts)
    fs.writeFile(fileName, normilizedArr, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .catch((err) => console.log(err.message));
    console.log(normilizedArr);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
