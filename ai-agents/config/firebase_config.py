import firebase_admin
from firebase_admin import credentials, db, firestore

# Change this line:
cred = credentials.Certificate("../keys/firestore.json") 

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://pulsecity-465916-default-rtdb.firebaseio.com/'
})


print("Firebase Admin SDK initialized successfully!")