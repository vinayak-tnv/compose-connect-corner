
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Get current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Initialize based on page
  if (currentPage === 'index.html') {
    initHomePage();
  } else if (currentPage === 'post.html') {
    initPostPage();
  } else if (currentPage === 'create.html' || currentPage === 'edit.html') {
    initCreateEditPage();
  } else if (currentPage === 'categories.html') {
    initCategoriesPage();
  }
});

// Initialize Home Page
function initHomePage() {
  const posts = getPosts();
  let activeCategory = null;
  
  // Render featured post
  if (posts.length > 0) {
    renderFeaturedPost(posts[0]);
  }
  
  // Get unique categories
  const categories = getUniqueCategories(posts);
  
  // Render category filters
  renderCategoryFilters(categories, activeCategory);
  
  // Render posts grid
  renderPostsGrid(posts);
  
  // Add click event for category filters
  document.getElementById('category-filters').addEventListener('click', function(e) {
    if (e.target.classList.contains('category-filter')) {
      const category = e.target.dataset.category;
      
      // Remove active class from all buttons
      document.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      e.target.classList.add('active');
      
      // Update active category
      activeCategory = category === 'all' ? null : category;
      
      // Update posts title
      document.getElementById('posts-title').textContent = 
        activeCategory ? `${activeCategory} Posts` : 'Latest Posts';
      
      // Filter and render posts
      const filteredPosts = activeCategory 
        ? posts.filter(post => post.categories.includes(activeCategory)) 
        : posts;
      
      renderPostsGrid(filteredPosts);
    }
  });
}

