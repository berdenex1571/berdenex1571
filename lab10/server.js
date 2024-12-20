const blogContainer = document.getElementById('blog-container');

// Function to make an XMLHttpRequest to the ikon.mn website
function fetchBlogPosts() {
    const xhr = new XMLHttpRequest();
    const url = 'https://ikon.mn/api/v1/news'; // Replace with the correct API endpoint for ikon.mn (if available)
    
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displayBlogPosts(response.data);
        } else {
            blogContainer.innerHTML = <p>Failed to load blog posts. Please try again later.</p>;
        }
    };
    console.log(response.data)
    xhr.onerror = function () {
        blogContainer.innerHTML = <p>Network error. Please check your connection.</p>;
    };
    xhr.send();
}

// Function to display the blog posts on the page
function displayBlogPosts(posts) {
    blogContainer.innerHTML = ''; // Clear previous content
    if (posts && posts.length > 0) {
        posts.forEach(post => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');
            blogPost.innerHTML = `
                <img src="${post.image_url}" alt="${post.title}" class="blog-image">
                <h2 class="blog-title">${post.title}</h2>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.url}" target="_blank" class="read-more">Read More</a>
            `;
            blogContainer.appendChild(blogPost);
        });
    } else {
        blogContainer.innerHTML = <p>No blog posts available.</p>;
    }
}

// Call the function to load the blog posts when the page loads
window.onload = fetchBlogPosts;