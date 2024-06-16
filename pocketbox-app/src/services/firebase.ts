import { getApp, getApps, initializeApp } from "firebase/app"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdUM82mpJDMUDILaSnpQQr_KTBgC0Pie4",
  authDomain: "pocketbox-82799.firebaseapp.com",
  projectId: "pocketbox-82799",
  storageBucket: "pocketbox-82799.appspot.com",
  messagingSenderId: "751990319771",
  appId: "1:751990319771:web:2bc3159bb73b2b42c3743e",
}

if (getApps().length === 0) {
  initializeApp(firebaseConfig)
}
const fbApp = getApp()
const fbStorage = getStorage()

const listFiles = async () => {
  const storage = getStorage()

  // Create a reference under which you want to list
  const listRef = ref(storage, "images")

  // Find all the prefixes and items.
  const listResp = await listAll(listRef)
  return listResp.items
}

/**
 *
 * @param {*} uri
 * @param {*} name
 */
const uploadToFirebase = async (
  uri: string,
  name: string,
  onProgress: any
): Promise<any> => {
  const fetchResponse = await fetch(uri)
  const theBlob = await fetchResponse.blob()

  const imageRef = ref(getStorage(), `images/${name}`)

  const uploadTask = uploadBytesResumable(imageRef, theBlob)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress && onProgress(progress)
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
        reject(error)
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        })
      }
    )
  })
}

export { fbApp, fbStorage, uploadToFirebase, listFiles }
