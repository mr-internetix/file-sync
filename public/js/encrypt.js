
const fileInput=document.querySelector("#fileinput");
const submitBtn=document.querySelector('#submit'); 


// const host="";

const uploadURL=`/api/encrypt`;


submitBtn.addEventListener("click",()=>{
    if(fileInput.files){
        uploadfile()
    }
})



const uploadfile=()=>{

    const password = document.getElementById('pass').value;

    const files=fileInput.files[0];
    const fileName = files.name;

    const formData=new FormData()
    formData.append("myfile",files)
    formData.append("password",password)


    fetch(uploadURL, {
        method: 'post',
          credentials: 'same-origin',
        body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
      var url = window.URL.createObjectURL(blob);
  
      var a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a); 
      a.click();    
      a.remove();  
    });
    
};


