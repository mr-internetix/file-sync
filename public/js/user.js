// referncing and selecting
const fileInput = document.querySelector("#file-input");
const file_name = document.querySelector("#file_name");
const progressArea = document.querySelector(".progress-area");
const uploadedArea = document.querySelector(".uploaded-area");
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const uid = window.location.pathname.substr(9);

const host = "http://localhost:3000";




const uploadURL = `${host}/api/v2/userfiles/${uid}`;


// imports for ui 
// Referencing buttons 

const home = document.getElementById('home');
const upload = document.getElementById('upload');
const files = document.getElementById('files');
const uploadBtn = document.getElementById('upload-button')

// referencing containers 

const main_container = document.getElementById('main_container');
const upload_container = document.getElementById('upload_container');
const files_container = document.getElementById('files_container');



//referncing loader
const loader = document.getElementById('loader');



home.addEventListener('click',()=>{
  loader.classList.remove('hidden');    
    main_container.classList.remove('invisible');
    upload_container.classList.add('invisible');
    files_container.classList.add('invisible');
    loader.classList.add('hidden');
});

uploadBtn.addEventListener('click',()=>{
  upload_container.classList.remove('invisible');
    main_container.classList.add('invisible');
    files_container.classList.add('invisible');
  loader.classList.add('hidden')

})

upload.addEventListener('click',()=>{
  loader.classList.remove('hidden')
  
    upload_container.classList.remove('invisible');
    main_container.classList.add('invisible');
    files_container.classList.add('invisible');
  loader.classList.add('hidden')
})

// files button 

files.addEventListener('click',()=>{

  loader.classList.remove('hidden');
  files_container.innerHTML = '';
  files_container.innerHTML = `<h1 id ="file_Heading"> your files </h1>
  
  <section class="uploaded-area" id="files_area">

    </section>`;
   const files_area = document.getElementById('files_area');


  
  
  async function getFiles(url){
    
    const response = await fetch(url,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
      
    });
    return response.json();
    
    
  }


  
  
  getFiles(`${host}/userfilesupload/${uid}`)
  .then(data=>{
    for(let i =0; i<data.file_name.length;i++){

      let div = document.createElement(`DIV`);
      let div2 = document.createElement('DIV');
      let li = document.createElement("LI");
      let li2 = document.createElement("LI");
      // let li3 = document.createElement("LI");
      // changing bits to MB
      let value = parseInt(data.files_size[i])/1e+6;
    
      // div.className="file_item"
      // console.log(data)
      li.className= "row";
      li.appendChild(div)
      div.className="content upload";
      div.innerHTML = `<i class="fas fa-file-alt"></i> `;
      div2.className='details';
      div2.innerHTML = `<span class="name">${data.file_name[i]}</span>
      <span class="size">${value.toFixed(2)} MB</span>
      `;
      div.appendChild(div2)
      li2.className = "fas fa-download";
      li.appendChild(li2);
      // li3.className = "fa fa-trash";
      // li.appendChild(li3);
      files_area.appendChild(li);

//       <div style="
//     /* width: -webkit-fill-available; */
// ">
//     <li class="fa fa-trash" style="
//     margin-right: 15px;
// "></li>
//     <li class="fas fa-download"></li>
    
// </div>
    }
    loader.classList.add('hidden')
    download = document.querySelectorAll('.fa-download');
    // console.log(download)
    download.forEach(Element => Element.addEventListener('click',async (e)=>{
      
      const value = e.target.previousElementSibling.lastElementChild.firstChild.innerText;
    
      fetch(`/filedownload/${value}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'CSRF-Token':token,
          
        },
        credentials: 'same-origin',
        body:JSON.stringify({'uid':uid})
      }).then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
    
        var a = document.createElement('a');
        a.href = url;
        a.download = value;
        document.body.appendChild(a); 
        a.click();    
        a.remove();  
    });
       
      
    
    }))

  })
  
  
  main_container.classList.add('invisible');
  upload_container.classList.add('invisible');
  files_container.classList.remove('invisible');  
  
    
})



// file sharing and multipart data code




     
     window.addEventListener("load", () => {
      var notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        }
      });
       

      // loader hiding after the windows loads

      loader.classList.add('hidden')

      // fetching csrf token for further request 

      //  send Data function for sending files in formdata 

      function sendData() {
          const XHR = new XMLHttpRequest();
          const FD = new FormData(form);
          XHR.addEventListener("load", function (event) {
            // alert(event.target.responseText);
            notyf.success(event.target.responseText);
          });
          XHR.addEventListener("error", function (event) {
            notyf.warning("Oops! Something went wrong.")
          });

          // progress data 
          XHR.upload.addEventListener("progress", ({loaded, total}) =>{ //file uploading progress event
            let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
            let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
            let fileSize;
            // if file size is less than 1024 then add only KB else convert this KB into MB
            (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
            let progressHTML = `<li class="row">
                                  <i class="fas fa-file-alt"></i>
                                  <div class="content">
                                    <div class="details">
                                      <span class="name">${fileInput.files.length} • Uploading</span>
                                      <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                      <div class="progress" style="width: ${fileLoaded}%"></div>
                                    </div>
                                  </div>
                                </li>`;
                            console.log(fileInput.files[0].name)
            uploadedArea.innerHTML = ""; //uncomment this line if you don't want to show upload history
            uploadedArea.classList.add("onprogress");
            progressArea.innerHTML = progressHTML;
            if(loaded == total){
              progressArea.innerHTML = "";
              let uploadedHTML = `<li class="row">
                                    <div class="content upload">
                                      <i class="fas fa-file-alt"></i>
                                      <div class="details">
                                        <span class="name">${fileInput.files.length} File(s) • Uploaded</span>
                                        <span class="size">${fileSize}</span>
                                      </div>
                                    </div>
                                    <i class="fas fa-check"></i>
                                  </li>`;
              uploadedArea.classList.remove("onprogress");
              // uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
              uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
            }
          });




          // end of progress function 




          XHR.open("POST", uploadURL);
          XHR.setRequestHeader('CSRF-Token',token)
          // console.log(token)
          XHR.send(FD);

        }

        // Access the form element...
        const form = document.getElementById("uploadForm");
        
        form.addEventListener('click',()=>{
          fileInput.click();
        });

        // ...and take over its submit event.
        fileInput.addEventListener("change",()=> {
          // event.preventDefault();
          console.log(fileInput.files)
          if(!fileInput.files[0]){
            notyf.warning("please select files ")

          }
          else{
            sendData();

          }
        });
      
      });
    
    
