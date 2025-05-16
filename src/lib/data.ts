
import { Post } from "./types";

export const posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with React: A Beginner's Guide",
    content: "<p>React has revolutionized the way we build user interfaces. In this comprehensive guide, we'll explore the core concepts of React and build our first component.</p><h2>Why React?</h2><p>React's component-based architecture makes it easy to build reusable UI components. Combined with its virtual DOM implementation, React offers excellent performance for modern web applications.</p><h2>Setting Up Your Environment</h2><p>Before we dive in, let's set up our development environment. You'll need Node.js installed on your machine.</p><p>After that, you can create a new React application using Create React App:</p><pre><code>npx create-react-app my-app\ncd my-app\nnpm start</code></pre><p>And you're ready to start coding!</p>",
    excerpt: "Learn the basics of React and build your first component in this beginner-friendly tutorial.",
    author: "Sarah Johnson",
    date: "2025-01-15",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    categories: ["Programming", "Web Development"],
    tags: ["React", "JavaScript", "Frontend"],
    likes: 42,
    comments: [
      {
        id: "c1",
        author: "Mike Peters",
        content: "This was incredibly helpful! Can't wait for the follow-up post.",
        date: "2025-01-16",
        likes: 5
      },
      {
        id: "c2",
        author: "Linda Chen",
        content: "I'm still having trouble with hooks. Would love to see a more detailed explanation.",
        date: "2025-01-18",
        likes: 2
      }
    ]
  },
  {
    id: "2",
    title: "CSS Grid Layout: Revolutionizing Web Design",
    content: "<p>CSS Grid has changed how we approach web layouts. This powerful tool allows for complex two-dimensional layouts that were previously difficult to achieve.</p><h2>The Basics of Grid</h2><p>Grid container and grid items form the foundation of the CSS Grid system. By declaring <code>display: grid</code>, you transform a container into a grid layout.</p><h2>Defining Your Grid</h2><p>Grid templates allow you to define columns and rows. For example:</p><pre><code>.container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-rows: auto;\n  gap: 20px;\n}</code></pre><p>This creates a three-column layout with a 1:2:1 ratio and 20px gaps between cells.</p>",
    excerpt: "Discover how CSS Grid Layout is transforming web design with its powerful two-dimensional layout capabilities.",
    author: "David Wright",
    date: "2025-02-03",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    categories: ["Web Development", "Design"],
    tags: ["CSS", "Grid", "Layout"],
    likes: 37,
    comments: [
      {
        id: "c3",
        author: "James Wilson",
        content: "I've been using Grid for a year now and it's been a game-changer!",
        date: "2025-02-04",
        likes: 8
      }
    ]
  },
  {
    id: "3",
    title: "The Future of AI in Everyday Technology",
    content: "<p>Artificial Intelligence is becoming increasingly integrated into our daily lives. From smart assistants to recommendation systems, AI is everywhere.</p><h2>Smart Home Integration</h2><p>AI-powered devices are making homes smarter and more efficient. Voice assistants can control lighting, temperature, and security systems with simple commands.</p><h2>Personalized Experiences</h2><p>Recommendation algorithms analyze your behavior to suggest content, products, and services tailored to your preferences.</p><p>While this offers convenience, it also raises important questions about privacy and data security that we must address as a society.</p>",
    excerpt: "Explore how artificial intelligence is becoming an integral part of everyday technology and changing the way we interact with our devices.",
    author: "Elena Rodriguez",
    date: "2025-03-10",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    categories: ["Technology", "AI"],
    tags: ["Artificial Intelligence", "Future Tech", "Smart Devices"],
    likes: 56,
    comments: [
      {
        id: "c4",
        author: "Robert Kim",
        content: "The privacy implications are concerning. I'd love to see an article specifically about data security in AI applications.",
        date: "2025-03-11",
        likes: 12
      },
      {
        id: "c5",
        author: "Priya Patel",
        content: "I've been using an AI writing assistant and it's been amazing for productivity!",
        date: "2025-03-12",
        likes: 7
      }
    ]
  },
  {
    id: "4",
    title: "Mastering TypeScript: Tips and Best Practices",
    content: "<p>TypeScript has become an essential tool for modern JavaScript development, offering type safety and improved developer experience.</p><h2>Why Use TypeScript?</h2><p>TypeScript adds static typing to JavaScript, helping you catch errors during development rather than at runtime. It also provides better tooling, autocompletion, and documentation.</p><h2>Advanced Type Features</h2><p>Beyond basic types, TypeScript offers powerful features like generics, union types, and utility types that can make your code more robust and expressive.</p><pre><code>// Generic function example\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\n// Union types\ntype Status = 'pending' | 'fulfilled' | 'rejected';</code></pre>",
    excerpt: "Learn how to leverage TypeScript's powerful features to write safer, more maintainable JavaScript code.",
    author: "Alex Chen",
    date: "2025-04-05",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    categories: ["Programming", "JavaScript"],
    tags: ["TypeScript", "JavaScript", "Web Development"],
    likes: 63,
    comments: [
      {
        id: "c6",
        author: "Taylor Swift",
        content: "This helped me understand why my team is transitioning to TypeScript. Thanks!",
        date: "2025-04-07",
        likes: 9
      },
      {
        id: "c7",
        author: "Dev Kumar",
        content: "The section on utility types was particularly useful. I've been using Partial<T> everywhere now.",
        date: "2025-04-08",
        likes: 5
      }
    ]
  },
  {
    id: "5",
    title: "Sustainable Web Design: Reducing Digital Carbon Footprint",
    content: "<p>As the web grows, so does its environmental impact. Sustainable web design focuses on creating websites that minimize energy consumption and carbon emissions.</p><h2>The Environmental Impact of the Web</h2><p>Every website requires energy to serve pages, power data centers, and run devices. By optimizing our sites, we can significantly reduce this impact.</p><h2>Practical Techniques</h2><p>Some key strategies include optimizing images, reducing JavaScript, implementing efficient caching, and choosing green hosting providers.</p><p>Simple changes can make a big difference - for example, using system fonts instead of custom fonts can save thousands of kilobytes per page view.</p>",
    excerpt: "Discover how to design and build websites that minimize energy consumption and reduce their environmental impact.",
    author: "Nina Greenfield",
    date: "2025-04-18",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    categories: ["Web Development", "Sustainability"],
    tags: ["Green Web", "Performance", "Optimization"],
    likes: 48,
    comments: [
      {
        id: "c8",
        author: "Eco Dev",
        content: "Great article! I've started implementing these techniques on my company's website.",
        date: "2025-04-19",
        likes: 11
      }
    ]
  },
  {
    id: "6",
    title: "Building Progressive Web Apps in 2025",
    content: "<p>Progressive Web Apps (PWAs) combine the best of web and mobile apps, offering offline capabilities, push notifications, and app-like experiences.</p><h2>Core PWA Features</h2><p>Service workers, manifest files, and HTTPS are the foundation of PWAs, enabling offline functionality, home screen installation, and secure connections.</p><h2>Modern PWA Development</h2><p>Today's PWA development leverages advanced APIs like Background Sync, Web Share, and Payment Request to create truly engaging experiences.</p><pre><code>// Registering a service worker\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(registration => console.log('SW registered'))\n    .catch(error => console.log('SW registration failed'));\n}</code></pre>",
    excerpt: "Learn how to build modern Progressive Web Apps that offer native-like experiences while maintaining the reach and accessibility of the web.",
    author: "Maria Santos",
    date: "2025-05-02",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    categories: ["Web Development", "Mobile"],
    tags: ["PWA", "JavaScript", "Service Workers"],
    likes: 71,
    comments: [
      {
        id: "c9",
        author: "Progressive Developer",
        content: "I converted our e-commerce site to a PWA and saw a 30% increase in mobile conversions!",
        date: "2025-05-03",
        likes: 14
      },
      {
        id: "c10",
        author: "Mobile First",
        content: "Great overview. I'd add that PWAs are especially valuable in regions with unreliable internet connections.",
        date: "2025-05-04",
        likes: 8
      }
    ]
  },
  {
    id: "7",
    title: "Demystifying Web3 and Blockchain for Web Developers",
    content: "<p>Web3 represents the next evolution of the internet, built on decentralized technologies like blockchain. Understanding these concepts is becoming increasingly important for web developers.</p><h2>What is Web3?</h2><p>Web3 is a vision for a decentralized web where users control their own data and digital assets, often through blockchain technology and cryptocurrencies.</p><h2>Key Technologies</h2><p>Smart contracts, decentralized storage, and self-sovereign identity are foundational technologies that power Web3 applications.</p><p>While still evolving, Web3 offers exciting possibilities for creating trustless, transparent, and user-owned web experiences.</p>",
    excerpt: "Get a clear understanding of Web3, blockchain, and decentralized technologies from a web developer's perspective.",
    author: "Satoshi Williams",
    date: "2025-05-10",
    coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    categories: ["Web Development", "Blockchain"],
    tags: ["Web3", "Blockchain", "Cryptocurrency"],
    likes: 53,
    comments: [
      {
        id: "c11",
        author: "Crypto Curious",
        content: "Finally an explanation that makes sense to me as a web developer! Would love more practical examples.",
        date: "2025-05-11",
        likes: 6
      }
    ]
  }
];

// Export these functions so they can be used in app.js or other files
export function getPosts() {
  return posts;
}

export function getPostById(id: string) {
  return posts.find(post => post.id === id);
}
