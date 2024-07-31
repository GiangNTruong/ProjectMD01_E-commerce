let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");
let form = document.querySelector("form");
// Show Password
let showPassword = document.querySelector("#show-password");
let showCfPassword = document.querySelector("#show-cfPassword");

let arrUser = JSON.parse(localStorage.getItem("user-data")) || [];
// const adminUser = {
//   id:Date.now(),
//     name: "Nguyễn Trường Giang",
//     email: "giangpc7@gmail.com",
//     password: "12345678", 
//     role: 0,
//     status :1,
//     card: [],
//   };
//   arrUser.push(adminUser);
//   localStorage.setItem("user-data", JSON.stringify(arrUser));


showCfPassword.addEventListener("click",()=>{
  if(showCfPassword.classList.contains("fa-eye")){
    showCfPassword.classList.remove("fa-eye");
    showCfPassword.classList.add("fa-eye-slash");
    confirmPassword.setAttribute("type", "text");
  }else{
    showCfPassword.classList.remove("fa-eye-slash");
    showCfPassword.classList.add("fa-eye");
    password.setAttribute("type", "password");
  }
})


showPassword.addEventListener("click",()=>{
  if(showPassword.classList.contains("fa-eye")){
    showPassword.classList.remove("fa-eye");
    showPassword.classList.add("fa-eye-slash");
    password.setAttribute("type", "text");
  }else{
    showPassword.classList.remove("fa-eye-slash");
    showPassword.classList.add("fa-eye");
    password.setAttribute("type", "password");
  }

  // showError.classList.toggle("fa-eye");
  // showError.classList.toggle("fa-eye-slash");
});


//THông báo khi lỗi
function showError(input,messeage){
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.add("error");
    small.innerText=messeage;
}
//THông báo khi thành công
function showSuccess(input){
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.remove("error");
    small.innerText="";
}

//check rỗng
function checkEmptyError(listInput){
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim();//Không được để khoảng trắng

        if(!input.value){
             isEmptyError = true;
            showError(input,"Không được để trống");

        }else{
            showSuccess(input);
        }
    });
    return isEmptyError;

}
//check Email
function checkEmailError(input){
  let regexEmail=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  input.value=input.value.trim();
  regexEmail.test(input.value);
  let checkEmail =regexEmail.test(input.value) ;
  if(checkEmail){
    showSuccess(input);
    return false;

  }else if (input.value == ""){
    showError(input,"Không được để trống");
   return true;
  }
  else{
    showError(input,"Email sai định dạng");
    return false;
  }

}
function checkLengthError(input, name, min, max){
  input.value = input.value.trim();
  if(input.value.length == 0){
    showError(input, `Không được để trống`);
    return true;
  }
  else if(input.value.length<min){
    showError(input, `${name} không được nhỏ hơn ${min} ký tự`);
    return true;
  } 
  else if(input.value.length>max){
    showError(input, `${name} không được lớn hơn ${max} ký tự`);
    return true;
  }else{
    showSuccess(input);
  return false;
  }

 
}

function checkCfPassword(password,confirmPassword){
  if(confirmPassword.value == ""){
    showError(confirmPassword,"Không được để trống");
  }
  else if(password.value !== confirmPassword.value){
    showError(confirmPassword,"Mật khẩu Không trùng khớp");
    return true;
  }else{
    showSuccess(confirmPassword);
    return false;
  }
  
}

form.addEventListener("submit",function(e){
    e.preventDefault();
   let checkEmpty = checkEmptyError([username, email, password, confirmPassword]);
   let checkEmail =  checkEmailError(email);
   let checkLengthUser =  checkLengthError(username,"username",6,20);
   let checkLengthPass = checkLengthError(password,"password",8,20);
   let checkcfPass =  checkCfPassword(password,confirmPassword);

   if(!checkEmpty &&!checkEmail &&!checkLengthUser &&!checkLengthPass &&!checkcfPass ){
    let arrUser = JSON.parse(localStorage.getItem("user-data")) || [];

    let objUser = {
      userId : Date.now(),
      name : username.value,
      email : email.value,
      password : password.value,
      role:1,
      status : 0,
      card: [],
    };
    let flag = false;
        for (let i = 0; i < arrUser.length; i++) {
            if (email.value === arrUser[i].email) {
                flag = true;
                break; // Exit the loop once email is found
            }
        }
        if(flag){
          Swal.fire({
            title : "Error!",
            text: "Đăng ký thật bại do trùng email !!!",
            icon: "error",
            confirmButtonText: "Cancel",
          });
        }else{
          arrUser.push(objUser);
          localStorage.setItem("user-data", JSON.stringify(arrUser));
      
          Swal.fire({
            position : "center",
            icon: "success",
            title: "Đăng ký thành công",
            showConfirmButton: false,
            timer:5500,
          }).then(() => (window.location.href ="login.html"));
        }
   }
});









// Làm register mới

