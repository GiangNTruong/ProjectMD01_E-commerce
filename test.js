let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle("active");
    navbar.classList.remove('active');
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
}

let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
    shoppingCart.classList.toggle("active");
    loginForm.classList.remove("active");
    searchForm.classList.remove("active");
    navbar.classList.remove('active');
}

let loginForm = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
    loginForm.classList.toggle("active");
    shoppingCart.classList.remove("active");
    searchForm.classList.remove("active");
    navbar.classList.remove('active');
}

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
    searchForm.classList.remove("active");
}

window.onscroll = () =>{
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
    searchForm.classList.remove("active");
    navbar.classList.remove('active');
}

// var swiper = new Swiper(".product-slider", {
//     loop:true,
//     spaceBetween: 20,
//     autoplay: {
//         delay: 7500,
//         disableOnInteraction: false,
//     },
//     centeredSlides: true,
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1020: {
//         slidesPerView: 5,
//       },
//     },
//   });

  var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 5,
      },
    },
  });












  //Lưu ý .....................................................................
const dataProduct = document.querySelector("#data");
const aLogin = document.querySelector(".register-link");
const emailInput = document.querySelector("#email-login");
const passwordInput = document.querySelector("#password-login");
const useLocal = JSON.parse(localStorage.getItem("user-data")) || [];

const listProduct = JSON.parse(localStorage.getItem("data-product"))  ;

//list Cart
const listCart = JSON.parse(localStorage.getItem("listCart")) ||[];
const total = document.querySelector(".total");
const cart = document.querySelector(".shopping-cart");


loginForm.addEventListener("submit", (e) =>{
  e.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value.trim();
  const findUserByEmail = useLocal.find((user) => user.email === emailValue);
  const findUserByPassword = useLocal.find((user) => user.password === passwordValue);

  if(findUserByEmail && findUserByPassword){
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


aLogin.addEventListener("click", e => {
  console.log("Regis");
  window.location.href = "./pages/login/HTML/Register.html";
})

function renderProducts() {
  const products = JSON.parse(localStorage.getItem("data-product")) || [];
  let html = '';
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    html += `
      <div class="swiper-slide box"> <img src="${product.img}" alt="" />
        <h3>${product.productName}</h3>
        <div class="price">$${product.price}</div>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
        </div>
        <button class="btn" onclick="addToCart(${i})">add to cart</button>
      </div>
    `;
  }
  dataProduct.innerHTML = html;

  // Initialize Swiper after product slides are rendered
  var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 5,
      },
    },
  });
}

renderProducts();


function renderCategory (){
    const date= document.getElementById("dataCategory");
    const categorys = JSON.parse(localStorage.getItem("data-category")) || [];
    let html = '';
    for (let i = 0; i < categorys.length; i++) {
      const category = categorys[i];
      html +=`
      <div class="box">
          <img src="${category.img}" alt="" />
          <h3>${category.name}</h3>
          <p>${category.discount}</p>
          <a href="#" class="btn">shop now</a>
        </div>
      `
      date.innerHTML =html;
    
    }
}
renderCategory();



function loginSuccess() {
  let loginForm = document.querySelector(".login-form");
  // let h3Login = document.querySelector(".login-form h3");
  let keyLocal = JSON.parse(localStorage.getItem("key")) ;
  if(keyLocal && keyLocal.Id){
    loginForm.innerHTML = `
    <h3>${keyLocal.name}</h3>
    <span style="font-size: 24px; margin-right: 10px;" >
      <i class="fa-solid fa-right-from-bracket" onclick = "logOut()"></i>
    </span>
    `
  }
}
loginSuccess();

function logOut(){
  localStorage.removeItem("key");
  window.location.href ="http://127.0.0.1:5501/session%2027%20-%20project/pages/login/HTML/Login.html"
}


//Shopping cart
// [null, null, null, {}]
// ... spread operater
function addToCart(index) {
  //   console.log(index);
  if (listCart[index] == null) {
    listCart[index] = { ...listProduct[index], quantity: 1 };
  } else {
    listCart[index].quantity += 1;
  }
  localStorage.setItem("listCart", JSON.stringify(listCart));
  renderCart();
}

const products = document.querySelector("#products");


function renderCart() {
  let cartHTML = '';
  let totalCount = 0;
  for (let i = 0; i < listCart.length; i++) {
    const cartItem = listCart[i];
    if (cartItem != null) {
      
      cartHTML += `
        <div class="box">
          <i class="fas fa-trash" onclick="removeFromCart(${i})"></i>
          <img src="${cartItem.img}" alt="" />
          <div class="content">
            <h3>${cartItem.productName}</h3>
            <span class="price">$${cartItem.price}</span>
            <div >
              <button style="background-color: #EEEEEE; border: none; color: #120F40; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;" onmouseover="this.style.backgroundColor='#FF6F00'; this.style.color='#FFFFFF';" onmouseout="this.style.backgroundColor='#EEEEEE'; this.style.color='#120F40';" onclick="quantityProduct(${i}, ${cartItem.quantity - 1})">-</button>
              <span class="quantity" style="margin: 0 10px;">qty : ${cartItem.quantity}</span>
              <button style="background-color: #EEEEEE; border: none; color: #120F40; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px;" onmouseover="this.style.backgroundColor='#FF6F00'; this.style.color='#FFFFFF';" onmouseout="this.style.backgroundColor='#EEEEEE'; this.style.color='#120F40';" onclick="quantityProduct(${i}, ${cartItem.quantity + 1})">+</button>
            </div>
          </div>
        </div>
      `;
      totalCount += cartItem.price * cartItem.quantity;
    }
  }
  products.innerHTML = cartHTML;
  total.textContent = "total : $" + totalCount;
}
renderCart()

function removeFromCart(index) {
  listCart[index] = null;
  localStorage.setItem("listCart", JSON.stringify(listCart));
  renderCart();
}

function quantityProduct(index, quantity) {
  if (quantity <= 0) {
    delete listCart[index];
  } else {
    listCart[index].quantity = quantity;
  }
  localStorage.setItem("listCart", JSON.stringify(listCart));
  renderCart();
}
