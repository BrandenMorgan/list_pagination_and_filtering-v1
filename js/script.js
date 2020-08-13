document.addEventListener('DOMContentLoaded', () => {

  // Get all list items with all student info
  const studentLis = document.getElementsByClassName('student-item cf');

  // Get only names of students to filter while searching
  const names = document.getElementsByTagName('h3');

  // Select parent node sibling to append search bar to.
  const searchContainer = studentLis[0].parentNode.previousElementSibling;
  // Create search bar and button lines 11 - 22
  const studentSearchDiv = document.createElement('div');
  studentSearchDiv.className = 'student-search';
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Search for students...';
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search'
  studentSearchDiv.appendChild(searchBar);
  studentSearchDiv.appendChild(searchButton);
  searchContainer.appendChild(studentSearchDiv);

  // Create "No results" display message element
  const displayMessage = document.createElement('p');
  searchContainer.nextElementSibling.appendChild(displayMessage);

  // Store search results for pagination
  const searchResults = [];
  // Handle "click" and "keyup" events
  function addEvent(eventName, tagName) {
    searchContainer.addEventListener(eventName, (e) => {
      if (e.target.tagName === tagName) {
        // Clear search results for new search
        if (searchResults.length) {
          searchResults.length = 0;
        }
        const search = searchBar.value.toLowerCase();
        if (eventName === 'click') {
          searchBar.value = '';
        }
        for (let i = 0; i < studentLis.length; i++) {
          /*
           Filter through "names" array. If your search is in the array
           add all the students info to "searchResults"
          */
          if (names[i].textContent.indexOf(search) > -1) {
            searchResults.push(studentLis[i]);
          }
        }
        // Display "No results" message to screen if there are no results
        if (!searchResults.length) {
          for (let i = 0; i < studentLis.length; i++) {
            displayMessage.innerHTML = 'There are no results for your search.'
            studentLis[i].style.display = 'none';
            if (eventName === 'click') {
                searchBar.value = '';
            }
          }
          // Display filtered results to the screen
        } else {
          for (let i = 0; i < studentLis.length; i++) {
              displayMessage.innerHTML = '';
              studentLis[i].style.display = 'none';
          }
        }
        showPage(searchResults, 1);
        appendPageLinks(searchResults);
      }
    });
  }
  addEvent('click', 'BUTTON');
  addEvent('keyup', 'INPUT');

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
    const paginationLinks = document.getElementsByClassName('pagination')[0];
    // Remove existing pagination links before appending new ones
    if (paginationLinks) {
      paginationLinks.remove(1);
    }

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
      Store lis in "links" array for later use
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
