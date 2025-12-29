import { 
    User, Code, Briefcase, Mail, Star, 
    Layout, Database, GitBranch, Globe, Award
} from "lucide-react";

import { IMAGES } from "./image"; 

export const BOARD_DATA = [
  
  // --- LIST 1: PROFILE ---
  {
    id: "list-profile",
    title: "Profile & Credentials",
    cards: [
      {
        id: "about-me",
        type: "about",
        title: "About Utsav",
        labels: [{ text: "Bio", color: "bg-blue-500" }, { text: "Strategy", color: "bg-purple-500" }],
        content: "Computer Science graduate blending creativity with strategy.",
        coverImage: IMAGES.profileCover, 
        fullDescription: `I’m Utsav Dodiya, a Computer Science graduate with 1.5 years of experience in web development and business analysis.

My approach lies at the intersection of **clean code** and **strategic design**. I don't just build features; I build products that solve user problems and drive business goals.

Currently looking for roles where I can connect business, design, and technology to create meaningful digital products.`,
        members: [User]
      },
      {
        id: "skills-tech",
        type: "about",
        title: "Technical Arsenal",
        labels: [{ text: "Frontend", color: "bg-green-500" }, { text: "Backend", color: "bg-yellow-500" }],
        content: "ReactJS, Tailwind, Redux, Shopify, MongoDB, SQL.",
        fullDescription: [
            { 
                category: "Frontend", 
                items: "React.js, Vite, Tailwind CSS, Framer Motion", 
                bg: "bg-blue-50", 
                text: "text-blue-700",
                span: "md:col-span-2"
            },
            { 
                category: "E-Commerce", 
                items: "Shopify (Liquid, Hydrogen), WooCommerce", 
                bg: "bg-green-50", 
                text: "text-green-700",
                span: "md:col-span-1"
            },
            { 
                category: "Backend", 
                items: "Node.js, Express", 
                bg: "bg-purple-50", 
                text: "text-purple-700",
                span: "md:col-span-1" 
            },
            { 
                category: "Database", 
                items: "MongoDB, SQL, Firebase", 
                bg: "bg-orange-50", 
                text: "text-orange-700",
                span: "md:col-span-2"
            },
            { 
                category: "Tools & Workflow", 
                items: "Git, GitHub, GitLab, Figma (UI/UX), Postman", 
                bg: "bg-gray-100", 
                text: "text-gray-700",
                span: "md:col-span-2"
            }
        ],
        members: [Code, Database]
      },
      {
        id: "skills-soft",
        type: "about",
        title: "Soft & Additional Skills",
        labels: [{ text: "Strategy", color: "bg-pink-500" }],
        content: "Agile, SEO, Google Ads, Market Research.",
        fullDescription: [
            { 
                category: "Soft Skills", 
                items: "Agile Development, Cross-Functional Collaboration, Requirement Analysis", 
                bg: "bg-pink-50", 
                text: "text-pink-700",
                span: "md:col-span-2"
            },
            { 
                category: "Marketing & Growth", 
                items: "SEO Optimization (Technical & On-page), Google Ads, Competitor Analysis", 
                bg: "bg-indigo-50", 
                text: "text-indigo-700",
                span: "md:col-span-2"
            }
        ],
        members: [Globe]
      },
      {
        id: "education",
        type: "education",
        title: "Education History",
        labels: [{ text: "B.Tech", color: "bg-indigo-500" }],
        content: "Parul Institute of Technology (CGPA: 8.10).",
        fullDescription: [
            {
                institution: "Parul Institute of Technology",
                degree: "BTECH-CSE [CGPA - 7.9/10]",
                year: "2021 - 2025"
            },
            {
                institution: "BAPS SVM Raysan",
                degree: "12th Board [PR: 97.72]",
                year: "2020 - 2021"
            },
            {
                institution: "Tripada Gurukulam",
                degree: "10th Board [PR: 99.03]",
                year: "2018 - 2019"
            }
        ],
        members: [Award]
      }
    ]
  },

  // --- LIST 2: EXPERIENCE ---
  {
    id: "list-exp",
    title: "Experience Log",
    cards: [
      {
        id: "exp-tatva-se",
        type: "experience",
        title: "Software Engineer",
        company: "Tatva Krti Inc",
        companyUrl: "https://tatvakrti.com", 
        companyLogo: IMAGES.tatvaLogo,
        location: "Remote",
        date: "06/2025 – 11/2025",
        content: "High converting React & Shopify builds.",
        labels: [{ text: "React", color: "bg-blue-400" }, { text: "Shopify", color: "bg-green-500" }],
        roleDescription: "Led frontend initiatives for D2C brands, ensuring scalability and performance optimization.",
        responsibilities: [
            "Architected high-converting landing pages using React and Tailwind, reducing bounce rates by 15%.",
            "Implemented CI/CD pipelines with automated versioning and rollback capabilities.",
            "Optimized Shopify Liquid themes for Core Web Vitals, achieving 90+ performance scores."
        ],
        members: [Briefcase, GitBranch]
      },
      {
        id: "exp-tatva-intern",
        type: "experience",
        title: "Software Dev Intern",
        company: "Tatva Krti Inc",
        companyLogo: IMAGES.tatvaLogo,
        location: "Remote",
        date: "12/2024 – 06/2025",
        content: "Workflow automation & Liquid templates.",
        labels: [{ text: "Internship", color: "bg-red-400" }],
        roleDescription: "Focused on automating internal workflows and enhancing e-commerce frontends.",
        responsibilities: [
            "Streamlined internal task sequences, reducing manual workflow time by 20%.",
            "Collaborated with UI/UX designers to translate Figma designs into pixel-perfect code.",
            "Customized Shopify templates to support complex product variants."
        ],
        members: [Briefcase]
      },
      {
        id: "exp-daveai",
        type: "experience",
        title: "Business Analyst Intern",
        company: "DaveAI",
        companyUrl: "https://www.iamdave.ai/",
        companyLogo: IMAGES.daveLogo,
        location: "Remote",
        date: "09/2024 – 12/2024",
        content: "User journey design for AR & Kiosks.",
        labels: [{ text: "Analytics", color: "bg-orange-500" }],
        roleDescription: "Designed user experiences for AI-powered interactive kiosks in high-traffic environments.",
        responsibilities: [
            "Designed user journey maps for indoor navigation kiosks deployed at airports.",
            "Conducted competitive analysis to refine the product feature roadmap.",
            "Documented technical specifications for the engineering team, ensuring clear handoffs."
        ],
        members: [User]
      }
    ]
  },

  // --- LIST 3: PROJECTS ---
  {
    id: "list-projects",
    title: "Project Backlog (Shipped)",
    cards: [
      {
        id: "proj-sudoku",
        type: "project",
        title: "DLX - Sudoku Solver",
        labels: [{ text: "Algorithm X", color: "bg-purple-600" }, { text: "JS", color: "bg-yellow-400" }],
        content: "Solved 9x9 Sudoku in <1ms using Dancing Links.",
        coverImage: IMAGES.sudoku,
        repoLink: "https://github.com/dankbit/DLX-Sudoku-Solver.git", 
        liveLink: "https://dankbit.github.io/DLX-Sudoku-Solver/",
        techStack: ["JavaScript", "Dancing Links", "Algorithms"],
        description: "A high-performance Sudoku solver implementing Knuth’s Algorithm X with Dancing Links (DLX) to handle exact cover problems with extreme efficiency.",
        challenges: [
            {
                title: "Recursion Depth & Speed",
                problem: "Standard backtracking was too slow for hard puzzles, often causing stack overflows or timeouts.",
                solution: "Implemented Dancing Links (DLX) to efficiently reverse node deletions in a doubly linked list, reducing solve time to <1ms."
            },
            {
                title: "Benchmarking Accuracy",
                problem: "Needed to verify the solver against edge-case puzzles.",
                solution: "Built a test suite running against 4,000+ standard grids to ensure 100% accuracy and consistent performance."
            }
        ],
        members: [Code]
      },
      {
        id: "proj-oak",
        type: "project",
        title: "Oak and Luna",
        labels: [{ text: "NextJS", color: "bg-black" }, { text: "E-comm", color: "bg-green-500" }],
        content: "Optimized product listings, boosting sales by 20%.",
        coverImage: IMAGES.oakLuna,
        repoLink: null,
        liveLink: "https://www.oakandluna.com/",
        techStack: ["NextJS", "React", "Optimization"],
        description: "Strategic optimization of product listing pages (PLP) and product detail pages (PDP) to enhance discoverability and speed.",
        challenges: [
            {
                title: "Page Load Speed",
                problem: "High-resolution product images were slowing down the initial render.",
                solution: "Implemented Next.js Image optimization and lazy loading to prioritize above-the-fold content."
            }
        ],
        members: [Layout]
      },
      {
        id: "proj-pajama",
        type: "project",
        title: "My Comfy Pajama",
        labels: [{ text: "Shopify", color: "bg-green-500" }, { text: "Liquid", color: "bg-blue-400" }],
        content: "E-comm store driving 30% revenue increase.",
        coverImage: IMAGES.pajama,
        repoLink: null,
        liveLink: "https://mycomfypajama.com/",
        techStack: ["Shopify Liquid", "JS", "UX Design"],
        description: "A complete overhaul of an e-commerce storefront focusing on mobile responsiveness and trust signals, resulting in immediate revenue growth.",
        challenges: [
            {
                title: "Mobile Conversion Rate",
                problem: "Mobile users were abandoning carts due to a cluttered interface.",
                solution: "Redesigned the mobile product page to prioritize the 'Add to Cart' button and simplified the variant selector."
            }
        ],
        members: [Star]
      },
      {
        id: "proj-designnook",
        type: "project",
        title: "DesignNook",
        labels: [{ text: "ReactJS", color: "bg-blue-400" }, { text: "Firebase", color: "bg-yellow-600" }],
        content: "Interior design site with smooth animations.",
        coverImage: IMAGES.designNook,
        repoLink: "https://github.com/dankbit/DesigNook.git",
        liveLink: "https://desig-nook.vercel.app/",
        techStack: ["ReactJS", "Tailwind CSS", "Firebase"],
        description: "An immersive interior design platform featuring smooth entrance animations, gallery layouts, and a secure authentication system for user inquiries.",
        challenges: [
            {
                title: "Layout Shift & Janky Animations",
                problem: "Heavy image assets caused layout shifts (CLS) and stuttering scroll animations.",
                solution: "Implemented Framer Motion for hardware-accelerated transitions and enforced aspect ratios on all images to prevent layout shifts."
            },
            {
                title: "Secure User Data",
                problem: "Needed a way to handle user inquiries without a heavy backend.",
                solution: "Integrated Firebase Auth for security and EmailJS to handle form submissions serverlessly."
            }
        ],
        members: [Layout]
      },
    ]
  },

  // --- LIST 4: CONTACT ---
  {
    id: "list-contact",
    title: "Reach Out",
    cards: [
      {
        id: "contact-info",
        type: "about",
        title: "Contact Details",
        labels: [{ text: "Hiring?", color: "bg-green-500" }],
        content: "utsavdodiya.svmr@gmail.com",
        
        // --- UPDATED LINKS HERE ---
        fullDescription: `**Email:** utsavdodiya.svmr@gmail.com
**Phone:** (+91) 9998-317-523

I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.

**Find me on:**
- [LinkedIn](https://www.linkedin.com/in/utsavdodiya/)
- [GitHub](https://github.com/dankbit)`,
        
        coverImage: "https://placehold.co/600x400/172b4d/ffffff?text=Contact+Me&font=montserrat",
        members: [Mail]
      },
      {
        id: "feedback-card",
        type: "feedback",
        title: "Feedback",
        content: "Drop a review!",
        members: []
      }
    ]
  }
];