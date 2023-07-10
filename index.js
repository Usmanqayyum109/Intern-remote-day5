function deleteItem(itemId) {
  const card = document.getElementById(itemId);
  card.remove();
}

fetch("https://fakestoreapi.com/products")
  .then((res) => {
    return res.json();
  })

  .then((json) => {
    let data1 = "";
    json.map((item) => {
      data1 += `
        <div class="card" id="${item.id}">
          <h1 class="title">${item.title}</h1>
          <img src="${item.image}" alt="" class="images">
          <p>${item.description}</p>
          <h3 class="category">${item.category}</h3>
          <h2 class="price"><strong>$${item.price} USD</strong></h2>
          <button class="btn" onclick="deleteItem(${item.id})">Delete</button>
        </div>`;
      document.getElementById("cards").innerHTML = data1;
    });
  })
  .catch((error) => console.log(error));

var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  var title1 = document.getElementById("title").value;
  var fileInput = document.getElementById("image");

  fileInput.addEventListener("change", (e) =>
    doSomethingWithFiles(e.target.files)
  );
  var category1 = document.getElementById("category").value;
  var price1 = document.getElementById("price").value;

  console.log(title1);

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify({
      title: title1,
      image: fileInput,
      category: category1,
      price: parseInt(price1),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById(
        "cards2"
      ).innerHTML = `<div class="card" id="${data.id}">
      <h1 class="title">${data.title}</h1>
      <img src="${data.fileInput}" alt="" class="images">
      <p>${data.description}</p>
      <h3 class="category">${data.category}</h3>
      <h2 class="price"><strong>$${data.price} USD</strong></h2>
      <button class="btn" onclick="deleteItem(${data.id})">Delete</button>
    </div>`;
    });
});
