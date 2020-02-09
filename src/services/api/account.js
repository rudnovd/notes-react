import * as firebase from "firebase/app";
import "firebase/auth";

export async function login(email, password) {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    return response
  } catch(error) {
    throw error
  }
}

export async function logout() {
  try {
    const response = await firebase.auth().signOut()
    return response
  } catch(error) {
    throw error
  }
}

export async function registration(email, password) {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    return response
  } catch(error) {
    throw error
  }
}

export async function resetPassword(email) {
  try {
    const response = await firebase.auth().sendPasswordResetEmail(email)
    return response
  } catch(error) {
    throw error
  }
}

export async function remove(user) {
  try {
    const response = await firebase.auth().updateCurrentUser(user.delete())
    return response
  } catch(error) {
    throw error
  }
}

