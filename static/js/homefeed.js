function addFeedItem(gameInfo) { 
    let row = document.getElementById("homeFeed");

    // div class = col
    let child = row.appendChild(document.createElement("div"));
    child.classList.add("col");

    // div class = card
    child = child.appendChild(document.createElement("div"));
    child.classList.add("card");
    child.classList.add("shadow-sm");

    // img
    let part = child.appendChild(document.createElement("img"));
    part.src = "images/" + gameInfo["keyImage"];

    // div class = card-body
    child = child.appendChild(document.createElement("div"));
    child.classList.add("card-body");
    child.classList.add("bg-darker");

    // div class = card-text
    part = child.appendChild(document.createElement("p"));
    part.classList.add("card-text");
    part.classList.add("text-white");
    part.innerText = gameInfo["adPhrase"];

    // div class = d-flex
    child = child.appendChild(document.createElement("div"));
    child.classList.add("d-flex");
    child.classList.add("justify-content-between");
    child.classList.add("align-items-center");

    // button
    part = child.appendChild(document.createElement("button"));
    part.setAttribute("type", "button");
    part.classList.add("btn");
    part.classList.add("btn-sm");
    part.classList.add("btn-outline-info");
    part.setAttribute("onclick", "location.href='game?gameID=" + gameInfo["id"] + "'");
    part.innerText = "Посмотреть";

    // div
    child = child.appendChild(document.createElement("div"));
    child.classList.add("d-flex");

    //white text
    part = child.appendChild(document.createElement("small"));
    part.classList.add("text-white");
    part.innerText = (gameInfo["globalScore"] / gameInfo["scoreCount"]) + "%";

    //svg setup
    child = child.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    child.classList.add("mx-1");
    child.setAttributeNS(null,"width", 12);
    child.setAttributeNS(null,"height", 22);
    child.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/2000/svg");
    child.setAttributeNS(null, "fill", "#ffc107");
    child.setAttributeNS(null, "stroke", "#ffc107");
    child.setAttributeNS(null, "viewBox", "19 19 460 425");

    // path heart
    child = child.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    child.setAttributeNS(null, "fill-rule", "evenodd");
    child.setAttributeNS(null, "clip-rule", "evenodd");
    child.setAttributeNS(null, "d", "M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z");
}

function addCartItem(gameInfo) { 
    let row = document.getElementById("homeFeed");

    // div class = col
    let child = row.appendChild(document.createElement("div"));
    child.classList.add("col");

    // div class = card
    child = child.appendChild(document.createElement("div"));
    child.classList.add("card");
    child.classList.add("shadow-sm");

    // img
    let part = child.appendChild(document.createElement("img"));
    part.src = "images/" + gameInfo["keyImage"];

    // div class = card-body
    child = child.appendChild(document.createElement("div"));
    child.classList.add("card-body");
    child.classList.add("bg-darker");

    // div class = card-text
    part = child.appendChild(document.createElement("p"));
    part.classList.add("card-text");
    part.classList.add("text-white");
    part.innerText = gameInfo["adPhrase"];

    // div class = d-flex
    child = child.appendChild(document.createElement("div"));
    child.classList.add("d-flex");
    child.classList.add("justify-content-between");
    child.classList.add("align-items-center");

    // button
    part = child.appendChild(document.createElement("button"));
    part.setAttribute("type", "button");
    part.classList.add("btn");
    part.classList.add("btn-sm");
    part.classList.add("btn-outline-info");
    part.innerText = "Убрать";
    part.onclick = function() {
        removeCookie("gameCart", gameInfo["id"], 14);
        location.reload();
    }

    // div
    child = child.appendChild(document.createElement("div"));
    child.classList.add("d-flex");

    //white text
    part = child.appendChild(document.createElement("small"));
    part.classList.add("text-white");
    part.innerText = (gameInfo["globalScore"] / gameInfo["scoreCount"]) + "%";

    //svg setup
    child = child.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
    child.classList.add("mx-1");
    child.setAttributeNS(null,"width", 12);
    child.setAttributeNS(null,"height", 22);
    child.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/2000/svg");
    child.setAttributeNS(null, "fill", "#ffc107");
    child.setAttributeNS(null, "stroke", "#ffc107");
    child.setAttributeNS(null, "viewBox", "19 19 460 425");

    // path heart
    child = child.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    child.setAttributeNS(null, "fill-rule", "evenodd");
    child.setAttributeNS(null, "clip-rule", "evenodd");
    child.setAttributeNS(null, "d", "M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z");

    // cashOutInfo update
    document.getElementById("checkOutInfo").innerText += gameInfo["name"].padEnd(72 - ('' + gameInfo["price"]).length) + gameInfo["price"] + " ₽\n";
    return gameInfo["price"];
}
