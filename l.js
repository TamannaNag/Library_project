document.getElementById('search').addEventListener('keyup', function() {
    const query = this.value;
    if (query.length > 2) {
        searchBooks(query);
    }
});

function searchBooks(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayBooks(data.items))
        .catch(error => console.error('Error fetching data:', error));
}

function displayBooks(books) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous results

    if (!books || books.length === 0) {
        content.innerHTML = '<p>No results found.</p>';
        return;
    }

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        const coverImage = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/100';
        bookDiv.innerHTML = `
            <img src="${coverImage}" alt="${book.volumeInfo.title} cover">
            <div>
                <h3>${book.volumeInfo.title}</h3>
                <p>Author: ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p>Genre: ${book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'N/A'}</p>
                <p>Year: ${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.split('-')[0] : 'N/A'}</p>
                <p>Description: ${book.volumeInfo.description ? book.volumeInfo.description : 'No description available'}</p>
            </div>
        `;
        content.appendChild(bookDiv);
    }
}
