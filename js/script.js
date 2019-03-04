/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global variables
const maxEntriesPerPage = 10;
let page = 1; // Initial page
const studentList = document.querySelectorAll(".student-item");
const pageDiv = document.querySelector("div.page");
let noResultsDiv; // Appended div containing "No Results" message

// Creates, appends and styles "No results found" message to the div with class page
function ResultsMessage() {
   noResultsDiv = document.createElement("div");
   let noResultsMessage = document.createElement("span");
   noResultsMessage.innerHTML = "No results found";
   noResultsDiv.appendChild(noResultsMessage);
   noResultsDiv.style.textAlign = "center";
   noResultsDiv.style.display = "none";
   pageDiv.appendChild(noResultsDiv);
}

// Displays certain number of records per page from a list and hides the rest
function ShowPage(list, page) {
   for (let i = 0; i < list.length; i++) {
      if (i >= (page-1)*maxEntriesPerPage && i < page*maxEntriesPerPage) {
         list[i].style.display = "block";
      }
      else {
         list[i].style.display = "none";
      }
   }
}

// Create page links with event listener
function CreatePageLinks(list, pageNumber) {
   let link = document.createElement("a");
   const listItems = document.createElement("li");
   link.textContent = pageNumber;
   listItems.appendChild(link);
   link.addEventListener("click", (link) => {
      let aLinks = document.querySelectorAll("a");
      for (let j = 0; j < aLinks.length; j++) {
         aLinks[j].className = "";
      }
      link.target.className = "active";
      ShowPage(list, pageNumber)
   });
   return listItems;
}

// Add created page links to the page based on number of pages needed for the amount of records in the passed in list
function AppendPageLinks(list) {
   let pagesNeeded = Math.ceil(list.length / maxEntriesPerPage);
   let paginationLinks = document.createElement("ul");
   // Check for an existing div with "pagination" class ...
   let oldPaginationDiv = document.querySelector("div.pagination");
   // ... If such a div exists, remove it
   if (oldPaginationDiv != null) {
      pageDiv.removeChild(oldPaginationDiv);
   }

   let paginationDiv = document.createElement("div");
   paginationDiv.className = "pagination";
   paginationDiv.appendChild(paginationLinks);
   pageDiv.appendChild(paginationDiv);

   for (let i = 1; i <= pagesNeeded; i++) {
      paginationLinks.appendChild(CreatePageLinks(list, i));
   }
}

// Create and add a search bar to the page
function AppendSearchBar() {
   const pageHeaderDiv = document.querySelector(".page-header");
   const searchDiv = document.createElement("div");
   searchDiv.className = "student-search";
   let userInput = document.createElement("input");
   userInput.setAttribute("placeholder", "Search for students...");
   searchDiv.appendChild(userInput);
   let searchButton = document.createElement("button");
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchButton);
   pageHeaderDiv.appendChild(searchDiv);
   // Add click event listener for the search button being clicked
   searchButton.addEventListener("click", () => {
      SearchFunctionality(userInput, studentList); 
   });
   // Add keyup event listener for the input box receiving input
   userInput.addEventListener("keyup", () => {
      SearchFunctionality(userInput, studentList); 
   });
}

// Add functionality to the search bar
function SearchFunctionality(input, list) {
   const names = document.querySelectorAll("h3");
   const emails = document.querySelectorAll("span.email");
   let searchNamesArray = [];
   for (i = 0; i < list.length; i++) {
      // Check if search bar input contains letters in names or emails arrays ...
      if (names[i].innerHTML.indexOf(input.value) > -1 || emails[i].innerHTML.indexOf(input.value) > -1) {
         searchNamesArray.push(list[i]);
      }
      // ... If not, set the list item to not display
      else {
         list[i].style.display = "none";
      }
   }
   ShowPage(searchNamesArray, 1);
   AppendPageLinks(searchNamesArray);

   // If there are no results that match the input, show the "No results found" message
   if (searchNamesArray.length == 0) {
      noResultsDiv.style.display = "block";
   }
   else {
      noResultsDiv.style.display = "none";
   }
}

ResultsMessage();
AppendSearchBar();
ShowPage(studentList, page);
AppendPageLinks(studentList);