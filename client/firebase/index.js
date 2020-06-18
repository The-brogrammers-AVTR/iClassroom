import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAC5KmS4BgtXcth75TWft2QCgPA0cWhJ0I',
  authDomain: 'fir-storage-f73bd.firebaseapp.com',
  databaseURL: 'https://fir-storage-f73bd.firebaseio.com',
  projectId: 'fir-storage-f73bd',
  storageBucket: 'fir-storage-f73bd.appspot.com',
  messagingSenderId: '57502457094',
  appId: '1:57502457094:web:83df4e3831611ef2249287'
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}
