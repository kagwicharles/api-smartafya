import {
    collection, getFirestore,
    doc, setDoc, getDocs, where, query, deleteDoc
} from "firebase/firestore"

const db = getFirestore();

const jsonData = [];

function addApp(generatedKey, email, app_name, app_desc) {

    try {
        const docRef = doc(collection(db, "api_keys", email, "my_apps"))
        setDoc(docRef, {
            apiKey: generatedKey,
            authorized: true,
            appName: app_name,
            appDescription: app_desc
        })
        console.log("Document written with Id: " + docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const deleteApp = async (top_level_doc, email, low_level_doc, api_key) => {
    const collectionRef = collection(db, top_level_doc, email, low_level_doc)
    const q = query(collectionRef, where("apiKey", "==", api_key))
    const querySnap = await getDocs(q)
    const results = querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    results.forEach(async result => {
        const docRef = doc(collectionRef, result.id)
        await deleteDoc(docRef)
        return 0
    })
    return 1
}

export {
    jsonData,
    addApp,
    deleteApp
}