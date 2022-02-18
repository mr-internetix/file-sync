// form events functions 


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

// email check
function ValidateEmail(mail) 
{
    const email = document.getElementById('createEmail').value;
    const ext = email.slice(-12);
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('createEmail').value) && ext == 'filesync.com' )
  {
      return (true)
      
    }
    setInputError(document.getElementById('createEmail'),"ex => example@filesync.com")
    return (false)
}

// password check 
function check_pass() {
    if (document.getElementById('createPassword').value ==
            document.getElementById('confirmPassword').value) {
        document.getElementById('submit').disabled = false;
    } else {
        document.getElementById('submit').disabled = true;
        setInputError(document.getElementById('confirmPassword'),"password do not match")


    }
}





// custom sigin on firebase

window.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // focus validation 
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length< 8) {
                setInputError(inputElement, "Username must be at least 8 characters in length");

            }
            if(e.target.id === 'createEmail' && e.target.value.length>0 && e.target.value.length<8){
                setInputError(inputElement,"example : yourname@filesync.com")
            }
            if(e.target.id === 'createPassword' && e.target.value.length<7){
                setInputError(inputElement,"password must be greater than 6")
            }
            
            if(e.target.id === 'confirmPassword' && e.target.value.length<7){
                setInputError(inputElement,"password must be greater than 6")
            }


        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });


    });

 
    // Notification 
    var notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        }
      });
    
    // Your web app's Firebase configuration
    var firebaseConfig = {
       // add your configs over here 
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


    //login 
    document
        .getElementById("login")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById('login-Btn').disabled = true;
            document.getElementById('login-Btn').innerHTML= 'Please Wait';
            const login = event.target.loginusername.value;
            // console.log(login);
            const password = event.target.password.value;
            // console.log(password);
            var uid = [];
                firebase
                .auth()
                .signInWithEmailAndPassword(login, password)
                .then(({
                    user
                }) => {
                    // console.log(user.uid);
                    uid[0] = user.uid;
                    console.log(uid[0])

                    return user.getIdToken().then((idToken) => {
                        return fetch("/sessionLogin", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                            },
                            body: JSON.stringify({
                                idToken
                            }),
                        });
                    });
                }).catch(err=>{
                    notyf.error(err)
                    document.getElementById('login-Btn').disabled = false;
                    document.getElementById('login-Btn').innerHTML = 'Login';
                })
                .then(() => {
                    return firebase.auth().signOut();
                })
                .then(() => {
                    if(uid.length === 1){

                        window.location.assign(`/profile/${uid[0]}`);
                    }
                });
            return false;
        });



    // signup 

       
    

    document
    .getElementById("createAccount")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById('submit').disabled = true;
      document.getElementById('submit').innerHTML = 'please wait';
      const full_Name = event.target.signupUsername.value.trim().toLowerCase();
      const password = event.target.createPassword.value.trim();
      const userEmail = event.target.createEmail.value.trim();
      const emailcheck = userEmail.slice(-12)
    //  console.log(full_Name)
        var problem = false;
      if(emailcheck === 'filesync.com'){
        firebase
          .auth()
          .createUserWithEmailAndPassword(userEmail, password)
          .then(({ user }) => {
              notyf.success("Account Created sucessfully")
              console.log(user);
                let uid = user.uid;
                  let name = full_Name;
                  let email = user.email;
                  let imageUrl = `https://avatars.dicebear.com/api/avataaars/${uid}.svg`;
  
                  
                 fetch('/usersignin',{
                  method: "POST",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                  },
                  body: JSON.stringify({
                      userid:uid,name, email,imageUrl
                  })
  
                 })
  
            return user.getIdToken().then((idToken) => {
              return fetch("/sessionLogin", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                },
                body: JSON.stringify({ idToken }),
              });
            });
          })
          .catch(err=>{
              problem = true;
              notyf.error(err)
              document.getElementById('submit').disabled = false;
              document.getElementById('submit').innerHTML = 'Continue';
          })
          .then(() => {
            return firebase.auth().signOut();
          })
          .then(() => {
              if(problem !== true){
                  
                  window.location.assign(`/login`);
                  
                }

          });
        return false;
          

      }
      
    });





        

        // sigin IN with google 
        
        var provider = new firebase.auth.GoogleAuthProvider();
       
        document.getElementById('sign_in_google').addEventListener('click',(event)=>{
            event.preventDefault();
            var uidValue = [];
            firebase.auth()
            .signInWithPopup(provider)
            .then(({
                user
            }) => {
                let uid = user.uid;
                let name = user.displayName;
                let email = user.email;
                let imageUrl = user.photoURL

                
               fetch('/usersignin',{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                },
                body: JSON.stringify({
                    userid:uid,name, email,imageUrl
                })

               }).then(Data = async res =>{
                let data = await res.json();
                let value = JSON.stringify(data);
                let obj = JSON.parse(value);
                uidValue[0] = obj.uid;
                
                
            
            })
              
            
        
                return user.getIdToken().then((idToken) => {
              
                    return fetch("/sessionLogin", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                        },
                        body: JSON.stringify({
                            idToken
                        })
                        
                    })
                });
            })
            .then(() => {
                return firebase.auth().signOut();
            })
            .then(() => {
                window.location.assign(`/profile/${uidValue[0]}`);
            });
        return false;
        });
});