// Render featured post
function renderFeaturedPost(post) {
  const featuredPostElement = document.getElementById('featured-post');
  
  if (!featuredPostElement || !post) return;
  
  const categoriesHTML = post.categories.map(category => 
    `<span class="post-category">${category}</span>`
  ).join('');
  
  featuredPostElement.innerHTML = `
    <div class="featured-post-image">
      <a href="post.html?id=${post.id}">
        <img src="${post.coverImage}" alt="${post.title}">
      </a>
    </div>
    <div class="featured-post-content">
      <div class="post-categories">
        ${categoriesHTML}
      </div>
      <a href="post.html?id=${post.id}">
        <h2 class="post-title">${post.title}</h2>
      </a>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta">
        <div class="post-author-date">
          <div class="post-author">${post.author}</div>
          <div class="post-date">${post.date}</div>
        </div>
        <div class="post-stats">
          <div class="post-stat">
            <i class="fa-solid fa-heart"></i> ${post.likes}
          </div>
          <div class="post-stat">
            <i class="fa-solid fa-comment"></i> ${post.comments.length}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Get unique categories from posts
function getUniqueCategories(posts) {
  const categoriesSet = new Set();
  posts.forEach(post => {
    post.categories.forEach(category => categoriesSet.add(category));
  });
  return Array.from(categoriesSet);
}

// Render category filters
function renderCategoryFilters(categories, activeCategory) {
  const categoryFiltersElement = document.getElementById('category-filters');
  
  if (!categoryFiltersElement) return;
  
  let filtersHTML = `
    <button class="category-filter ${activeCategory === null ? 'active' : ''}" data-category="all">
      All
    </button>
  `;
  
  categories.forEach(category => {
    filtersHTML += `
      <button class="category-filter ${activeCategory === category ? 'active' : ''}" data-category="${category}">
        ${category}
      </button>
    `;
  });
  
  categoryFiltersElement.innerHTML = filtersHTML;
}

// Render posts grid
function renderPostsGrid(posts) {
  const postsGridElement = document.getElementById('posts-grid');
  
  if (!postsGridElement) return;
  
  if (posts.length === 0) {
    postsGridElement.innerHTML = `
      <div class="empty-state">
        <p>No posts in this category yet.</p>
      </div>
    `;
    return;
  }
  
  let postsHTML = '';
  
  posts.forEach(post => {
    const categoriesHTML = post.categories.map(category => 
      `<span class="post-category">${category}</span>`
    ).join('');
    
    postsHTML += `
      <div class="post-card">
        ${post.coverImage ? `
          <div class="post-card-image">
            <a href="post.html?id=${post.id}">
              <img src="${post.coverImage}" alt="${post.title}">
            </a>
          </div>
        ` : ''}
        <div class="post-card-content">
          <div class="post-categories">
            ${categoriesHTML}
          </div>
          <a href="post.html?id=${post.id}">
            <h3 class="post-title">${post.title}</h3>
          </a>
          <p class="post-excerpt">${post.excerpt}</p>
          <div class="post-meta">
            <div class="post-author-date">
              <div class="post-author">${post.author}</div>
              <div class="post-date">${post.date}</div>
            </div>
            <div class="post-stats">
              <div class="post-stat">
                <i class="fa-solid fa-heart"></i> ${post.likes}
              </div>
              <div class="post-stat">
                <i class="fa-solid fa-comment"></i> ${post.comments.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  postsGridElement.innerHTML = postsHTML;
}

// Initialize Post Page
function initPostPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  if (!postId) {
    window.location.href = 'index.html';
    return;
  }
  
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    window.location.href = 'index.html';
    return;
  }
  
  // Render post content
  renderPostContent(post);
  
  // Handle like button
  const likeButton = document.querySelector('.like-button');
  if (likeButton) {
    likeButton.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
        const likeCount = this.querySelector('span');
        post.likes++;
        likeCount.textContent = post.likes;
        
        // Update post in localStorage
        const postIndex = posts.findIndex(p => p.id === postId);
        posts[postIndex] = post;
        savePosts(posts);
        
        showToast('Post liked!', 'success');
      }
    });
  }
  
  // Handle share button
  const shareButton = document.querySelector('.share-button');
  if (shareButton) {
    shareButton.addEventListener('click', function() {
      // In a real app, this would use the Web Share API
      // For this demo, we'll just show a toast
      showToast('Link copied to clipboard!', 'success');
    });
  }
  
  // Handle delete button
  let deleteConfirmTimer;
  const deleteButton = document.querySelector('.delete-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', function() {
      if (this.classList.contains('confirm-delete')) {
        // Remove post from localStorage
        const postIndex = posts.findIndex(p => p.id === postId);
        posts.splice(postIndex, 1);
        savePosts(posts);
        
        showToast('Post deleted successfully', 'success');
        
        // Redirect to home page
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        // First click - ask for confirmation
        this.classList.add('confirm-delete');
        this.innerHTML = '<i class="fa-solid fa-trash"></i> Confirm Delete';
        
        // Reset after 3 seconds if not confirmed
        clearTimeout(deleteConfirmTimer);
        deleteConfirmTimer = setTimeout(() => {
          this.classList.remove('confirm-delete');
          this.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
        }, 3000);
      }
    });
  }
  
  // Handle comments section
  initCommentsSection(post, posts);
}

