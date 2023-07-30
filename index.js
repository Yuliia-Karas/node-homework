const contacts = require("./contacts");
const { Command } = require("commander");
// const argv = require("yargs").argv;

// contacts.listContacts().then((contacts)=>console.log(contacts)).catch((err)=>console.error(err));
// contacts.getContactById("AeHIrLTr6JkxGE6SN-0Rw").then((contacts)=>console.log(contacts)).catch((err)=>console.log(err));
// contacts.removeContact("qdggE76Jtbfd9eWJHrssH").then((contacts) => console.log(contacts)).catch((err) => console.log(err));
// contacts.addContact("id", "Batman", "batman@mail.com", "(999) 999-9999").then((contacts) => console.log(contacts)).catch((err) => console.log(err));;

// console.log(process.argv);

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const cont = await contacts.getContactById(id);
      console.log(cont);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
