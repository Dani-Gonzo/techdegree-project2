/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.querySelectorAll(".student-item");
const pageDiv = document.querySelector("div.page");

const maxEntriesPerPage = 10;
let page = 1;



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
   for (let i = 0; i < list.length; i++) {
      if (i >= (page-1)*maxEntriesPerPage && i < page*maxEntriesPerPage) {
         list[i].style.display = "block";
      }
      else {
         list[i].style.display = "none";
      }
   }
}

showPage(studentList, page);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
   let paginationLinks = document.createElement("ul");
   let pagesNeeded = Math.ceil(list.length / maxEntriesPerPage);
   let paginationDiv = document.createElement("div");
   paginationDiv.className = "pagination";
   paginationDiv.appendChild(paginationLinks);
   pageDiv.appendChild(paginationDiv);
   
   for (let i = 1; i <= pagesNeeded; i++) {
      let links = document.createElement("a");
      const listItems = document.createElement("li");
      links.textContent = i;
      listItems.appendChild(links);
      paginationLinks.appendChild(listItems);
      links.addEventListener("click", (links) => {
         links.target.className = "active";
         showPage(studentList, i)
      });
      links.className = "";
   }
}

appendPageLinks(studentList);


// Remember to delete the comments that came with this file, and replace them with your own code comments.