// import uplod from "../../untils/firebase.config.js"

// lấy từ id product
let formAddProduct = document.querySelector("#formAddProduct");
let btnOpenForm = document.querySelector("#btnOpenForm");
let iconCloseForm = document.querySelector("#iconCloseForm");
let listCategory = document.querySelector("#listCategory");
let quantityInput = document.querySelector("#quantity");
let productNameInput =document.querySelector("#productName");
let imgProduct = document.querySelector("#file");
let priceProduct = document.querySelector("#price");
let discountProduct = document.querySelector("#discount");
let descriptionProduct = document.querySelector("#description");
let btnAddProduct = document.querySelector("#btnAddProduct");
let tbodyTable = document.querySelector("#data-product");
let categoryValue ="";
let editedProductIndex = -1;
//lấy từ local 
let categories = JSON.parse(localStorage.getItem("data-category")) || [];


function closeForm (){
    formAddProduct.style.display = "none";
}
function openForm (){
    formAddProduct.style.display = "flex";
}

btnOpenForm.addEventListener("click" , () =>{
    openForm ();
});
iconCloseForm.addEventListener("click" , () =>{
    closeForm();
});
btnCloseForm.addEventListener("click" ,  () => {
    closeForm();
});
//dùng để render vào danh sách danh mục form từ category ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function renderCategories (){
    const optionHtmls = categories.map(cat=>{
        return `
        <option value =${cat.id}>${cat.name}</option>
        `;
    });

    //Ép kiểu từ mảng thành chuỗi HTML
    const optionHtml = optionHtmls.join("");

    // Append vào DOM
    listCategory.innerHTML = optionHtml;
}
renderCategories();
//Lấy giá trị trong danh mục sản phẩm
listCategory.addEventListener("change", (e) =>{
    categoryValue = e.target.value;
})
//Bắt sự kiện submit form
formAddProduct.addEventListener("submit" ,(e) =>{
 e.preventDefault();
 //Tạo đối tượng newProduct
 const newProduct = {
    productId : Date.now(),
    productName :productNameInput.value,
    img :imgProduct.value,
    price:priceProduct.value,
    quantity : quantityInput.value,
    listCategory :listCategory.value,
    discount:discountProduct.value,
 }
let products = JSON.parse(localStorage.getItem("data-product"))||[];
//cập nhật
if (editedProductIndex !== -1) {
    products[editedProductIndex] = newProduct; // Đã sửa ở đây
    editedProductIndex = -1;
    btnAddProduct.textContent = "Thêm";
    formAddProduct.style.display = "none"; // Ẩn form sau 
} else {
    products.push(newProduct);
  }
  localStorage.setItem("data-product", JSON.stringify(products))|| [];
  rendernewProduct();
  resetForm();
});
//reset
function resetForm() {
    productNameInput.value="";
    quantityInput.value="";
    imgProduct.value="";
    priceProduct.value="";
    discountProduct.value="";
  }
//render dữ liệu lên bảng
function rendernewProduct() {
  const products = JSON.parse(localStorage.getItem("data-product")) || [];
  let html = "";

  for (let i = 0; i < products.length; i++) {
    const newProduct = products[i];

    // Find the corresponding category (handle potential missing category)
    const category = categories.find(cat => cat.id.toString() === newProduct.listCategory);

    // Render product details (use default category name if missing)
    const categoryName = category ? category.name : "**Category Not Found**"; // Informative default
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${newProduct.productName}</td>
        <td><img src="${newProduct.img}" alt="Project Image" width="50" height="50"></td>
        <td>$${newProduct.price}</td>
        <td>${newProduct.quantity}</td>
        <td>${categoryName}</td> <td>${newProduct.discount}%</td>
        <td>
          <button class="button button-primary" onclick="editProduct(${i})">Sửa</button>
          <button class="button button-primary" onclick="deleteProduct(${i})">Xóa</button>
        </td>
      </tr>
    `;
  }

  tbodyTable.innerHTML = html;
}
rendernewProduct();

   // nút xóa
   window.deleteProduct = function(index) {
    const products = JSON.parse(localStorage.getItem("data-product"));
    products.splice(index, 1);
    localStorage.setItem("data-product", JSON.stringify(products));
    rendernewProduct();
}


//sửa
window.editProduct = function(index) {
    const products = JSON.parse(localStorage.getItem("data-product"));
    productNameInput.value=products[index].productName;
    quantityInput.value=products[index].quantity;
    imgProduct.value=products[index].img;
    priceProduct.value=products[index].price;
    discountProduct.value=products[index].discount;
   
    //
    editedProductIndex = index;
    btnAddProduct.textContent = "Cập nhật"; 
    formAddProduct.style.display = "flex"; 
    rendernewProduct();
  }