// Render post content
function renderPostContent(post) {
  document.title = `${post.title} | Blogify`;
  
  const mainElement = document.querySelector('main');
  if (!mainElement) return;
  
  const categoriesHTML = post.categories.map(category => 
    `<a href="index.html?category=${category}" class="post-category">${category}</a>`
  ).join('');
  
  const tagsHTML = post.tags.map(tag => 
    `<span class="post-tag">#${tag}</span>`
  ).join('');
  
  let postHTML = `
    <div class="container post-container">
      <div class="back-link">
        <a href="index.html" class="text-blue-600 hover:text-blue-800">
          <i class="fa-solid fa-arrow-left"></i> Back to posts
        </a>
      </div>
      
      <article class="bg-white rounded-lg shadow-md overflow-hidden">
        ${post.coverImage ? `
          <div class="post-cover-image">
            <img src="${post.coverImage}" alt="${post.title}">
          </div>
        ` : ''}
        
        <div class="p-6 md:p-8">
          <div class="post-categories">
            ${categoriesHTML}
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${post.title}</h1>
          
          <div class="flex items-center mb-6">
            <div>
              <div class="post-author">${post.author}</div>
              <div class="post-date">${post.date}</div>
            </div>
          </div>
          
          <div class="post-content">
            ${post.content}
          </div>
          
          ${post.tags.length > 0 ? `
            <div class="post-tags">
              ${tagsHTML}
            </div>
          ` : ''}
          
          <div class="post-actions">
            <div>
              <button class="post-action-button like-button">
                <i class="fa-solid fa-heart"></i> <span>${post.likes}</span> Likes
              </button>
              
              <button class="post-action-button share-button">
                <i class="fa-solid fa-share"></i> Share
              </button>
            </div>
            
            <div class="post-action-buttons">
              <a href="edit.html?id=${post.id}" class="post-action-button edit-button">
                <i class="fa-solid fa-edit"></i> Edit
              </a>
              
              <button class="post-action-button delete-button danger">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </article>
      
      <div class="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8 comments-section">
        <h3 class="text-xl font-semibold">Comments (<span id="comments-count">${post.comments.length}</span>)</h3>
        
        <form id="comment-form" class="comment-form">
          <div class="form-group">
            <label for="comment-author">Name</label>
            <input type="text" id="comment-author" class="form-control" placeholder="Your name" required>
          </div>
          
          <div class="form-group">
            <label for="comment-content">Comment</label>
            <textarea id="comment-content" class="form-control" rows="4" placeholder="Share your thoughts..." required></textarea>
          </div>
          
          <button type="submit" class="comment-submit" id="comment-submit">Post Comment</button>
        </form>
        
        <div class="comment-list" id="comment-list">
          ${renderComments(post.comments)}
        </div>
      </div>
    </div>
  `;
  
  mainElement.innerHTML = postHTML;
}

// Render comments
function renderComments(comments) {
  if (comments.length === 0) {
    return `<p class="no-comments">Be the first to comment!</p>`;
  }
  
  let commentsHTML = '';
  
  comments.forEach(comment => {
    commentsHTML += `
      <div class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>
            <div class="comment-author">${comment.author}</div>
            <div class="comment-date">${comment.date}</div>
          </div>
          <button class="comment-like" data-likes="${comment.likes}">
            <i class="fa-solid fa-heart"></i> ${comment.likes}
          </button>
        </div>
        <div class="comment-content">${comment.content}</div>
      </div>
    `;
  });
  
  return commentsHTML;
}

// Initialize comments section
function initCommentsSection(post, posts) {
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const authorInput = document.getElementById('comment-author');
      const contentInput = document.getElementById('comment-content');
      const submitButton = document.getElementById('comment-submit');
      
      const author = authorInput.value.trim();
      const content = contentInput.value.trim();
      
      if (!author || !content) return;
      
      // Disable form during submission
      submitButton.disabled = true;
      submitButton.textContent = 'Posting...';
      
      // Create new comment
      const newComment = {
        id: Date.now().toString(),
        author,
        content,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      
      // Add comment to post
      post.comments.push(newComment);
      
      // Update post in localStorage
      const postIndex = posts.findIndex(p => p.id === post.id);
      posts[postIndex] = post;
      savePosts(posts);
      
      // Update comments count
      const commentsCount = document.getElementById('comments-count');
      commentsCount.textContent = post.comments.length;
      
      // Add comment to DOM
      const commentList = document.getElementById('comment-list');
      
      // If there was a "no comments" message, clear it
      if (post.comments.length === 1) {
        commentList.innerHTML = '';
      }
      
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.setAttribute('data-id', newComment.id);
      commentElement.innerHTML = `
        <div class="comment-header">
          <div>
            <div class="comment-author">${newComment.author}</div>
            <div class="comment-date">${newComment.date}</div>
          </div>
          <button class="comment-like" data-likes="0">
            <i class="fa-solid fa-heart"></i> 0
          </button>
        </div>
        <div class="comment-content">${newComment.content}</div>
      `;
      
      commentList.prepend(commentElement);
      
      // Reset form
      authorInput.value = '';
      contentInput.value = '';
      submitButton.disabled = false;
      submitButton.textContent = 'Post Comment';
      
      // Show toast
      showToast('Comment added successfully!', 'success');
      
      // Add like event listener for new comment
      const likeButton = commentElement.querySelector('.comment-like');
      addCommentLikeListener(likeButton, post, posts);
    });
  }
  
  // Add like event listeners for existing comments
  const commentLikeButtons = document.querySelectorAll('.comment-like');
  commentLikeButtons.forEach(button => {
    addCommentLikeListener(button, post, posts);
  });
}

