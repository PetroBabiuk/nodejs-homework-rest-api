const path = require('path')
const fs = require('fs/promises')
const crypto = require('crypto')

const contactsPath = path.join(__dirname, 'contacts.json')

const readData = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(result)
}

const listContacts = async () => {
  return await readData()
}

const getContactById = async (id) => {
  const contacts = await readData()
  const [result] = contacts.filter(contact => contact.id === id)
  return result
}

const removeContact = async (id) => {
  const contacts = await readData()
  const filteredContacts = contacts.filter(contact => contact.id !== id)
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
  return contacts.filter(contact => contact.id === id)
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await readData()
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (id, body) => {
  const contacts = await readData()
  const idx = contacts.findIndex(contact => contact.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
