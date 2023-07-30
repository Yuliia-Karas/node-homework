const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath);

// Повертає масив контактів.
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return [];
  }
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(contactId) {
  const contacts = await listContacts();
  const cont = contacts.find((item) => item.id === contactId);
  return cont || null;
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((cont) => cont.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact[0];
}

//перезапис даних
function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

// Повертає об'єкт доданого контакту.
async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { ...data, id: crypto.randomUUID() };
  contacts.push(newContact);
  await write(data);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