// Add comment like listener
function addCommentLikeListener(button, post, posts) {
  button.addEventListener('click', function() {
    if (this.classList.contains('active')) return;
    
    // Get comment id
    const commentId = this.closest('.comment').dataset.id;
    
    // Find comment in post and increment likes
    const comment = post.comments.find(c => c.id === commentId);
    if (comment) {
      comment.likes++;
      this.innerHTML = `<i class="fa-solid fa-heart"></i> ${comment.likes}`;
      this.classList.add('active');
      
      // Update post in localStorage
      const postIndex = posts.findIndex(p => p.id === post.id);
      posts[postIndex] = post;
      savePosts(posts);
    }
  });
}

// Initialize Create/Edit Page
function initCreateEditPage() {
  const isEditMode = window.location.pathname.includes('edit.html');
  let post = null;
  
  // If in edit mode, get post data
  if (isEditMode) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
      window.location.href = 'index.html';
      return;
    }
    
    const posts = getPosts();
    post = posts.find(p => p.id === postId);
    
    if (!post) {
      window.location.href = 'index.html';
      return;
    }
  }
  
  // Set page title
  document.title = isEditMode ? 'Edit Post | Blogify' : 'Create Post | Blogify';
  
  // Render form
  renderCreateEditForm(post);
  
  // Initialize form elements and handlers
  initFormElements(post);
}

