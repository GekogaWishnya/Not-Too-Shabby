function addCaruselItem(index, gameInfo) {
    let list = document.getElementById("carouselList");

    let child = list.appendChild(document.createElement("div"));
    child.classList.add("carousel-item");
    if (index == 0) { child.classList.add("active"); }

    let part = child.appendChild(document.createElement("img"));
    part.src = "/images/" + gameInfo["keyImage"];

    child = child.appendChild(document.createElement("div"));
    child.classList.add("container");

    child = child.appendChild(document.createElement("div"));
    child.classList.add("carousel-caption");
    child.classList.add("text-start");

    part = child.appendChild(document.createElement("h1"));
    part.innerText = gameInfo["name"];

    part = child.appendChild(document.createElement("p"));
    part.innerText = gameInfo["catchPhrase"];

    child = child.appendChild(document.createElement("p"));

    child = child.appendChild(document.createElement("a"));
    child.classList.add("btn");
    child.classList.add("btn-lg");
    child.classList.add("btn-primary");
    child.setAttribute("href", "game?gameID=" + gameInfo["id"]);
    child.innerText = "Играть";

    let buttons = document.getElementById("carouselButtons");

    child = buttons.appendChild(document.createElement("button"));
    if (index == 0) {
        child.classList.add("active");
        child.setAttribute("aria-current", "true");
    }

    child.setAttribute("type", "button");
    child.setAttribute("data-bs-target", "#featuredCarusel");
    child.setAttribute("data-bs-slide-to", index);
    child.setAttribute("aria-label", "Slide " + index);
}

function addCaruselGamePageTitle(gameInfo) {
    let container = document.getElementById("gameShowcaseTitle");

    let child = container.appendChild(document.createElement("div"));
    child.classList.add("carousel-caption");
    child.classList.add("text-start");

    part = child.appendChild(document.createElement("h1"));
    part.innerText = gameInfo["name"];

    part = child.appendChild(document.createElement("p"));
    part.innerText = gameInfo["catchPhrase"];

    child = child.appendChild(document.createElement("p"));

    child = child.appendChild(document.createElement("button"));
    child.classList.add("btn");
    child.classList.add("btn-lg");

    let gameCart = getCookie("gameCart");
    gameCart = gameCart.split(":");

    if (gameCart.length > 0 && gameCart.includes('' + gameInfo["id"])) {
        child.classList.add("btn-info");
        child.innerText = "В корзине"
        child.onclick = function() {
            location.href = "checkout";
        }

    } else {
        const userID = getCookie("userID");

        $.ajax({
            url: "/db",
            data: { 
                "query": "SELECT id FROM libraries WHERE userID = ? AND gameID = ?", 
                "parameters": [userID, gameInfo["id"]]
            },
            cache: false,
            type: "POST",
            success: function(response) {
              if (response[0]) {
                child.classList.add("btn-success");
                child.innerText = "В библиотеке";
                child.onclick = function() {
                    location.href = "profile";
                }

              } else {
                child.classList.add("btn-warning");
                child.innerText = gameInfo["price"] + "₽";
                child.onclick = function() {
                    addCookie("gameCart", gameInfo["id"], 14);
                    location.reload();
                }
              }
            },
            error: function(xhr) { }
          });
    }
}

function addCaruselGamePageItem(gameInfo) {
    let list = document.getElementById("carouselList");

    let child = list.appendChild(document.createElement("div"));
    child.classList.add("carousel-item");
    child.classList.add("active");

    let part = child.appendChild(document.createElement("img"));
    part.src = "images/" + gameInfo["keyImage"];

    child = child.appendChild(document.createElement("div"));
    child.classList.add("container");

    let buttons = document.getElementById("carouselButtons");

    child = buttons.appendChild(document.createElement("button"));
    child.classList.add("active");
    child.setAttribute("aria-current", "true");

    child.setAttribute("type", "button");
    child.setAttribute("data-bs-target", "#gameShowcaseCarusel");
    child.setAttribute("data-bs-slide-to", 0);
    child.setAttribute("aria-label", "Slide 0");
}
