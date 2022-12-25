const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

console.log(contactsPath);

// TODO: задокументировать каждую функцию

async function listContacts() {
  const contactsList = await fs.readFile(
    contactsPath,
    "utf8",
    (error, data) => {
      if (error) {
        console.error(error);
      }
      return data;
    }
  );
  return contactsList;
}
// module.exports = { listContacts };

async function getContactById(contactId) {
  const listOfContacts = await listContacts();
  console.log(listOfContacts);
  const parsedContacts = JSON.parse(listOfContacts);
  console.log(typeof parsedContacts);

  let foundContactByID = listOfContacts.find(
    (contact) => contact.id === contactId
  );
  console.log(foundContactByID);
}

getContactById(2);

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
