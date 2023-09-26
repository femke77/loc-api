const searchForm = document.querySelector(".search-form");

function handleSearchSubmit(e) {
  e.preventDefault();
  var inputValue = document.querySelector(".search").value.trim();
  var mediaType = document.querySelector(".media-type").value;
  if (!inputValue) {
    alert("Please provide a search term");
    return;
  }

  var queryString =
    "./search-results.html?q=" + inputValue + "&media-type=" + mediaType;
  location.assign(queryString);
}

searchForm.addEventListener("submit", handleSearchSubmit);
