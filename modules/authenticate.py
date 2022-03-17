import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Fetch the service account key JSON file contents
cred = credentials.Certificate('secret_key.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://afya-legit-auth-default-rtdb.firebaseio.com"
})

db = firestore.client()


def checkApiKeyValidity(userEmail, apiKey):
    apiKeys_ref = db.collection('api_keys').document(
        userEmail).collection('my_apps')
    docs = apiKeys_ref.where('apiKey', '==', apiKey).where(
        'authorized', '==', True).get()
    if not docs:
        print('No such key')
        return False
    else:
        for doc in docs:
            print(f'{doc.id} => {doc.to_dict()}')
        return True


print(checkApiKeyValidity("ckagwi8@gmail.com", "wXcxQIQNoB6UNAHYeokEz"))
