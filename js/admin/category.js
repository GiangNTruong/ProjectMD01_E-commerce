const btnOpenFromCategory = document.querySelector("#btnOpenForm");
const formAddCategory = document.querySelector("#formAddCategory");
const iconCloseForm = document.querySelector("#iconCloseForm");
const btnCloseForm = document.querySelector("#btnCloseForm");
const categoryNameInput = document.querySelector("#categoryName");
const imgInput = document.querySelector("#file");
const categoryDiscount = document.querySelector("#categoryDiscount");
const btnAddCategory = document.querySelector("#btnAddCategory");
const fadeDown = document.querySelector(".fadeDown.form-add-category");

const tbodyTable=document.querySelector("#data-category");
// Theo dõi chỉ mục sản phẩm được chỉnh sửa
let editedCategoryIndex = -1;


//Hàm thêm mới form
function handleOpenForm(){
    formAddCategory.style.display = "flex";
    //Khi mở form thì mặc định nó sẽ focus vào input thêm mới danh mục
categoryNameInput.focus();
}
//Lắng nghe sự kiện khi click vào button thêm mới danh mục
btnOpenFromCategory.addEventListener("click", ()=> {
 handleOpenForm();
})
//Hàm đóng form thêm mới
function handleCloseForm(){
    formAddCategory.style.display ="none";
    
};
//Đóng form khi click vào close
iconCloseForm.addEventListener("click",()=>{
    handleCloseForm();
})
//Đóng form khi click vào button Hủy
btnCloseForm.addEventListener("click" ,()=>{
    handleCloseForm();
});


// local bắt sự kiện 
fadeDown.addEventListener("submit",(e) =>{
    e.preventDefault();

    const category = {
        id:Date.now(),
        name:categoryNameInput.value,
        img: imgInput.value,
        discount :categoryDiscount.value,
    }
    let categorys = JSON.parse(localStorage.getItem("data-category")) || [];
    
    //cập nhật
    if (editedCategoryIndex !== -1) {
        categorys[editedCategoryIndex] = category; // Đã sửa ở đây
        editedCategoryIndex = -1;
        btnAddCategory.textContent = "Thêm";
        formAddCategory.style.display = "none"; // Ẩn form sau 
    } else {
        categorys.push(category);
      }
      localStorage.setItem("data-category", JSON.stringify(categorys))|| [];
      renderCategorys();
      resetForm();
});


//render dữ liệu lên bảng
function renderCategorys() {
    const categorys  = JSON.parse(localStorage.getItem("data-category")) || [];
    let html = "";
    for (let i = 0; i < categorys.length; i++) {
      const category = categorys[i];
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${category.name}</td>
          <td><img src="${category.img}" alt="Project Image" width="50" height="50"></td>
          <td>${category.discount}</td>
          <td>
            <button class="button button-primary" onclick="editCategory(${i})">Sửa</button>
            <button class="button button-primary" onclick="deleteCategory(${i})">Xóa</button>
          </td>
        </tr>
      `;
    }
    tbodyTable.innerHTML = html;
  }
  renderCategorys();


//reset
function resetForm() {
    categoryNameInput.value = "";
    imgInput.value = "";
    categoryDiscount.value = "";
  }




  // nút xóa
  window.deleteCategory = function(index) {
    const categorys = JSON.parse(localStorage.getItem("data-category"));
    categorys.splice(index, 1);
    localStorage.setItem("data-category", JSON.stringify(categorys));
    renderCategorys();
}


//sửa
window.editCategory = function(index) {
    const categorys = JSON.parse(localStorage.getItem("data-category"));
    categoryNameInput.value = categorys[index].name;
    imgInput.value = categorys[index].img;
    categoryDiscount.value = categorys[index].discount;
    editedCategoryIndex = index;
    btnAddCategory.textContent = "Cập nhật"; 
    formAddCategory.style.display = "flex"; 
    renderCategorys();
  }


