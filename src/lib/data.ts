
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
  }
];