// Render create/edit form
function renderCreateEditForm(post) {
  const mainElement = document.querySelector('main');
  if (!mainElement) return;
  
  // Cover image options
  const coverImageOptions = [
    { url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", label: "Computer Code" },
    { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", label: "Programming" },
    { url: "https://images.unsplash.com/photo-1518770660439-4636190af475", label: "Circuit Board" },
    { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", label: "Laptop" },
    { url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", label: "Woman with Laptop" },
  ];
  
  const coverImageOptionsHTML = coverImageOptions.map(option => `
    <div 
      class="cover-image-option ${post && post.coverImage === option.url ? 'selected' : ''}" 
      data-url="${option.url}"
      title="${option.label}"
    >
      <img src="${option.url}" alt="${option.label}">
    </div>
  `).join('');
  
  const formHTML = `
    <div class="container">
      <div class="form-container">
        <h1 class="form-title">${post ? 'Edit Post' : 'Create New Post'}</h1>
        
        <form id="post-form">
          <!-- Title -->
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              type="text" 
              id="title" 
              class="form-control" 
              placeholder="Enter a captivating title" 
              value="${post ? post.title : ''}" 
              required
            >
          </div>
          
          <!-- Cover Image -->
          <div class="form-group">
            <label>Cover Image</label>
            <div class="cover-image-grid" id="cover-image-grid">
              ${coverImageOptionsHTML}
            </div>
            ${post && post.coverImage ? `
              <button type="button" id="remove-cover-image" class="remove-cover-image">
                Remove cover image
              </button>
            ` : ''}
          </div>
          
          <!-- Excerpt -->
          <div class="form-group">
            <label for="excerpt">Excerpt (optional)</label>
            <textarea 
              id="excerpt" 
              class="form-control" 
              placeholder="Write a brief description of your post (will be auto-generated if left empty)"
            >${post ? post.excerpt : ''}</textarea>
          </div>
          
          <!-- Categories and Tags -->
          <div class="form-group">
            <label for="categories-input">Categories</label>
            <div class="tags-input-wrapper" id="categories-wrapper">
              ${post && post.categories ? post.categories.map(category => `
                <div class="tag">
                  ${category}
                  <button type="button" class="tag-remove" data-value="${category}">×</button>
                </div>
              `).join('') : ''}
              <input 
                type="text" 
                id="categories-input" 
                class="tags-input" 
                placeholder="Add category and press Enter"
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="tags-input">Tags</label>
            <div class="tags-input-wrapper" id="tags-wrapper">
              ${post && post.tags ? post.tags.map(tag => `
                <div class="tag">
                  ${tag}
                  <button type="button" class="tag-remove" data-value="${tag}">×</button>
                </div>
              `).join('') : ''}
              <input 
                type="text" 
                id="tags-input" 
                class="tags-input" 
                placeholder="Add tag and press Enter"
              >
            </div>
          </div>
          
          <!-- Content -->
          <div class="form-group">
            <label for="content">Content</label>
            <div class="editor">
              <div class="editor-toolbar">
                <button type="button" class="editor-button" data-action="bold">B</button>
                <button type="button" class="editor-button" data-action="italic">I</button>
                <button type="button" class="editor-button" data-action="heading">H2</button>
                <button type="button" class="editor-button" data-action="link">Link</button>
                <button type="button" class="editor-button" data-action="quote">Quote</button>
                <button type="button" class="editor-button" data-action="code">Code</button>
                <button type="button" class="editor-button editor-button-image" data-action="image">
                  <i class="fa-solid fa-image"></i> Image
                </button>
              </div>
              <div class="editor-content">
                <textarea id="content" placeholder="Start writing your blog post... You can use HTML tags for formatting.">${post ? post.content : ''}</textarea>
              </div>
              <div class="editor-preview">
                <div class="editor-preview-title">Preview</div>
                <div id="content-preview" class="prose"></div>
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="form-actions">
            <button type="button" id="cancel-button" class="button button-outline">Cancel</button>
            <button type="submit" id="submit-button" class="button button-primary">
              ${post ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  mainElement.innerHTML = formHTML;
}

// Initialize form elements
function initFormElements(post) {
  const isEditMode = !!post;
  
  // Cover image selection
  const coverImageGrid = document.getElementById('cover-image-grid');
  let selectedCoverImage = post ? post.coverImage : '';
  
  if (coverImageGrid) {
    coverImageGrid.addEventListener('click', function(e) {
      const option = e.target.closest('.cover-image-option');
      if (option) {
        // Remove selected class from all options
        document.querySelectorAll('.cover-image-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        option.classList.add('selected');
        
        // Set selected cover image
        selectedCoverImage = option.dataset.url;
        
        // Add remove button if not present
        if (!document.getElementById('remove-cover-image')) {
          const removeButton = document.createElement('button');
          removeButton.type = 'button';
          removeButton.id = 'remove-cover-image';
          removeButton.className = 'remove-cover-image';
          removeButton.textContent = 'Remove cover image';
          coverImageGrid.parentNode.appendChild(removeButton);
          
          removeButton.addEventListener('click', function() {
            document.querySelectorAll('.cover-image-option').forEach(opt => {
              opt.classList.remove('selected');
            });
            selectedCoverImage = '';
            this.remove();
          });
        }
      }
    });
  }
  
  // Remove cover image button
  const removeButton = document.getElementById('remove-cover-image');
  if (removeButton) {
    removeButton.addEventListener('click', function() {
      document.querySelectorAll('.cover-image-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      selectedCoverImage = '';
      this.remove();
    });
  }
  
  // Categories input
  const categoriesInput = document.getElementById('categories-input');
  const categoriesWrapper = document.getElementById('categories-wrapper');
  let categories = post ? [...post.categories] : [];
  
  if (categoriesInput && categoriesWrapper) {
    initTagsInput(categoriesInput, categoriesWrapper, categories);
  }
  
  // Tags input
  const tagsInput = document.getElementById('tags-input');
  const tagsWrapper = document.getElementById('tags-wrapper');
  let tags = post ? [...post.tags] : [];
  
  if (tagsInput && tagsWrapper) {
    initTagsInput(tagsInput, tagsWrapper, tags);
  }
  
  // Rich text editor
  const contentTextarea = document.getElementById('content');
  const contentPreview = document.getElementById('content-preview');
  
  if (contentTextarea && contentPreview) {
    // Update preview on content change
    contentTextarea.addEventListener('input', function() {
      contentPreview.innerHTML = this.value;
    });
    
    // Initial preview
    contentPreview.innerHTML = contentTextarea.value;
    
    // Editor toolbar buttons
    document.querySelectorAll('.editor-button').forEach(button => {
      button.addEventListener('click', function() {
        const action = this.dataset.action;
        let insertText = '';
        
        switch (action) {
          case 'bold':
            insertText = '<strong>Bold text</strong>';
            break;
          case 'italic':
            insertText = '<em>Italic text</em>';
            break;
          case 'heading':
            insertText = '<h2>Heading</h2>';
            break;
          case 'link':
            insertText = '<a href="https://example.com" target="_blank">Link</a>';
            break;
          case 'quote':
            insertText = '<blockquote>Quote text</blockquote>';
            break;
          case 'code':
            insertText = '<pre><code>// Your code here</code></pre>';
            break;
          case 'image':
            // Mock image upload
            this.textContent = 'Uploading...';
            setTimeout(() => {
              const imageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
              insertText = `<img src="${imageUrl}" alt="Uploaded image" class="w-full h-auto my-4" />`;
              
              // Insert at cursor position or at the end
              insertTextAtCursor(contentTextarea, insertText);
              
              // Update preview
              contentPreview.innerHTML = contentTextarea.value;
              
              this.innerHTML = '<i class="fa-solid fa-image"></i> Image';
            }, 1500);
            return;
        }
        
        // Insert at cursor position or at the end
        insertTextAtCursor(contentTextarea, insertText);
        
        // Update preview
        contentPreview.innerHTML = contentTextarea.value;
      });
    });
  }
  
  // Cancel button
  const cancelButton = document.getElementById('cancel-button');
  if (cancelButton) {
    cancelButton.addEventListener('click', function() {
      history.back();
    });
  }
  
  // Form submission
  const postForm = document.getElementById('post-form');
  if (postForm) {
    postForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const titleInput = document.getElementById('title');
      const excerptInput = document.getElementById('excerpt');
      const contentInput = document.getElementById('content');
      const submitButton = document.getElementById('submit-button');
      
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
      const excerpt = excerptInput.value.trim() || title.substring(0, 120) + '...';
      
      if (!title) {
        showToast('Please enter a title for your post', 'error');
        return;
      }
      
      if (!content) {
        showToast('Please add some content to your post', 'error');
        return;
      }
      
      // Disable form during submission
      submitButton.disabled = true;
      submitButton.textContent = isEditMode ? 'Updating...' : 'Publishing...';
      
      // Create post object
      const newPost = {
        id: isEditMode ? post.id : Date.now().toString(),
        title,
        content,
        excerpt,
        coverImage: selectedCoverImage,
        author: 'Current User', // In a real app, this would come from authentication
        date: new Date().toISOString().split('T')[0],
        categories,
        tags,
        likes: isEditMode ? post.likes : 0,
        comments: isEditMode ? post.comments : []
      };
      
      // Get posts from localStorage
      const posts = getPosts();
      
      // Update or add post
      if (isEditMode) {
        const postIndex = posts.findIndex(p => p.id === post.id);
        posts[postIndex] = newPost;
      } else {
        posts.unshift(newPost);
      }
      
      // Save posts to localStorage
      savePosts(posts);
      
      // Show success message
      showToast(isEditMode ? 'Post updated successfully!' : 'Post published successfully!', 'success');
      
      // Redirect to post page
      setTimeout(() => {
        window.location.href = `post.html?id=${newPost.id}`;
      }, 1500);
    });
  }
}

// Initialize tags input
function initTagsInput(input, wrapper, items) {
  // Add tag when Enter is pressed
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const value = this.value.trim();
      if (!value) return;
      
      if (!items.includes(value)) {
        // Add to items array
        items.push(value);
        
        // Create tag element
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
          ${value}
          <button type="button" class="tag-remove" data-value="${value}">×</button>
        `;
        
        // Insert before input
        wrapper.insertBefore(tag, this);
        
        // Clear input
        this.value = '';
      }
    }
  });
  
  // Remove tag when clicking remove button
  wrapper.addEventListener('click', function(e) {
    if (e.target.classList.contains('tag-remove')) {
      const value = e.target.dataset.value;
      
      // Remove from items array
      items = items.filter(item => item !== value);
      
      // Remove tag element
      e.target.parentNode.remove();
    }
  });
}

