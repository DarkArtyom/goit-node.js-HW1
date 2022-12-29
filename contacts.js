const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

console.log(contactsPath);

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
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const listOfContacts = await listContacts();
  let foundContactByID = await listOfContacts.find(
    (contact) => Number(contact.id) === Number(contactId)
  );
  return foundContactByID;
}

async function removeContact(contactId) {
  const listOfContacts = await listContacts();

  const newContactList = await listOfContacts.filter(
    (contact) => Number(contact.id) !== Number(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const listOfContacts = await listContacts();
  listOfContacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
