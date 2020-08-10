document.addEventListener('DOMContentLoaded', () => {

  // Get all list items with all student info
  const studentLis = document.getElementsByClassName('student-item cf');

  // Select parent node sibling to append to
  const searchContainer = studentLis[0].parentNode.previousElementSibling;

  const studentSearchDiv = document.createElement('div');
  studentSearchDiv.className = 'student-search';

  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Search for students...';

  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search'

  // append search bar and button to div node
  studentSearchDiv.appendChild(searchBar);
  studentSearchDiv.appendChild(searchButton);

  // Append node to div
  searchContainer.appendChild(studentSearchDiv);
  const displayMessage = document.createElement('p');
  searchContainer.nextElementSibling.appendChild(displayMessage);

  const studentContainer = document.querySelector('.student-list');

  let searchResults = [];
  searchContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const search = searchBar.value.toLowerCase();
    searchBar.value = '';
    for (let i = 0; i < studentLis.length; i++) {
      if (studentLis[i].textContent.indexOf(search) > -1) {
        searchResults.push(studentLis[i]);
      }
      if (!searchResults.length) {
        console.log('got here')
        console.log(searchResults.length)
        // displayMessage.innerHTML = 'There are no results for your search.';
        studentLis[i].style.display = 'none';
        searchBar.value = '';
        // searchResults.length = 0;
    } else {
        console.log('Made it to else')
        console.log("second ");
        console.log(searchResults);
        // displayMessage.innerHTML = 'There are no results for your search.';
        studentLis[i].style.display = 'none';
        showPage(searchResults, 1);
        // searchResults.length = 0;
      }
    }
  }
  searchResults.length = 0;
});

//   searchContainer.addEventListener('keyup', (e) => {
//   if (e.target.tagName === 'INPUT') {
//     displayMessage.innerHTML = '';
//     const search = searchBar.value.toLowerCase();
//
//     for (let i = 0; i < studentLis.length; i++) {
//       if (studentLis[i].textContent.indexOf(search) > -1) {
//         searchResults.push(studentLis[i]);
//       }
//       if (!searchResults) {
//         studentLis[i].style.display = 'none';
//         displayMessage.innerHTML = 'There are no results for your search.';
//         console.log(!searchResults);
//         console.log(studentContainer.lastElementChild.textContent);
//         if (studentContainer.lastElementChild.textContent === 'There are no results for your search.') {
//           studentContainer.removeChild(studentContainer.lastElementChild);
//         }
//         searchResults = [];
//       } else {
//         console.log('Made it to else')
//         studentLis[i].style.display = 'none';
//         showPage(searchResults, 1);
//         searchResults = [];
//       }
//     }
//   }
// });


  // Control how many results user sees per page.
  const showPage = (list, page) => {
    // Show 10 results per page using index value
    const startIndex = (page * 10) - 10;
    const endIndex = page * 10;
    /*
      Iterate over the list of student info. If condition is met
      display to the page. If not display nothing.
    */
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
      }
    }
  }

  // Generate, append, and add functionality to the pagination buttons.
  const appendPageLinks = (list) => {

    // totalPages gets how many pages are needed for the 'list' parameter
    const totalPages = list.length / 10;

    // Append a div, with the class of “pagination” to the .page div
    const div = document.createElement('div');
    div.className = 'pagination';
    const pageDiv = document.querySelector('.page');
    pageDiv.appendChild(div);

    // Store the pagination links
    const ul = document.createElement('ul');
    div.appendChild(ul);
    /*
      for every page, add li and a tags with the page number text
      Store lis in "links" array for later use on line 117
    */
    const links = [];
    for (let i = 0; i < totalPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i+1;
      a.href = '#';
      if (i === 0) {
        a.className = 'active';
      }
      ul.appendChild(li);
      li.appendChild(a);
      links.push(li);
    }
    /*
      Add an event listener to each a tag. When they are clicked
      call the showPage function to display the appropriate page
    */
    ul.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        if (studentContainer.lastElementChild.textContent === 'There are no results for your search.') {
          studentContainer.removeChild(studentContainer.lastElementChild);
        }
        const page = e.target.textContent;
        showPage(list, page);
      }
      // Loop over pagination links to remove active class from all links
      for (let i = 0; i < links.length; i++) {
        const a = links[i].firstElementChild;
        a.classList.remove('active');
      }
    });


    // Add the active class to the link that was just clicked.
    ul.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const page = e.target
        page.className = 'active';
      }
    });
  }
    showPage(studentLis, 1);
    appendPageLinks(studentLis);
});