// Insert text at cursor position or at the end
function insertTextAtCursor(textarea, text) {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const before = textarea.value.substring(0, startPos);
  const after = textarea.value.substring(endPos, textarea.value.length);
  
  textarea.value = before + text + after;
  textarea.selectionStart = startPos + text.length;
  textarea.selectionEnd = startPos + text.length;
  textarea.focus();
}

// Initialize Categories Page
function initCategoriesPage() {
  const posts = getPosts();
  
  // Get categories with post counts
  const categories = {};
  posts.forEach(post => {
    post.categories.forEach(category => {
      if (categories[category]) {
        categories[category]++;
      } else {
        categories[category] = 1;
      }
    });
  });
  
  // Render categories
  renderCategories(categories);
}

// Render categories
function renderCategories(categories) {
  const mainElement = document.querySelector('main');
  if (!mainElement) return;
  
  // Convert to array for sorting
  const categoriesArray = Object.entries(categories).map(([name, count]) => ({
    name,
    count
  }));
  
  // Sort by post count (descending)
  categoriesArray.sort((a, b) => b.count - a.count);
  
  let categoriesHTML = `
    <div class="container categories-page">
      <h1 class="text-3xl font-bold mb-4">Categories</h1>
      
      <div class="categories-grid">
  `;
  
  categoriesArray.forEach(category => {
    categoriesHTML += `
      <a href="index.html?category=${category.name}" class="category-card">
        <h2 class="category-name">${category.name}</h2>
        <div class="category-count">${category.count} ${category.count === 1 ? 'post' : 'posts'}</div>
      </a>
    `;
  });
  
  categoriesHTML += `
      </div>
    </div>
  `;
  
  mainElement.innerHTML = categoriesHTML;
}

