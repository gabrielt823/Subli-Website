/* eslint-env es6 */
/* eslint-disable */

//adds admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents reloading of page
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole'); //ref to the function
    addAdminRole({ email: adminEmail}).then(result => {
        console.log(result); 
    })
})

//listen for the authorization status changes (keeps track of users what they see and cant see) 
auth.onAuthStateChanged(user => {
    console.log(user);
    if(user) {
        user.getIdTokenResult().then(idTokenResult => { //sets admin accounts to true
            user.admin = idTokenResult.claims.admin;
            setupUI(user); //setsup admin
        })
        //get data if logged in
        db.collection('guides').onSnapshot(snapshot => { //snapshot is the call back from the item in the db realtime 
            setupGuides(snapshot.docs);
    }, err => {
        console.log(err.message)
    });
    }else{ //nothing shows
        setupUI();
        setupGuides([]); 
    }
        
});
//create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value

    }).then(() => {
        //close the modal and resets the form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
    }).catch(err => { //creates protection from editing console code to allow only users to create guide 
        console.log(err.message);
    })
})

//signup 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
//gets user sign up info
const email = signupForm['signup-email'].value;
const password = signupForm['signup-password'].value;

//sign up the user
auth.createUserWithEmailAndPassword(email, password).then(cred=> {
    return db.collection('users').doc(cred.user.uid).set({ //.doc combines the uid created with the bio info
        
    });
    
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});
//logut
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();

});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user infpo
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
    
    //close login modal and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
})

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
