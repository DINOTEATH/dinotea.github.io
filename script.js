// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");

const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    Swal.fire({

  icon: "error",
  title: `${title}`,
  text: "สินค้ามีอยู่เเล้วในรถเข็น!"
});
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    Swal.fire({
  icon: "error",
  title: "ผิดพลาด!",
  text: "ไม่พบสินค้าในรถเข็น!",
});
    return;
  }
const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  Swal.fire({

  icon: "success",
  title: "สำเร็จ!",
  text: "การสั่งซื้้อสำเร็จ!",
});
  itemsAdded = [];

  update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("฿", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  // or you can use also
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "฿" + total;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

var th = {
  menu_navbar: "เมนู",
  menu_home: "หน้าแรก",
  menu_about: "เกี่ยวกับ",
  menu_contact: "ติดต่อ",
  txt_hello: "สวัสดีวันจันทร์",
  btn_language: "ภาษา : ไทย",
  thai_tea: "ชาไทย",
  cocoa_milk: "โกโก้",
  mint_chocolate: "ช็อกโกเเล็ตมินท์",
  product_list: "รายการสินค้า",
  add_to_cart: "เพิ่มใส่รถเข็น",
  add_to_cart2: "เพิ่มใส่รถเข็น",
  add_to_cart3: "เพิ่มใส่รถเข็น",
  add_to_cart4: "เพิ่มใส่รถเข็น",
  add_to_cart5: "เพิ่มใส่รถเข็น",
  p1: "คุณสามารถซื้อ   ",
  p2: "ชาหรือกาเเฟตามทีคุณต้องการได้",
  p3: "มันรสชาติดีมาก",
  title: "ชาที่ดีสำหรับคุณ",
  your_cart: "รถเข็นของคุณ",
  total: "ทั้งหมด",
  buy: "ซื้อตอนนี้",
  learn_more: "เรียนรู้เพิ่มเติม",
  taiwanese_milk_tea: "ชานมไต้หวัน",
  sp: "ค้นหาสินค้า",
  creator: "ผู้สร้าง",
  name: "นาย กน็อคอาชีวะ",
};
var en = {
  menu_navbar: "Navbar",
  menu_home: "Home",
  menu_about: "About",
  menu_contact: "Contact",
  txt_hello: "Hello world",
  btn_language: "Language : EN",
  thai_tea: "Thai Tea",
  cocoa_milk: "Cocoa Milk",
  mint_chocolate: "Mint Chocolate",
  product_list: "Product List",
  add_to_cart: "Add To Cart",
  add_to_cart2: "Add To Cart",
  add_to_cart3: "Add To Cart",
  add_to_cart4: "Add To Cart",
  add_to_cart5: "Add To Cart",
  p1: "You can buy   ",
  p2: "tea or coffee as you wish.",
  p3: "It tastes delicious",
  title: "Good tea for you",
  your_cart: "Your Cart",
  total: "Total",
  buy: "Buy Now",
  learn_more: "Learn More",
  taiwanese_milk_tea: "Taiwanese Milk Tea",
  sp: "Search Products",
  creator: "Creator",
  name: "Mr. Kanock Archeewa",
};

function renderlang() {
  if (!localStorage.lang) {
    localStorage.setItem("lang", "en");
  } else {
    $("#menu_navbar").text(settext("menu_navbar"));
    $("#menu_home").text(settext("menu_home"));
    $("#menu_about").text(settext("menu_about"));
    $("#menu_contact").text(settext("menu_contact"));
    $("#txt_hello").text(settext("txt_hello"));
    $("#btn_language").text(settext("btn_language"));
    $("#thai_tea").text(settext("thai_tea"));
    $("#cocoa_milk").text(settext("cocoa_milk"));
    $("#mint_chocolate").text(settext("mint_chocolate"));
    $("#product_list").text(settext("product_list"));
    $("#add_to_cart").text(settext("add_to_cart"));
    $("#add_to_cart2").text(settext("add_to_cart2"));
    $("#add_to_cart3").text(settext("add_to_cart3"));
    $("#add_to_cart4").text(settext("add_to_cart4"));
    $("#add_to_cart5").text(settext("add_to_cart5"));
    $("#p1").text(settext("p1"));
    $("#p2").text(settext("p2"));
    $("#p3").text(settext("p3"));
    $("#title").text(settext("title"));
    $("#your_cart").text(settext("your_cart"));
    $("#total").text(settext("total"));
    $("#buy").text(settext("buy"));
    $("#learn_more").text(settext("learn_more"));    
    $("#taiwanese_milk_tea").text(settext("taiwanese_milk_tea"));
    $("#sp").text(settext("sp"));
    $("#creator").text(settext("creator"));
    $("#name").text(settext("name"));
  }
}

function settext(key) {
  if (localStorage.lang == "en") {
    return en[key];
  } else {
    return th[key];
  }
}

function togglelang() {
  if (localStorage.lang == "en") localStorage.setItem("lang", "th");
  else if (localStorage.lang == "th") localStorage.setItem("lang", "en");

  renderlang();
  return "now language: " + localStorage.lang;
}

renderlang()

const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("shop-content")
    const product = document.querySelectorAll(".product-box")
    const pname = document.getElementsByTagName("h2")
    
    for(var i=0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('h2')[0]
        
        if(match){
           let textvalue = match.textContent || match.innerHTML
           
           if(textvalue.toUpperCase().indexOf(searchbox) > -1) {
               product[i].style.display = "";
           }else{
               product[i].style.display = "none";               
           }
          }
       }
    }