// Show toast notification
function showToast(message, type = 'success') {
  // Remove any existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  toast.innerHTML = `
    <span class="toast-icon">
      <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    </span>
    <span>${message}</span>
  `;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide and remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Create post.html
function createPostPage() {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Post | Blogify</title>
    <meta name="description" content="Create, edit and share blog posts with Blogify" />
    <meta name="author" content="Lovable" />
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>

  <body>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">Blogify</a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="categories.html">Categories</a>
        </div>
        <a href="create.html" class="create-button">Write a Post</a>
      </div>
    </nav>

    <!-- Main Content - Will be populated by JavaScript -->
    <main></main>
    
    <!-- Footer -->
    <footer>
      <div class="container">
        <p>&copy; <span id="current-year"></span> Blogify. All rights reserved.</p>
      </div>
    </footer>

    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="data.js"></script>
    <script src="app.js"></script>
  </body>
</html>
  `;
}

// Create create.html
function createCreatePage() {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Create Post | Blogify</title>
    <meta name="description" content="Create, edit and share blog posts with Blogify" />
    <meta name="author" content="Lovable" />
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>

  <body>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">Blogify</a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="categories.html">Categories</a>
        </div>
        <a href="create.html" class="create-button">Write a Post</a>
      </div>
    </nav>

    <!-- Main Content - Will be populated by JavaScript -->
    <main></main>
    
    <!-- Footer -->
    <footer>
      <div class="container">
        <p>&copy; <span id="current-year"></span> Blogify. All rights reserved.</p>
      </div>
    </footer>

    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="data.js"></script>
    <script src="app.js"></script>
  </body>
</html>
  `;
}

// Create edit.html
function createEditPage() {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edit Post | Blogify</title>
    <meta name="description" content="Create, edit and share blog posts with Blogify" />
    <meta name="author" content="Lovable" />
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>

  <body>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">Blogify</a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="categories.html">Categories</a>
        </div>
        <a href="create.html" class="create-button">Write a Post</a>
      </div>
    </nav>

    <!-- Main Content - Will be populated by JavaScript -->
    <main></main>
    
    <!-- Footer -->
    <footer>
      <div class="container">
        <p>&copy; <span id="current-year"></span> Blogify. All rights reserved.</p>
      </div>
    </footer>

    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="data.js"></script>
    <script src="app.js"></script>
  </body>
</html>
  `;
}

