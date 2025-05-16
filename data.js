
// Sample blog post data
const postsData = [
  {
    id: '1',
    title: 'Getting Started with Web Development in 2024',
    content: `
      <p>Web development continues to evolve at a rapid pace. If you're just starting your journey as a web developer in 2024, here's what you need to know.</p>
      
      <h2>The Foundation</h2>
      <p>Before diving into frameworks and libraries, make sure you have a solid understanding of the three core technologies:</p>
      <ul>
        <li>HTML - For structure</li>
        <li>CSS - For presentation</li>
        <li>JavaScript - For functionality</li>
      </ul>
      
      <p>These fundamentals will serve as the building blocks for everything else you'll learn.</p>
      
      <h2>Frontend Development</h2>
      <p>Once you've mastered the basics, explore modern frontend frameworks like React, Vue, or Angular. These tools make it easier to build complex user interfaces and manage state in your applications.</p>
      
      <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Computer code" class="w-full h-auto my-4" />
      
      <h2>Backend Development</h2>
      <p>For backend development, consider learning Node.js, Python (with Django or Flask), or Ruby on Rails. These technologies allow you to build robust server-side applications.</p>
      
      <h2>Database Knowledge</h2>
      <p>Understanding databases is crucial. Start with SQL databases like MySQL or PostgreSQL, then explore NoSQL options like MongoDB.</p>
      
      <blockquote>
        The best way to learn web development is by building projects. Start small, and gradually take on more complex challenges.
      </blockquote>
      
      <h2>Continuous Learning</h2>
      <p>The field of web development is constantly changing. Make a habit of reading technical blogs, following developers on social media, and participating in coding communities.</p>
      
      <p>Remember, everyone starts somewhere. Be patient with yourself, practice regularly, and don't be afraid to ask for help when needed.</p>
    `,
    excerpt: 'Web development continues to evolve at a rapid pace. If you're just starting your journey as a web developer in 2024, here's what you need to know.',
    author: 'Jane Doe',
    date: '2024-05-12',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    categories: ['Web Development', 'Programming'],
    tags: ['html', 'css', 'javascript', 'beginners'],
    likes: 42,
    comments: [
      {
        id: '101',
        author: 'Alex Johnson',
        content: 'This is exactly what I needed as a beginner. Thanks for the comprehensive guide!',
        date: '2024-05-13',
        likes: 5
      },
      {
        id: '102',
        author: 'Morgan Lee',
        content: 'I would also recommend learning about accessibility and responsive design early on. They\'re crucial skills for modern web developers.',
        date: '2024-05-14',
        likes: 8
      }
    ]
  },
  {
    id: '2',
    title: 'Understanding JavaScript Promises',
    content: `
      <p>Promises are a powerful feature in JavaScript that help manage asynchronous operations. Let's dive into how they work and why they're so useful.</p>
      
      <h2>What is a Promise?</h2>
      <p>A Promise in JavaScript represents a value that may not be available yet. It's an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.</p>
      
      <h2>The Promise Lifecycle</h2>
      <p>A Promise can be in one of three states:</p>
      <ul>
        <li><strong>Pending</strong>: Initial state, neither fulfilled nor rejected.</li>
        <li><strong>Fulfilled</strong>: The operation completed successfully.</li>
        <li><strong>Rejected</strong>: The operation failed.</li>
      </ul>
      
      <h2>Creating a Promise</h2>
      <pre><code>
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation here
  const success = true;
  
  if (success) {
    resolve('Operation succeeded!');
  } else {
    reject('Operation failed!');
  }
});
      </code></pre>
      
      <h2>Using Promises</h2>
      <p>You can use the <code>then()</code>, <code>catch()</code>, and <code>finally()</code> methods to handle Promise results:</p>
      
      <pre><code>
myPromise
  .then(result => {
    console.log(result); // 'Operation succeeded!'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Promise settled (fulfilled or rejected)');
  });
      </code></pre>
      
      <h2>Chaining Promises</h2>
      <p>One of the most powerful features of Promises is the ability to chain them:</p>
      
      <pre><code>
fetchUserData(userId)
  .then(userData => fetchUserPosts(userData.username))
  .then(posts => displayPosts(posts))
  .catch(error => handleError(error));
      </code></pre>
      
      <h2>Parallel Promises</h2>
      <p>Use <code>Promise.all()</code> to run multiple Promises in parallel and wait for all to complete:</p>
      
      <pre><code>
Promise.all([fetchUser(1), fetchPosts(), fetchComments()])
  .then(([user, posts, comments]) => {
    // All three promises resolved
  })
  .catch(error => {
    // At least one promise rejected
  });
      </code></pre>
      
      <p>Promises have dramatically improved how we handle asynchronous code in JavaScript, making it more readable and maintainable compared to callback-based approaches.</p>
    `,
    excerpt: 'Promises are a powerful feature in JavaScript that help manage asynchronous operations. Let's dive into how they work and why they're so useful.',
    author: 'John Smith',
    date: '2024-05-10',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    categories: ['JavaScript', 'Programming'],
    tags: ['javascript', 'async', 'promises'],
    likes: 35,
    comments: [
      {
        id: '201',
        author: 'Sarah Mitchell',
        content: 'Great explanation! I always struggled with understanding Promises, but this made it much clearer.',
        date: '2024-05-11',
        likes: 3
      }
    ]
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    content: `
      <p>CSS Grid and Flexbox are powerful layout systems in CSS, each with their own strengths. Understanding when to use each can improve your design workflow significantly.</p>
      
      <h2>CSS Flexbox</h2>
      <p>Flexbox is designed for one-dimensional layouts - either a row or a column. It excels at:</p>
      <ul>
        <li>Distributing space among items in a container</li>
        <li>Aligning items</li>
        <li>Creating flexible elements that adapt to viewport size</li>
      </ul>
      
      <h2>CSS Grid</h2>
      <p>Grid is designed for two-dimensional layouts - rows and columns together. It's particularly good for:</p>
      <ul>
        <li>Creating complex grid-based layouts</li>
        <li>Precise control over rows and columns</li>
        <li>Overlapping elements</li>
      </ul>
      
      <h2>When to Use Flexbox</h2>
      <p>Flexbox is ideal when you have a single row or column of items:</p>
      <ul>
        <li>Navigation menus</li>
        <li>Form controls</li>
        <li>Cards or items that need to be evenly spaced</li>
        <li>Centering a single item (vertically and horizontally)</li>
      </ul>
      
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Circuit board layout" class="w-full h-auto my-4" />
      
      <h2>When to Use Grid</h2>
      <p>Grid is better for overall page layouts and complex arrangements:</p>
      <ul>
        <li>Overall page layouts</li>
        <li>Image galleries</li>
        <li>Complex dashboard layouts</li>
        <li>Any design where you need precise control over both rows and columns</li>
      </ul>
      
      <h2>Using Them Together</h2>
      <p>Grid and Flexbox work extremely well together. A common pattern is:</p>
      <ol>
        <li>Use Grid for the overall page layout</li>
        <li>Use Flexbox for components within the grid cells</li>
      </ol>
      
      <blockquote>
        Grid is for layout. Flexbox is for alignment. Use them accordingly, and you'll create better designs with cleaner code.
      </blockquote>
      
      <p>By leveraging the strengths of both layout systems, you can create complex, responsive layouts with relatively simple code.</p>
    `,
    excerpt: 'CSS Grid and Flexbox are powerful layout systems in CSS, each with their own strengths. Understanding when to use each can improve your design workflow significantly.',
    author: 'Emily Chen',
    date: '2024-05-08',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    categories: ['CSS', 'Web Design'],
    tags: ['css', 'layout', 'design'],
    likes: 29,
    comments: [
      {
        id: '301',
        author: 'Marcus Peters',
        content: 'This cleared up so much confusion for me! I was using Grid for everything, but now I see where Flexbox would be more appropriate.',
        date: '2024-05-09',
        likes: 6
      },
      {
        id: '302',
        author: 'Jasmine Wong',
        content: 'Great comparison! Would love to see some code examples showing them working together.',
        date: '2024-05-10',
        likes: 4
      },
      {
        id: '303',
        author: 'Tyler Ross',
        content: "I've been exclusively using Flexbox, but this motivated me to finally learn Grid. Thanks!",
        date: '2024-05-11',
        likes: 2
      }
    ]
  },
  {
    id: '4',
    title: 'Building Accessible Web Applications',
    content: `
      <p>Web accessibility is about creating websites that can be used by everyone, including people with disabilities. It's not just a nice-to-have feature; it's essential for inclusive design.</p>
      
      <h2>Why Accessibility Matters</h2>
      <p>Accessible websites:</p>
      <ul>
        <li>Reach a wider audience (over 1 billion people worldwide have some form of disability)</li>
        <li>Improve SEO</li>
        <li>Often satisfy legal requirements</li>
        <li>Generally have better usability for all users</li>
      </ul>
      
      <h2>Key Accessibility Principles</h2>
      
      <h3>1. Perceivable</h3>
      <p>Information and interface elements must be presentable to users in ways they can perceive.</p>
      <ul>
        <li>Provide text alternatives for non-text content</li>
        <li>Create content that can be presented in different ways</li>
        <li>Make it easier for users to see and hear content</li>
      </ul>
      
      <h3>2. Operable</h3>
      <p>User interface components must be operable by all users.</p>
      <ul>
        <li>Make all functionality available from a keyboard</li>
        <li>Give users enough time to read and use content</li>
        <li>Don't use content that could cause seizures</li>
        <li>Help users navigate and find content</li>
      </ul>
      
      <h3>3. Understandable</h3>
      <p>Information and operation of the interface must be understandable.</p>
      <ul>
        <li>Make text readable and understandable</li>
        <li>Make content appear and operate in predictable ways</li>
        <li>Help users avoid and correct mistakes</li>
      </ul>
      
      <h3>4. Robust</h3>
      <p>Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.</p>
      <ul>
        <li>Maximize compatibility with current and future tools</li>
        <li>Follow web standards</li>
      </ul>
      
      <h2>Practical Tips</h2>
      
      <h3>Semantic HTML</h3>
      <p>Use HTML elements for their intended purpose:</p>
      <pre><code>
<!-- Instead of this -->
<div class="button" onclick="performAction()">Click Me</div>

<!-- Use this -->
<button onclick="performAction()">Click Me</button>
      </code></pre>
      
      <h3>Alternative Text</h3>
      <p>Always provide alt text for images:</p>
      <pre><code>
<img src="graph.png" alt="Bar graph showing sales increase of 25% in Q2 2024">
      </code></pre>
      
      <h3>Keyboard Navigation</h3>
      <p>Ensure all interactive elements are accessible via keyboard:</p>
      <ul>
        <li>Use proper focus states</li>
        <li>Maintain a logical tab order</li>
        <li>Avoid keyboard traps</li>
      </ul>
      
      <p>Building with accessibility in mind from the start is much easier than retrofitting it later. By following these principles, you'll create web applications that truly work for everyone.</p>
    `,
    excerpt: 'Web accessibility is about creating websites that can be used by everyone, including people with disabilities. It's not just a nice-to-have feature; it's essential for inclusive design.',
    author: 'Michael Johnson',
    date: '2024-05-05',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    categories: ['Web Development', 'Accessibility'],
    tags: ['a11y', 'web', 'inclusive design'],
    likes: 47,
    comments: [
      {
        id: '401',
        author: 'Priya Sharma',
        content: 'Thank you for highlighting this important topic! Too many developers still ignore accessibility.',
        date: '2024-05-06',
        likes: 12
      },
      {
        id: '402',
        author: 'David Wilson',
        content: 'I'd also recommend the WAVE browser extension for testing accessibility issues. It's been really helpful on my projects.',
        date: '2024-05-07',
        likes: 9
      }
    ]
  },
  {
    id: '5',
    title: 'Introduction to API Design',
    content: `
      <p>A well-designed API (Application Programming Interface) can make or break a developer experience. Whether you're creating a public API or an internal one, following good design principles is essential.</p>
      
      <h2>What Makes a Good API?</h2>
      <p>A good API is:</p>
      <ul>
        <li><strong>Easy to learn and use</strong> - Clear documentation and intuitive design</li>
        <li><strong>Hard to misuse</strong> - Guides developers toward correct usage</li>
        <li><strong>Complete for its purpose</strong> - Covers all necessary functionality</li>
        <li><strong>Consistent</strong> - Follows patterns and conventions</li>
      </ul>
      
      <h2>RESTful Design Principles</h2>
      <p>REST (Representational State Transfer) is a popular architectural style for APIs. Key principles include:</p>
      
      <h3>Use HTTP Methods Correctly</h3>
      <pre><code>
GET /articles         // Get all articles
GET /articles/123     // Get a specific article
POST /articles        // Create a new article
PUT /articles/123     // Update an entire article
PATCH /articles/123   // Update part of an article
DELETE /articles/123  // Delete an article
      </code></pre>
      
      <h3>Use Meaningful Resource Names</h3>
      <p>Resources should be nouns, not verbs:</p>
      <pre><code>
// Good
GET /articles/123

// Avoid
GET /getArticle/123
      </code></pre>
      
      <h3>Use Proper Status Codes</h3>
      <ul>
        <li>200 OK - Successful request</li>
        <li>201 Created - Resource created</li>
        <li>400 Bad Request - Invalid input</li>
        <li>401 Unauthorized - Authentication required</li>
        <li>403 Forbidden - Authenticated but not authorized</li>
        <li>404 Not Found - Resource doesn't exist</li>
        <li>500 Internal Server Error - Server-side error</li>
      </ul>
      
      <h2>Versioning Your API</h2>
      <p>APIs evolve over time. Versioning helps maintain backward compatibility:</p>
      <pre><code>
// URL path versioning
https://api.example.com/v1/articles

// Header versioning
GET /articles
Accept: application/vnd.example.v1+json
      </code></pre>
      
      <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Developer working on API" class="w-full h-auto my-4" />
      
      <h2>Documentation</h2>
      <p>Great APIs have great documentation. Include:</p>
      <ul>
        <li>Overview and getting started guide</li>
        <li>Authentication methods</li>
        <li>Detailed endpoint descriptions</li>
        <li>Request and response examples</li>
        <li>Error handling information</li>
        <li>Rate limiting details</li>
      </ul>
      
      <h2>Error Handling</h2>
      <p>Return detailed error messages with useful information:</p>
      <pre><code>
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
      </code></pre>
      
      <h2>Security Considerations</h2>
      <ul>
        <li>Always use HTTPS</li>
        <li>Implement proper authentication</li>
        <li>Use rate limiting to prevent abuse</li>
        <li>Validate all inputs</li>
        <li>Don't expose sensitive information in error messages</li>
      </ul>
      
      <p>By following these principles, you'll create APIs that developers love to use and that stand the test of time.</p>
    `,
    excerpt: 'A well-designed API (Application Programming Interface) can make or break a developer experience. Whether you're creating a public API or an internal one, following good design principles is essential.',
    author: 'Sophia Rodriguez',
    date: '2024-05-01',
    coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    categories: ['API', 'Backend Development'],
    tags: ['rest', 'api', 'backend'],
    likes: 38,
    comments: [
      {
        id: '501',
        author: 'James Wilson',
        content: 'This is a great primer on API design. I'd add that GraphQL is worth considering as an alternative to REST for complex data requirements.',
        date: '2024-05-02',
        likes: 7
      },
      {
        id: '502',
        author: 'Liam Thompson',
        content: 'Good points about error handling. I've used APIs that return generic errors, and debugging is a nightmare!',
        date: '2024-05-03',
        likes: 3
      }
    ]
  }
];

// Store posts in localStorage if not already there
if (!localStorage.getItem('posts')) {
  localStorage.setItem('posts', JSON.stringify(postsData));
}

// Function to get posts from localStorage
function getPosts() {
  const posts = localStorage.getItem('posts');
  return posts ? JSON.parse(posts) : [];
}

// Function to save posts to localStorage
function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}
