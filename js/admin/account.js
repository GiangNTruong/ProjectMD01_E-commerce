// Lấy phần tử tbody từ bảng
const tbodyTableAccount = document.querySelector("#data-account");

// Khởi tạo mảng userLocal từ localStorage hoặc mảng rỗng nếu không có dữ liệu
let userLocal = JSON.parse(localStorage.getItem("user-data")) || [];
// Lọc ra những user không phải admin
userLocal = userLocal.filter(user => user.role !== 0);
// Khởi tạo trang hiện tại
let currentPage = 1;
const usersPerPage = 3;

// Hàm renderUser để hiển thị danh sách người dùng
function renderUser() {
  let html = "";
  let start = (currentPage - 1) * usersPerPage;
  let end = start + usersPerPage;
  
  // Khởi tạo biến đếm số thứ tự
  let count = 1;

  for (let i = start; i < end; i++) {
    if (i < userLocal.length) {
      const user = userLocal[i];
      html += `
        <tr>
          <td>${count}</td> <!-- Sử dụng biến count thay cho i + 1 -->
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td id="status_${user.userId}">${user.status === 1 ? "đang hoạt động" : "ngưng hoạt động"}</td>
          <td>
            <div class="btn-func-group">
              <button class="btn-icon" id="statusButton${user.userId}" onclick="toggleStatus('${user.userId}')">
                ${user.status === 1
                  ? '<i class="fa-solid fa-unlock"></i>'
                  : '<i class="fa-solid fa-lock"></i>'}
              </button>
            </div>
          </td>
        </tr>
      `;
      // Tăng biến đếm lên sau mỗi lần lặp
      count++;
    }
  }

  // Cập nhật HTML của tbody
  tbodyTableAccount.innerHTML = html;
}

// Hàm toggleStatus để thay đổi trạng thái của người dùng
function toggleStatus(userId) {
  const user = userLocal.find(user => user.userId == userId);
  const statusButton = document.getElementById(`statusButton${userId}`);
  if (user.status === 1) {
    statusButton.innerHTML = '<i class="fa-solid fa-lock"></i>';
    Swal.fire('Thành công!', 'Người dùng đã được khóa.', 'success');
    user.status = 0;
  } else {
    statusButton.innerHTML = '<i class="fa-solid fa-unlock" style="color: red"></i>';
    Swal.fire('Thành công!', 'Người dùng đã được mở khóa.', 'success');
    user.status = 1;
  }

  // Cập nhật lại localStorage với dữ liệu mới
  localStorage.setItem("user-data", JSON.stringify(userLocal));
  // Gọi lại hàm renderUser để cập nhật giao diện
  renderUser();
}

// Hàm để tạo nút phân trang
function createPagination() {
  const pagination = document.querySelector("#pagination");
  let html = "";
  let totalPage = Math.ceil(userLocal.length / usersPerPage);
  
  for (let i = 1; i <= totalPage; i++) {
    html += `<button onclick="changePage(${i})" style="background: gray; color: white; margin: 10px; height: 30px; width: 20px ;border:none;" onmouseover="this.style.background='black';" onmouseout="this.style.background='gray';">${i}</button>`;
  }
  
  pagination.innerHTML = html;
}

// Hàm để thay đổi trang hiện tại
function changePage(page) {
  currentPage = page;
  renderUser();
}
// Hàm để thay đổi trang hiện tại
function changePage(page) {
  currentPage = page;
  renderUser();
  createPagination(); // Gọi lại hàm createPagination để cập nhật nút phân trang
}
// Gọi hàm renderUser lần đầu để hiển thị danh sách người dùng
renderUser();
// Gọi hàm createPagination lần đầu để tạo nút phân trang
createPagination();

let searchInputAccount = document.querySelector("#searchInputAccount");
searchInputAccount.addEventListener("input",(e)=>{
  let inputValue =  e.target.value.toLowerCase().trim();
  if(inputValue){
    const filterUsers = userLocal.filter((user) => {
      return user.name.toLowerCase().includes(inputValue);
     
    });
    userLocal = filterUsers;
  renderUser();
  }
  else{
    userLocal.push(...JSON.parse(localStorage.getItem("user-data")));
    renderUser();
  }
})


function sum (a,b){
  let sum= a+b;
  return sum;
}
console.log(sum(1,2));