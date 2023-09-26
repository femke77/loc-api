var resultsEl = document.querySelector(".results");

function getParams() {
  var paramsArr = document.location.search.split("&");
  console.log(paramsArr);

  var query = paramsArr[0].split("=").pop();
  var media = paramsArr[1].split("=").pop();
  console.log(query, media);
  searchLocApi(query, media);
}

function searchLocApi(query, media) {
  var apiUrl = "https://www.loc.gov/search/?fo=json";

  if (media) {
    apiUrl = "https://www.loc.gov/" + media + "/?fo=json";
  }

  apiUrl = apiUrl + "&q=" + query;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data.results) {
        resultsEl.textContent = "Sorry, No Results Found. 😔";
      } else {
        console.log(data);
        resultsEl.innerHTML = "";
        for (let i = 0; i < data.results.length; i++) {
          printResults(data.results[i], data.search.query);
        }
      }
    });
}

function printResults(result, query) {
  console.log(result);

  document.getElementById("search-term").textContent = query

  var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");

  var titleEl = document.createElement("h3");
  titleEl.textContent = result.title;

  var bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML = "<strong>Date: </strong>" + result.date + "<br/>";

  if (result.subject) {
    bodyContentEl.innerHTML +=
      "<strong>Subjects: </strong>" + result.subject.join(", ") + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects: </strong> <p>No Subjects for this entry. </p><br/>";
  }

  if (result.description) {
    bodyContentEl.innerHTML +=
      "<strong>Description: </strong>" + result.description[0] + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description: </strong> <p>No description for this entry. </p><br/>";
  }

  var linkBtn = document.createElement("a");
  linkBtn.textContent = "Read More...";
  linkBtn.href = result.url;
  linkBtn.classList.add("btn", "btn-dark");

  resultCard.append(resultBody, titleEl, bodyContentEl, linkBtn);
  resultsEl.append(resultCard);
}




const searchForm = document.querySelector(".search-form");

function handleSearchSubmit(e) {
  e.preventDefault();
  var inputValue = document.querySelector(".search").value.trim();
  var mediaType = document.querySelector(".media-type").value;
  if (!inputValue) {
    alert("Please provide a search term");
    return;
  }
  searchLocApi(inputValue, mediaType)
 
}

searchForm.addEventListener("submit", handleSearchSubmit);




getParams();