// Create categories.html
function createCategoriesPage() {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Categories | Blogify</title>
    <meta name="description" content="Create, edit and share blog posts with Blogify" />
    <meta name="author" content="Lovable" />
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  </head>

  <body>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="logo">Blogify</a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="categories.html">Categories</a>
        </div>
        <a href="create.html" class="create-button">Write a Post</a>
      </div>
    </nav>

    <!-- Main Content - Will be populated by JavaScript -->
    <main></main>
    
    <!-- Footer -->
    <footer>
      <div class="container">
        <p>&copy; <span id="current-year"></span> Blogify. All rights reserved.</p>
      </div>
    </footer>

    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="data.js"></script>
    <script src="app.js"></script>
  </body>
</html>
  `;
}

// Create additional pages needed
document.addEventListener('DOMContentLoaded', function() {
  // Create post.html
  fetch('post.html')
    .then(response => {
      if (response.status === 404) {
        // Create file if it doesn't exist
        const postPageContent = createPostPage();
        
        // Create a Blob with the content
        const blob = new Blob([postPageContent], { type: 'text/html' });
        
        // Create a link to download the file
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = URL.createObjectURL(blob);
        a.download = 'post.html';
        
        // Add to the document and trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
        
        console.log('Created post.html page');
      }
    })
    .catch(err => console.error('Error checking for post.html:', err));
  
  // Create create.html
  fetch('create.html')
    .then(response => {
      if (response.status === 404) {
        // Create file if it doesn't exist
        const createPageContent = createCreatePage();
        
        // Create a Blob with the content
        const blob = new Blob([createPageContent], { type: 'text/html' });
        
        // Create a link to download the file
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = URL.createObjectURL(blob);
        a.download = 'create.html';
        
        // Add to the document and trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
        
        console.log('Created create.html page');
      }
    })
    .catch(err => console.error('Error checking for create.html:', err));
  
  // Create edit.html
  fetch('edit.html')
    .then(response => {
      if (response.status === 404) {
        // Create file if it doesn't exist
        const editPageContent = createEditPage();
        
        // Create a Blob with the content
        const blob = new Blob([editPageContent], { type: 'text/html' });
        
        // Create a link to download the file
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = URL.createObjectURL(blob);
        a.download = 'edit.html';
        
        // Add to the document and trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
        
        console.log('Created edit.html page');
      }
    })
    .catch(err => console.error('Error checking for edit.html:', err));
  
  // Create categories.html
  fetch('categories.html')
    .then(response => {
      if (response.status === 404) {
        // Create file if it doesn't exist
        const categoriesPageContent = createCategoriesPage();
        
        // Create a Blob with the content
        const blob = new Blob([categoriesPageContent], { type: 'text/html' });
        
        // Create a link to download the file
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = URL.createObjectURL(blob);
        a.download = 'categories.html';
        
        // Add to the document and trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
        
        console.log('Created categories.html page');
      }
    })
    .catch(err => console.error('Error checking for categories.html:', err));
});
