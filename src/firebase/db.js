import { db } from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const setData = (id, userName, answer1,answer2,feedback) =>
db.ref("Survey/" + id).set({
  userName,
  answer1,
  answer2,
  feedback,
});

export const addDataImage =(uid,ImageUrl,VideoUrl,VideoUrl1,Votacion)=>
db.ref(`users/${uid}/`).update(
  {ImageUrl,
  VideoUrl,
  VideoUrl1,
  Votacion,}
);

export const takeVotationData = (uid,snapshot) => 
db.ref().child('users').child(uid).child('Votacion').once('value',
Response=>snapshot(Response)
)


export const addVotation =(uid,Votacion)=>
db.ref(`users/${uid}/`).update({Votacion}
)

export const takeAllVotationData = (uid,snapshot) => 
db.ref().child('users').child(uid).child('Votacion').on('value',
Response=>snapshot(Response)
)

export const takeAllVotationNameData = (uid,snapshot) => 
db.ref().child('users').child(uid).child('username').on('value',
Response=>snapshot(Response)
)

export const deleteUser =(uid)=>
db.ref(`users/${uid}/`).update(
  {ImageUrl:null,
  VideoUrl:null,
  VideoUrl1:null,
  Votacion:null,
  email:null,
  username:null}
);