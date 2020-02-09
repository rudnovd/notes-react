import db from '../../firebase'

const notes = db.collection("notes")

export async function getNotes(userId) {
  try {
    const response = await notes.where("ownerId", "==", userId).get()
    return response
  } catch (error) {
    throw error
  }
}

export async function postNote(data) {
  try {
    const response = await notes.add({
      title: data.title,
      text: data.text,
      ownerId: data.ownerId,
      created: Date.now(),
      edited: Date.now()
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function putNote(data) {
  try {
    const response = notes.doc(data.id).update({
      title: data.title,
      text: data.text,
      edited: Date.now()
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function deleteNote(data) {
  try {
    const response = await notes.doc(data.id).delete()
    return response
  } catch (error) {
    throw error
  }
}
