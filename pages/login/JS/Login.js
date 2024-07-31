let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let formLogin = document.querySelector("#formLogin");

let useLocal = JSON.parse(localStorage.getItem("user-data")) || [];

// Tạo các phần tử để hiển thị thông báo lỗi
let emailError = document.createElement('div');
let passwordError = document.createElement('div');

formLogin.addEventListener("submit", (e) =>{
    e.preventDefault();

    let emailValue = emailInput.value.trim();
    let passwordValue = passwordInput.value.trim();

    const findUserByEmail = useLocal.find((user) => user.email === emailValue);
    const findUserByPassword = useLocal.find((user) => user.password === passwordValue);

    // Xóa thông báo lỗi cũ
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';

    if(!findUserByEmail){
        // Thông báo lỗi nếu không tìm thấy email
        document.getElementById('emailError').innerHTML = "Email không tồn tại trong hệ thống. Vui lòng kiểm tra lại.";
    } else if (!findUserByPassword) {
        // Thông báo lỗi nếu không tìm thấy mật khẩu
        document.getElementById('passwordError').innerHTML = "Mật khẩu không chính xác. Vui lòng kiểm tra lại.";
    } else {
        // Tạo đối tượng key với id và tên người dùng
        const key = {
            Id : Date.now(),
            name : findUserByEmail.name,
        }

        // Lưu đối tượng key vào localStorage
        localStorage.setItem('key', JSON.stringify(key));

        if(findUserByEmail.role === 0){
            // Chuyển vào trang admin
            window.location.href = "http://127.0.0.1:5501/session%2027%20-%20project/pages/admin/account.html";
        } else {
            // Chuyển vào trang chủ của người dùng
            window.location.href = "http://127.0.0.1:5501/session%2027%20-%20project/index.html";
        }
    }
});

