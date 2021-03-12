const form = document.querySelector("form");
const loadingElement = document.querySelector(".loading");
const mewsElement = document.querySelector(".mews");
const API_URL =
  window.location.hostname === "local"
    ? "http://localhost:5000/mews"
    : "https://meower-api.now.sh";

loadingElement.style.display = ""; // shows loading gif on load

listAllMews();

form.addEventListener("submit", (event) => {
  event.preventDefault(); // keeps page from relaoding
  const formData = new FormData(form); // formData is method for JS - selects which form to grab from
  const name = formData.get("name"); // gets data inputted to name
  const content = formData.get("content"); // dets data inputted to conetent

  const mew = {
    // create object with form inputs
    name,
    content,
  };
  form.style.display = "none"; // hides form
  loadingElement.style.display = ""; // displays loading gif

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(mew),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdMew) => {
      console.log(createdMew);
      form.reset();
      setTimeout(() => {
        form.style.display = "";
        loadingElement.style.display = "none";
      }, 30000);
      listAllMews();
    });
});

function listAllMews() {
  mewsElement.innerHTML = "";
  fetch(API_URL)
    .then((response) => response.json())
    .then((mews) => {
      console.log(mews);
      mews.reverse();
      mews.forEach((mew) => {
        const div = document.createElement("div");

        const header = document.createElement("h3");
        header.textContent = mew.name;

        const contents = document.createElement("p");
        contents.textContent = mew.content;

        const date = document.createElement("small");
        date.textContent = new Date(mew.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);
        mewsElement.appendChild(div);
      });
      loadingElement.style.display = "none";
    });
}
