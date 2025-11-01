// Fix: Correctly import React hooks using destructuring.
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Helper for dynamic classnames
const cx = (...classes) => classes.filter(Boolean).join(' ');

// --- Data (Moved to top-level for state initialization) ---
const motivationalQuotes = [
  { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
  { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
];

const initialServiceData = [
    {
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
        title: "Web App Development",
        description: "Creating powerful, scalable web applications tailored to your business needs using modern technologies.",
        longDescription: "We specialize in building custom web applications from scratch, ensuring they are perfectly aligned with your business objectives. Our team utilizes the latest frameworks like React, Vue, and Angular, coupled with robust back-end technologies like Node.js and Python, to deliver solutions that are fast, secure, and scalable. From single-page applications to complex enterprise platforms, we've got you covered."
    },
    {
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
        title: "Mobile App Development",
        description: "Building intuitive and high-performing native and cross-platform apps for both iOS and Android.",
        longDescription: "Reach your customers on the go with our mobile app development services. We build high-quality, user-friendly mobile apps for both iOS and Android platforms. Whether you need a native app for maximum performance or a cross-platform solution using React Native or Flutter to save time and cost, our expert developers will create an app that your users will love."
    },
    {
        image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
        title: "UI/UX Design",
        description: "Designing beautiful, user-centric interfaces that offer seamless user experiences and drive engagement.",
        longDescription: "A great product starts with a great design. Our UI/UX design team focuses on creating intuitive, engaging, and aesthetically pleasing interfaces that provide a seamless user experience. We conduct thorough user research, create wireframes and prototypes, and perform usability testing to ensure the final design is not only beautiful but also highly functional and user-friendly."
    },
    {
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
        title: "API Integration",
        description: "Connecting your applications with third-party services to extend functionality and streamline operations.",
        longDescription: "Enhance your application's capabilities by integrating it with third-party services. We have extensive experience in integrating various APIs, including payment gateways, social media platforms, mapping services, and more. We ensure seamless and secure data flow between your application and external services, expanding its functionality and improving operational efficiency."
    },
    {
        image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
        title: "Cloud Solutions",
        description: "Leveraging cloud platforms like AWS, Azure, and GCP for scalable, secure, and cost-effective infrastructure.",
        longDescription: "Harness the power of the cloud with our expert cloud solutions. We help businesses migrate to the cloud, optimize their cloud infrastructure, and build cloud-native applications. Our expertise spans across major cloud providers like Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), ensuring your infrastructure is scalable, secure, and cost-efficient."
    },
    {
        image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
        title: "DevOps & CI/CD",
        description: "Automating and streamlining your development lifecycle for faster, more reliable software delivery.",
        longDescription: "Accelerate your software delivery process with our DevOps and CI/CD services. We help you automate your build, test, and deployment pipelines, enabling you to release new features faster and more reliably. Our expertise in tools like Docker, Kubernetes, Jenkins, and GitHub Actions ensures a streamlined and efficient development lifecycle from code commit to production."
    }
];

const initialProjects = [
    { 
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", 
        title: "Fintech Dashboard", 
        description: "A comprehensive data visualization tool for financial analysis.",
        longDescription: "This advanced dashboard provides real-time financial data visualization, helping traders and analysts make informed decisions. It features customizable widgets, historical data charting, and integration with multiple financial APIs for a complete market overview.",
        techStack: ["React", "D3.js", "Node.js", "WebSocket", "PostgreSQL"]
    },
    { 
        image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", 
        title: "E-commerce Platform", 
        description: "A scalable online store with a custom checkout experience.",
        longDescription: "A full-featured e-commerce platform built from the ground up, with a focus on performance and user experience. Includes product management, a secure payment gateway integration with Stripe, user authentication, and a customer review system to drive sales.",
        techStack: ["Vue.js", "Express", "Stripe API", "MongoDB"]
    },
    { 
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", 
        title: "Healthcare Mobile App", 
        description: "A HIPAA-compliant app for patient-doctor communication.",
        longDescription: "A secure mobile application that facilitates communication between patients and healthcare providers. Features include appointment scheduling, secure messaging, video consultations via WebRTC, and prescription refill requests, all while adhering to strict HIPAA privacy regulations.",
        techStack: ["React Native", "Firebase", "WebRTC", "iOS", "Android"]
    },
    { 
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", 
        title: "Social Media Analytics Platform", 
        description: "Real-time tracking and analysis of social media engagement.",
        longDescription: "A powerful analytics tool designed for marketers to monitor social media trends, track campaign performance, and gain insights into audience behavior across multiple platforms. It features a customizable dashboard, sentiment analysis, and automated PDF reporting.",
        techStack: ["Next.js", "GraphQL", "Prisma", "Tailwind CSS", "Vercel"]
    },
];

// Fix: Moved icon component definitions before their use in `initialTechnologies` to resolve "used before declaration" errors.
// --- Tech Stack Icons ---
const JavaScriptIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="#f7df1e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm3.3 12.01c-.18.12-.4.18-.65.18-.3 0-.57-.08-.79-.23-.22-.15-.33-.38-.33-.66 0-.3.1-.53.3-.71.2-.18.49-.27.85-.27.23 0 .43.03.59.08l.16.06v-1.11c-.22-.08-.5-.12-.85-.12-.43 0-.79.1-1.09.31-.3.2-.53.49-.68.85-.15.37-.22.78-.22 1.24 0 .5.1.95.29 1.34.2.4.48.72.84.95.37.23.8.35 1.29.35.45 0 .84-.09 1.18-.28.34-.18.51-.48.51-.88 0-.23-.07-.44-.2-.63zm-4.69-2.28c0 .32-.05.58-.14.79-.1.2-.24.36-.43.46-.19.1-.42.15-.7.15-.27 0-.5-.04-.69-.13s-.33-.23-.44-.42c-.1-.19-.16-.42-.16-.69 0-.47.11-.86.34-1.18.23-.32.55-.48.96-.48.43 0 .76.14.99.43.23.29.35.65.35 1.07z"/></svg>);
const ReactIcon = (props) => (<svg {...props} viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="#61dafb"></circle><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>);
const NodeIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="#339933"><path d="M11.39 2.13l-7.9 4.56a1 1 0 00-.5 1.73v9.16a1 1 0 00.5 1.73l7.9 4.56a1 1 0 001.5-.86v-9.16a1 1 0 00-1-1.73l-6.9-4-1 4a1 1 0 001 1.73l6.9 4v.16a1 1 0 001 1.73l6.9-4a1 1 0 00-1-1.73l-6.9 4V7.43a1 1 0 00-.5-.86l-7.9-4.56-1.5.86 7.9 4.56a1 1 0 00.5.86v9.16a1 1 0 001 0l7.9-4.56a1 1 0 00.5-.86V7.43a1 1 0 00-.5-.86L12.1 2.13a1 1 0 00-1.5 0z"/></svg>);
const PythonIcon = (props) => (<svg {...props} viewBox="0 0 24 24"><path fill="#3776ab" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,6A2,2 0 0,1 13,8V10H11V8A2,2 0 0,1 9,6H7V11H15V13A2,2 0 0,1 13,15H11V18A2,2 0 0,1 9,20H7V15H9A2,2 0 0,1 11,13V11H17V6H11Z" /><path fill="#ffd43b" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,18A2,2 0 0,1 15,20H13V14H19V16A2,2 0 0,1 17,18M13,11V8A2,2 0 0,1 15,6H17V11H13Z" /></svg>);
const AWSIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="#FF9900"><path d="M12.31,11.24a1,1,0,0,0,1.23,1.57,11,11,0,0,1,6.58,1.86,1,1,0,0,0,1.15-1.65,13,13,0,0,0-7.81-2.18A1,1,0,0,0,12.31,11.24Zm-7.73,6.29a1,1,0,0,0,1.65,1.15,11,11,0,0,1,10.74,0,1,1,0,0,0,1.65-1.15,13,13,0,0,0-14,0ZM21.61,5.32a1,1,0,0,0-1.29.62,11,11,0,0,1-15.76,6.3,1,1,0,1,0-1-1.73,13,13,0,0,1,18.06-5.18A1,1,0,0,0,21.61,5.32Z"/></svg>);
const DockerIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="#2496ed"><path d="M22.12 9.42c-.37-1.11-.8-2.19-1.3-3.23a2.91 2.91 0 00-1.12-1.12c-1.04-.5-2.12-.93-3.23-1.3A15.34 15.34 0 0012 3c-1.4 0-2.77.19-4.09.57-1.11.37-2.19.8-3.23 1.3a2.91 2.91 0 00-1.12 1.12c-.5 1.04-.93 2.12-1.3 3.23C1.92 10.74 1.73 12.11 1.73 13.5c0 .3 0 .59.03.88a.5.5 0 00.5.47h2.15c.23 0 .43-.16.48-.38.03-.12.04-.25.04-.37 0-.39 0-.78.06-1.17.2-.95.5-1.88.88-2.76a.48.48 0 01.46-.35h2.12c.23 0 .44.17.48.39.06.31.1.62.14.93v7.1c0 .28-.22.5-.5.5h-2.17a.5.5 0 01-.48-.39c-.38-.88-.69-1.81-.88-2.76a.48.48 0 00-.46-.35H2.27a.5.5 0 00-.5.47c.03.3.03.58.03.88 0 1.39.19 2.76.57 4.09.37 1.11.8 2.19 1.3 3.23a2.91 2.91 0 001.12 1.12c1.04.5 2.12.93 3.23 1.3C9.23 22.08 10.6 22.27 12 22.27c3.15 0 6.09-.94 8.52-2.61a12.8 12.8 0 002.61-8.52c.25-1.74.06-3.49-.58-5.15l.01-.01zM8.5 8.24h2.13V6.12H8.5v2.12zm-2.63 0h2.13V6.12H5.87v2.12zm5.26 0h2.12V6.12h-2.12v2.12zm-2.63 0h2.12V6.12h-2.12v2.12zm-2.63 2.63h2.13V8.74H8.5v2.13zm-2.63 0h2.13V8.74H5.87v2.13z"/></svg>);
const KubernetesIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="#326ce5"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M8.5,8L11,11.5L8.5,15H10.5L12,13L13.5,15H15.5L13,11.5L15.5,8H13.5L12,10L10.5,8H8.5M12,11.5A1.5,1.5 0 0,0 10.5,10L8.5,12L10.5,14A1.5,1.5 0 0,0 12,11.5M12,11.5A1.5,1.5 0 0,1 13.5,13L15.5,11L13.5,9A1.5,1.5 0 0,1 12,11.5Z"/></svg>);
const MongoIcon = (props) => (<svg {...props} viewBox="0 0 24 24"><path fill="#4DB33D" d="M15.1,13.4c-0.3,0.3-0.6,0.5-0.9,0.7c-0.2,0.1-0.4,0.2-0.5,0.4c-0.1,0.2-0.1,0.4,0.1,0.6c0.1,0.1,0.2,0.2,0.4,0.2c0.1,0,0.3,0,0.4-0.1c0.1-0.1,0.2-0.2,0.3-0.3c1.7-1.4,2.2-3.5,1.4-5.4C15.4,7.7,13.6,7,12,7.9c-2.3,1.3-3,4.2-1.7,6.5c0.1,0.2,0.2,0.3,0.3,0.4C10.7,15,10.9,15,11,15c0.2,0,0.4-0.1,0.5-0.2c0.2-0.2,0.2-0.5,0.1-0.7c-0.1-0.2-0.3-0.3-0.5-0.4c-0.4-0.2-0.7-0.5-0.9-0.8c-0.8-1-0.5-2.4,0.5-3.2c1-0.8,2.4-0.5,3.2,0.5C14.7,10.7,15.6,12.2,15.1,13.4z"/><path fill="#3F9A36" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z"/><path fill="#4DB33D" d="M10.8,17.2c-0.1,0-0.3,0-0.4,0.1c-0.1,0.1-0.2,0.2-0.3,0.3C8.4,19.1,7.9,17,9.1,15.2c0.9-1.4,2.6-2,4.3-1.4c0.2,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.2,0.3,0.2,0.4c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2c-0.1,0-0.3-0.1-0.4-0.2c-1.2-0.6-2.6-0.1-3.2,1.1C9,17.1,10.2,17.4,10.8,17.2z"/></svg>);

const initialTechnologies = [
    { name: 'JavaScript (ES6+)', icon: <JavaScriptIcon className="skill-icon" /> },
    { name: 'React', icon: <ReactIcon className="skill-icon" /> },
    { name: 'Node.js', icon: <NodeIcon className="skill-icon" /> },
    { name: 'Python', icon: <PythonIcon className="skill-icon" /> },
    { name: 'AWS', icon: <AWSIcon className="skill-icon" /> },
    { name: 'Docker', icon: <DockerIcon className="skill-icon" /> },
    { name: 'Kubernetes', icon: <KubernetesIcon className="skill-icon" /> },
    { name: 'MongoDB', icon: <MongoIcon className="skill-icon" /> },
];

const initialTestimonials = [
    { 
        quote: "Working with them was a game-changer for our business. The final product exceeded our expectations in every way.", 
        author: "Jane Doe", 
        company: "CEO, Innovate Inc.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200"
    },
    { 
        quote: "Their team's technical expertise and commitment to quality are unparalleled. They delivered on time and on budget.", 
        author: "John Smith", 
        company: "CTO, Tech Solutions",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200"
    },
    { 
        quote: "The design process was incredibly collaborative. They truly listened to our feedback and created a beautiful, intuitive app.", 
        author: "Emily White", 
        company: "Product Manager, Creative Co.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200"
    },
    { 
        quote: "The level of professionalism and the speed of delivery were outstanding. They are a reliable partner for any tech venture.", 
        author: "Alex Johnson", 
        company: "Founder, Startup Hub",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200"
    },
];

// --- SVG Icons ---
const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
);
const LinkedinIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const TwitterIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4-1.4-2.8-2.3c0 0-4.1 2.8-7.2 2.8c-3.3 0-6-2.2-6-6.3c0-4.4 2.8-6.3 6-6.3c2.2 0 4.1 1.4 4.1 1.4s1.4-1.4 2.8-1.4c0 0 .7 1.4 1.4 2.8c0 0 .7 1.4 1.4 2.8z" /></svg>
);
const GithubIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
);
const ChatIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const SendIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
const SunIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const MoonIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);


// --- Client Logos ---
const ClientLogo1 = (props) => (<svg {...props} viewBox="0 0 100 30" fill="currentColor"><path d="M50,0 L100,0 L75,30 L25,30 Z M0,0 L50,0 L25,30 L-25,30 Z"></path></svg>);
const ClientLogo2 = (props) => (<svg {...props} viewBox="0 0 100 30" fill="currentColor"><path d="M15,0 A15,15 0 0,1 15,30 A15,15 0 0,1 15,0 Z M50,15 A15,15 0 1,0 80,15 Z M85,0 L85,30 L100,30 L100,0 Z"></path></svg>);
const ClientLogo3 = (props) => (<svg {...props} viewBox="0 0 100 30" fill="currentColor"><path d="M0,15 L15,0 L30,15 L15,30 Z M40,0 L100,0 L100,10 L50,10 L50,20 L100,20 L100,30 L40,30 Z"></path></svg>);
const ClientLogo4 = (props) => (<svg {...props} viewBox="0 0 100 30" fill="currentColor"><path d="M0,0 L30,0 L30,30 L0,30 Z M15,15 L45,0 L75,15 L45,30 Z M70,0 L100,0 L100,30 L70,30 Z"></path></svg>);
const ClientLogo5 = (props) => (<svg {...props} viewBox="0 0 100 30" fill="currentColor"><circle cx="15" cy="15" r="15"></circle><rect x="40" y="0" width="20" height="30"></rect><path d="M70,0 L100,15 L70,30 Z"></path></svg>);

// --- Custom Hooks ---
function useScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}

function useInView(options) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  // Fix: Add `as const` to ensure a tuple type is inferred by TypeScript.
  return [ref, isInView] as const;
}

// --- Components ---

const ParticleBackground = ({ particleCount = 100 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        
        const init = () => {
            particles = [];
            let count = (canvas.width * canvas.height / 10000) * (particleCount / 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = (Math.random() * 1 - 0.5) * 0.5;
                this.speedY = (Math.random() * 1 - 0.5) * 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.1) this.size -= 0.005;
                
                if (this.size <= 0.1) {
                    this.reset();
                }
                 if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = (Math.random() * 1 - 0.5) * 0.5;
                this.speedY = (Math.random() * 1 - 0.5) * 0.5;
            }
            draw() {
                ctx.fillStyle = 'rgba(170, 170, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(170, 170, 255, ${1 - distance / 120})`;
                        ctx.lineWidth = 0.3;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
          setCanvasSize();
          init();
        }

        setCanvasSize();
        init();
        animate();
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount]);

    const canvasStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    };

    return <canvas ref={canvasRef} style={canvasStyle}></canvas>;
};


const AnimatedSection = ({ children, className = '' }: { children?: React.ReactNode; className?: string; }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const style: React.CSSProperties = {
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
  };
  return <div ref={ref} style={style} className={className}>{children}</div>;
};

const Header = ({ onGetQuoteClick, onAdminLoginClick, isAdminLoggedIn, onDashboardClick, onLogoutClick, theme, toggleTheme }) => {
  const scrolled = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ["Services", "Portfolio", "About", "Skills", "Testimonials", "Contact"];

  const handleNavLinkClick = (e, link) => {
    e.preventDefault();
    const targetId = link.toLowerCase();
    const targetElement = document.getElementById(targetId);
    
    const headerOffset = 80; 

    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const ThemeToggleButton = (
      <button className="theme-toggle-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <SunIcon width={20} height={20}/> : <MoonIcon width={20} height={20}/>}
      </button>
  );

  return (
    <header className={cx("site-header", scrolled && "scrolled")}>
      <nav className="nav-container">
        <a onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="site-logo">TT-Tech</a>
        
        <div className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} onClick={(e) => handleNavLinkClick(e, link)} className="nav-link">{link}</a></li>
            ))}
          </ul>
          <button className="cta-button" onClick={onGetQuoteClick}>Get a Quote</button>
           {isAdminLoggedIn ? (
              <>
                <button className="cta-button secondary" onClick={onDashboardClick}>Dashboard</button>
                <button className="cta-button" onClick={onLogoutClick}>Logout</button>
              </>
            ) : (
              <button className="cta-button secondary" onClick={onAdminLoginClick}>Admin Login</button>
            )}
          {ThemeToggleButton}
        </div>
        
        <button className="mobile-nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
        
        <div className={cx("mobile-nav-menu", isMenuOpen && "open")}>
            <ul className="nav-links">
                {navLinks.map(link => (
                    <li key={link}>
                        <a href={`#${link.toLowerCase()}`} onClick={(e) => handleNavLinkClick(e, link)} className="nav-link">{link}</a>
                    </li>
                ))}
            </ul>
             <button className="cta-button" onClick={onGetQuoteClick}>Get a Quote</button>
             {isAdminLoggedIn ? (
              <>
                <button className="cta-button secondary" onClick={onDashboardClick}>Dashboard</button>
                <button className="cta-button" onClick={onLogoutClick}>Logout</button>
              </>
            ) : (
              <button className="cta-button secondary" onClick={onAdminLoginClick}>Admin Login</button>
            )}
            {ThemeToggleButton}
        </div>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section className="hero">
    <ParticleBackground particleCount={150} />
    <div className="container hero-content">
      <h1 className="hero-title">Turning Ideas into <span className="gradient-text">Digital Reality</span></h1>
      <p className="hero-subtitle">We design and develop high-performance web and mobile applications that drive business growth. Your tech partner for success.</p>
      <button className="cta-button large">Let's Build Your App</button>
    </div>
  </section>
);

const Clients = () => (
    <div className="container" style={{padding: '2rem 0'}}>
        <h4 style={{textAlign: 'center', color: 'var(--text-muted-color)', marginBottom: '2rem', fontWeight: 500}}>TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE</h4>
        <div className="clients-container">
            <ClientLogo1 className="client-logo" />
            <ClientLogo2 className="client-logo" />
            <ClientLogo4 className="client-logo" />
            <ClientLogo5 className="client-logo" />
        </div>
    </div>
);

const Services = ({ services, onCardClick }) => {
    return (
        <section id="services" className="section with-particles">
            <ParticleBackground particleCount={80} />
            <div className="container content-layer">
                <AnimatedSection>
                    <h2 className="section-title">Our <span>Services</span></h2>
                </AnimatedSection>
                <div className="slider-container">
                    <div className="slider-track" style={{ animation: 'slide 40s linear infinite' }}>
                        {[...services, ...services].map((service, i) => (
                            <div 
                                key={i} 
                                className="service-card"
                            >
                                <div className="service-card-image-container">
                                    <div 
                                        className="service-card-image"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    ></div>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <button className="cta-button view-more-btn" onClick={() => onCardClick(service)}>View More</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Portfolio = ({ projects, onCardClick }) => {
    const [expandedProjects, setExpandedProjects] = useState({});

    const toggleExpand = (e, index) => {
        e.stopPropagation(); // Prevent the card's onClick from firing
        setExpandedProjects(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <section id="portfolio" className="section">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">Our <span>Portfolio</span></h2>
                </AnimatedSection>
                <div className="slider-container">
                    <div className="slider-track" style={{ animation: 'slide 60s linear infinite reverse' }}>
                        {[...projects, ...projects].map((project, i) => (
                            <div 
                                key={i} 
                                className="portfolio-card"
                                onClick={() => onCardClick(project)}
                            >
                                <div className="portfolio-image-wrapper">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="portfolio-image" 
                                        loading="lazy" 
                                        decoding="async" 
                                    />
                                </div>
                                <div className="portfolio-content">
                                    <h3>{project.title}</h3>
                                    <p>{expandedProjects[i % projects.length] ? project.longDescription : project.description}</p>
                                    <button className="cta-button view-more-btn" onClick={(e) => toggleExpand(e, i % projects.length)}>
                                        {expandedProjects[i % projects.length] ? 'View Less' : 'View More'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const About = () => (
    <section id="about" className="section">
        <div className="container">
            <AnimatedSection>
                <h2 className="section-title"><span>About</span> Us</h2>
                <div className="about-layout">
                    <div className="about-content">
                        <h3>Your Tech Partner for Growth.</h3>
                        <p>We are a team of passionate developers, designers, and strategists dedicated to helping businesses succeed through technology. Our mission is to transform your vision into reality by building innovative and robust digital products.</p>
                        <p>With a focus on collaboration and transparency, we work closely with our clients at every stage of the product lifecycle, from initial concept to deployment and beyond.</p>
                        <button className="cta-button">Meet The Team</button>
                    </div>
                    <div className="about-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200" alt="Our team" />
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
);

const Skills = ({ technologies }) => {
    return (
        <section id="skills" className="section">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">Our <span>Technology Stack</span></h2>
                    <div className="slider-container skills-slider">
                        <div className="slider-track" style={{ animation: 'slide 30s linear infinite' }}>
                            {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, i) => (
                                <div key={`${tech.name}-${i}`} className="skill-item">
                                    {tech.icon}
                                    <span className="skill-tooltip">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const Testimonials = ({ testimonials }) => {
    return (
        <section id="testimonials" className="section">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title">What Our <span>Clients Say</span></h2>
                    <div className="slider-container">
                       <div className="slider-track" style={{ animation: 'slide 50s linear infinite reverse' }}>
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <div key={i} className="testimonial-card">
                                    <p>"{t.quote}"</p>
                                    <div className="testimonial-author">
                                        <img src={t.image} alt={t.author} />
                                        <div>
                                            <strong>{t.author}</strong>
                                            <div>{t.company}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [touched, setTouched] = useState({ name: false, email: false, message: false });
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

    const validate = (data) => {
        const tempErrors: { name?: string; email?: string; message?: string } = {};
        if (!data.name.trim()) {
            tempErrors.name = "Name is required.";
        } else if (data.name.trim().length < 2) {
            tempErrors.name = "Name must be at least 2 characters long.";
        }

        if (!data.email.trim()) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            tempErrors.email = "Please enter a valid email address.";
        }

        if (!data.message.trim()) {
            tempErrors.message = "Message is required.";
        } else if (data.message.trim().length < 10) {
            tempErrors.message = "Message must be at least 10 characters long.";
        }
        return tempErrors;
    };
    
    useEffect(() => {
        setErrors(validate(formData));
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true });

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            setSubmissionStatus('submitting');
            
            try {
                const response = await fetch('https://formsubmit.co/ajax/talhatai1356@gmail.com', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        _subject: `New contact from your portfolio: ${formData.name}`,
                    })
                });

                if (response.ok) {
                    setSubmissionStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                    setTouched({ name: false, email: false, message: false });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                setSubmissionStatus('error');
            }
        }
    };

    const handleResetForm = () => {
        setSubmissionStatus('idle');
    }
    
    const isFormValid = Object.keys(errors).length === 0;

    return (
        <section id="contact" className="section">
            <div className="container">
                <AnimatedSection>
                    <h2 className="section-title"><span>Contact</span> Us</h2>
                    <div className="contact-layout">
                        <div className="contact-info">
                            <h3>Let's build something amazing together.</h3>
                            <p>Have a project in mind or just want to say hello? Drop us a line.</p>
                            <p><strong>Email:</strong> talhatai1356@gmail.com</p>
                            <p><strong>Phone:</strong> 9511892846</p>
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/talha-tai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
                                <a href="https://github.com/Talha1356" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
                            </div>
                        </div>

                        {submissionStatus === 'success' ? (
                            <div className="form-submission-feedback">
                                <h3>Thank You!</h3>
                                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                                <button onClick={handleResetForm} className="cta-button">Send Another Message</button>
                            </div>
                        ) : submissionStatus === 'error' ? (
                            <div className="form-submission-feedback">
                                <h3>Oops! Something went wrong.</h3>
                                <p>We couldn't send your message. Please try again later or contact us directly via email.</p>
                                <button onClick={handleResetForm} className="cta-button">Try Again</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <input 
                                      type="text" 
                                      name="name" 
                                      placeholder="Your Name" 
                                      className={cx("form-input", touched.name && errors.name && "error")}
                                      value={formData.name}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    {touched.name && errors.name && <p className="error-message">{errors.name}</p>}
                                </div>
                                <div className="form-group">
                                    <input 
                                      type="email" 
                                      name="email" 
                                      placeholder="Your Email" 
                                      className={cx("form-input", touched.email && errors.email && "error")}
                                      value={formData.email}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    {touched.email && errors.email && <p className="error-message">{errors.email}</p>}
                                </div>
                                <div className="form-group">
                                    <textarea 
                                      name="message" 
                                      rows={5} 
                                      placeholder="Your Message" 
                                      className={cx("form-input", touched.message && errors.message && "error")}
                                      value={formData.message}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    ></textarea>
                                    {touched.message && errors.message && <p className="error-message">{errors.message}</p>}
                                </div>
                                <button 
                                  type="submit" 
                                  className="cta-button full-width" 
                                  disabled={submissionStatus === 'submitting' || !isFormValid}
                                >
                                  {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};


const Footer = () => {
    const handleQuickLinkClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        
        const headerOffset = 80; 

        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <div className="footer-logo">TT-Tech</div>
                        <p>Turning Ideas into Digital Reality. We build innovative and robust digital products for businesses worldwide.</p>
                    </div>
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <a href="#services" onClick={(e) => handleQuickLinkClick(e, 'services')}>Services</a>
                        <a href="#portfolio" onClick={(e) => handleQuickLinkClick(e, 'portfolio')}>Portfolio</a>
                        <a href="#about" onClick={(e) => handleQuickLinkClick(e, 'about')}>About Us</a>
                        <a href="#contact" onClick={(e) => handleQuickLinkClick(e, 'contact')}>Contact</a>
                    </div>
                    <div className="footer-column">
                        <h4>Connect With Us</h4>
                        <p>talhatai1356@gmail.com</p>
                        <div className="footer-socials">
                            <a href="https://www.linkedin.com/in/talha-tai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
                            <a href="https://github.com/Talha1356" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TT-Tech Solutions. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const QuoteModal = ({ isOpen, quote, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <XIcon />
                </button>
                <p style={{ fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-color)' }}>"{quote.quote}"</p>
                <p style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--primary-color)' }}>- {quote.author}</p>
            </div>
        </div>
    );
};

const PortfolioModal = ({ isOpen, project, onClose }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content portfolio-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}><XIcon /></button>
                <img src={project.image} alt={project.title} className="portfolio-modal-image"/>
                <h2>{project.title}</h2>
                <p className="long-description">{project.longDescription}</p>
                <div className="tech-stack">
                    <h4>Tech Stack</h4>
                    <div className="tech-stack-items">
                        {project.techStack.map(tech => (
                            <span key={tech} className="tech-stack-item">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServiceModal = ({ isOpen, service, onClose }) => {
    if (!isOpen || !service) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content service-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}><XIcon /></button>
                <img src={service.image} alt={service.title} className="service-modal-image"/>
                <h2>{service.title}</h2>
                <p className="long-description">{service.longDescription}</p>
            </div>
        </div>
    );
};

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setEmail('');
            setPassword('');
            setError('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'talha@gmail.com' && password === '123456') {
            onLoginSuccess();
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}><XIcon /></button>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message" style={{textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}
                    <button type="submit" className="cta-button full-width">Login</button>
                </form>
            </div>
        </div>
    );
};

const AdminDashboard = ({
    isOpen,
    onLogout,
    servicesData, setServicesData,
    projectsData, setProjectsData,
    technologiesData, setTechnologiesData,
    testimonialsData, setTestimonialsData
}) => {
    const [activeSection, setActiveSection] = useState('Services');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        setIsFormVisible(false);
        setCurrentItem(null);
    }, [activeSection]);

    if (!isOpen) return null;

    const sections = {
        Services: { data: servicesData, setData: setServicesData, fields: ['title', 'description', 'longDescription', 'image'] },
        Portfolio: { data: projectsData, setData: setProjectsData, fields: ['title', 'description', 'longDescription', 'image', 'techStack'] },
        Skills: { data: technologiesData, setData: setTechnologiesData, fields: ['name'] },
        Testimonials: { data: testimonialsData, setData: setTestimonialsData, fields: ['quote', 'author', 'company', 'image'] },
    };

    const handleAddNew = () => {
        const newItem = sections[activeSection].fields.reduce((acc, field) => {
            acc[field] = field === 'techStack' ? [] : '';
            return acc;
        }, {});
        if (activeSection === 'Skills') {
             newItem.icon = <div className="skill-icon placeholder">?</div>;
        }
        setCurrentItem(newItem);
        setIsFormVisible(true);
    };

    const handleEditByIndex = (item, index) => {
        setCurrentItem({ ...item, _index: index });
        setIsFormVisible(true);
    };

    const handleDeleteByIndex = (indexToDelete) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const { setData } = sections[activeSection];
            setData(prevData => prevData.filter((_, index) => index !== indexToDelete));
        }
    };
    
    const handleFormChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCurrentItem(prev => ({ ...prev, [name]: reader.result as string }));
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            if (name === 'techStack') {
                setCurrentItem(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
            } else {
                setCurrentItem(prev => ({ ...prev, [name]: value }));
            }
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { setData } = sections[activeSection];
        
        if (typeof currentItem._index !== 'undefined') {
            const originalIndex = currentItem._index;
            const updatedItem = { ...currentItem };
            delete updatedItem._index;

            setData(prevData => {
                const newData = [...prevData];
                newData[originalIndex] = updatedItem;
                return newData;
            });
        } else {
            const newItem = { ...currentItem };
            delete newItem._index;
            setData(prevData => [...prevData, newItem]);
        }
        setIsFormVisible(false);
        setCurrentItem(null);
    };

    const renderTable = () => {
        const { data, fields } = sections[activeSection];
        const displayFields = fields.filter(f => f !== 'longDescription' && f !== 'icon').slice(0, 3);

        return (
            <table className="admin-table">
                <thead>
                    <tr>
                        {displayFields.map(field => <th key={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</th>)}
                        <th style={{width: '150px'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {displayFields.map(field => (
                                <td key={field}>
                                    {field === 'image' ? (
                                        <img src={item[field]} alt="" style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}} />
                                    ) : (
                                        String(item[field]).length > 50 ? String(item[field]).substring(0, 50) + '...' : String(item[field])
                                    )}
                                </td>
                            ))}
                            <td className="admin-actions">
                                <button className="cta-button secondary" onClick={() => handleEditByIndex(item, index)}>Edit</button>
                                <button className="cta-button" onClick={() => handleDeleteByIndex(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderForm = () => {
        if (!currentItem) return null;
        const { fields } = sections[activeSection];
        return (
            <div className="admin-form-container">
                <h3>{typeof currentItem._index !== 'undefined' ? 'Edit' : 'Add'} {activeSection.slice(0, -1)}</h3>
                <form onSubmit={handleSave}>
                    {fields.map(field => {
                         const value = currentItem[field] || '';
                         const isTextArea = ['description', 'longDescription', 'quote'].includes(field);
                         const isImage = field === 'image';
                         const inputValue = Array.isArray(value) ? value.join(', ') : value;

                        return (
                             <div className="form-group" key={field}>
                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                                {isImage ? (
                                    <div>
                                        <input 
                                            type="file" 
                                            id={field} 
                                            name={field}
                                            accept="image/*"
                                            onChange={handleFormChange}
                                            className="form-input"
                                        />
                                        {value && <img src={value} alt="Preview" className="admin-image-preview" />}
                                    </div>
                                ) : isTextArea ? (
                                    <textarea 
                                        id={field} 
                                        name={field} 
                                        value={inputValue} 
                                        onChange={handleFormChange}
                                        rows={4} 
                                        className="form-input" 
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        id={field} 
                                        name={field} 
                                        value={inputValue} 
                                        onChange={handleFormChange}
                                        className="form-input" 
                                    />
                                )}
                            </div>
                        )
                    })}
                     <div className="admin-form-actions">
                        <button type="button" className="cta-button secondary" onClick={() => setIsFormVisible(false)}>Cancel</button>
                        <button type="submit" className="cta-button">Save</button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="admin-dashboard">
           <div className="admin-sidebar">
               <h2>Admin Panel</h2>
               {Object.keys(sections).map(sectionName => (
                   <div key={sectionName} className={cx("admin-nav-item", activeSection === sectionName && "active")} onClick={() => setActiveSection(sectionName)}>
                     {sectionName}
                   </div>
               ))}
               <button className="cta-button" onClick={onLogout}>Logout</button>
           </div>
           <div className="admin-content">
               {isFormVisible ? renderForm() : (
                    <>
                       <div className="admin-content-header">
                          <h3>Manage {activeSection}</h3>
                          <button className="cta-button" onClick={handleAddNew}>Add New</button>
                       </div>
                       {renderTable()}
                   </>
               )}
           </div>
        </div>
    );
};

const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
             setMessages([{ sender: 'bot', text: 'Hello! How can we help you today?' }]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);
    
    const getBotResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello there! How can I help you today?";
        }
        if (lowerInput.includes('service') || lowerInput.includes('develop')) {
            return "We offer a range of services including Web, Mobile, and UI/UX design. What are you interested in?";
        }
        if (lowerInput.includes('pricing') || lowerInput.includes('cost')) {
            return "For pricing details, could you please tell me more about your project requirements?";
        }
         if (lowerInput.includes('thanks') || lowerInput.includes('thank you')) {
            return "You're welcome! Is there anything else I can assist you with?";
        }
        return "Thanks for your message! An agent will be with you shortly.";
    };
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const newUserMessage = { sender: 'user', text: trimmedInput };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);
        
        setTimeout(() => {
            const botResponse = getBotResponse(trimmedInput);
            setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="live-chat-widget">
            <div className={cx("chat-window", isOpen && "open")}>
                <div className="chat-header">
                    <h3>Live Chat</h3>
                    <button onClick={() => setIsOpen(false)}><XIcon width={20} height={20} /></button>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={cx("message-bubble", msg.sender)}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && <div className="message-bubble bot typing-indicator"><span></span><span></span><span></span></div>}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input 
                        type="text" 
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" aria-label="Send Message"><SendIcon /></button>
                </form>
            </div>
            <button className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
                {isOpen ? <XIcon /> : <ChatIcon />}
            </button>
        </div>
    );
};


// --- Main App Component ---
const App = () => {
    // Data states
    const [servicesData, setServicesData] = useState(initialServiceData);
    const [projectsData, setProjectsData] = useState(initialProjects);
    const [technologiesData, setTechnologiesData] = useState(initialTechnologies);
    const [testimonialsData, setTestimonialsData] = useState(initialTestimonials);
    
    // Modal states
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [currentQuote, setCurrentQuote] = useState({ quote: '', author: '' });
    const [lastQuoteIndex, setLastQuoteIndex] = useState<number | null>(null);
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Admin states
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

    // Theme state
    const [theme, setTheme] = useState('dark');

    // --- Theme Handler ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    // --- Modal Handlers ---
    const handleGetQuoteClick = (e) => {
        e.preventDefault();
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        } while (motivationalQuotes.length > 1 && randomIndex === lastQuoteIndex);

        setLastQuoteIndex(randomIndex);
        setCurrentQuote(motivationalQuotes[randomIndex]);
        setIsQuoteModalOpen(true);
    };

    const handlePortfolioCardClick = (project) => {
        setSelectedProject(project);
        setIsPortfolioModalOpen(true);
    };
    
    const handleServiceCardClick = (service) => {
        setSelectedService(service);
        setIsServiceModalOpen(true);
    };
    
    // --- Admin Handlers ---
    const handleAdminLogin = () => {
        setIsAdminLoggedIn(true);
        setIsLoginModalOpen(false);
        setIsAdminDashboardOpen(true);
    };
    
    const handleAdminLogout = () => {
        setIsAdminLoggedIn(false);
        setIsAdminDashboardOpen(false);
    };
    

    return (
        <main>
            <style>{`
                /* --- Global Styles & Resets --- */
                .gradient-text {
                  background: var(--gradient);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
                .section.with-particles {
                  position: relative;
                  overflow: hidden;
                }
                .content-layer {
                  position: relative;
                  z-index: 2;
                }
                
                /* --- Header --- */
                .site-header {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  z-index: 1000;
                  transition: all 0.3s ease-in-out;
                }
                .site-header.scrolled {
                  background-color: rgba(10, 10, 15, 0.8);
                  backdrop-filter: blur(10px);
                  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                }
                .nav-container {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 90%;
                  max-width: 1200px;
                  margin: 0 auto;
                  height: 5rem;
                }
                .site-logo {
                  font-size: 1.5rem;
                  font-weight: bold;
                  cursor: pointer;
                }
                .nav-links {
                  display: flex;
                  gap: 2rem;
                  list-style: none;
                  align-items: center;
                }
                .nav-link {
                  transition: color 0.2s ease;
                  cursor: pointer;
                  padding: 0.5rem 0;
                }
                .nav-link:hover {
                  color: var(--primary-color);
                }
                .desktop-nav { 
                    display: flex; 
                    align-items: center;
                    gap: 1rem;
                }
                .mobile-nav-toggle { display: none; background: none; border: none; color: var(--text-color); z-index: 1001; cursor: pointer;}
                .mobile-nav-menu {
                    position: fixed;
                    top: 5rem;
                    right: -100%;
                    width: 80%;
                    max-width: 300px;
                    height: calc(100vh - 5rem);
                    background: var(--surface-color);
                    transition: right 0.3s ease-in-out;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    z-index: 1000;
                }
                .mobile-nav-menu.open {
                    right: 0;
                    box-shadow: -10px 0 30px rgba(0,0,0,0.2);
                }
                .mobile-nav-menu .nav-links {
                  flex-direction: column;
                  align-items: center;
                  width: 100%;
                  padding: 0;
                  gap: 0.5rem;
                }
                 .mobile-nav-menu .nav-links li { width: 100%; text-align: center; }
                 .mobile-nav-menu .nav-link { padding: 1rem 0; display: block; font-size: 1.2rem; }
                 .mobile-nav-menu .cta-button { margin-top: 1rem; width: 100%; padding: 0.8rem; }
                
                /* --- CTA Button --- */
                .cta-button {
                  padding: 0.6rem 1.2rem;
                  background: var(--gradient);
                  color: #fff !important;
                  border-radius: 50px;
                  border: none;
                  cursor: pointer;
                  font-weight: 500;
                  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
                  white-space: nowrap;
                }
                .cta-button.large { padding: 1rem 2rem; font-size: 1.1rem; }
                .cta-button.full-width { width: 100%; padding: 1rem; }
                .cta-button.secondary { background: transparent; border: 1px solid var(--primary-color); color: var(--primary-color) !important; }
                .cta-button:hover { transform: scale(1.05); box-shadow: 0 0 15px var(--primary-color); }
                .cta-button:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }
                
                .view-more-btn {
                    padding: 0.4rem 1rem;
                    font-size: 0.9rem;
                    align-self: flex-start;
                    margin-top: auto;
                }

                /* --- Hero Section --- */
                .hero {
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  position: relative;
                  overflow: hidden;
                  padding-top: 5rem;
                }
                .hero-content {
                  z-index: 2;
                  position: relative;
                }
                .hero-title {
                  font-size: clamp(2.5rem, 5vw, 4.5rem);
                  font-weight: 700;
                  margin-bottom: 1rem;
                }
                .hero-subtitle {
                  font-size: 1.2rem;
                  max-width: 600px;
                  margin: 0 auto 2rem auto;
                  color: var(--text-muted-color);
                }
                
                /* --- Clients --- */
                .clients-container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 3rem;
                  flex-wrap: wrap;
                  filter: grayscale(100%) brightness(3);
                  opacity: 0.6;
                }
                .client-logo {
                  height: 25px;
                  width: auto;
                  color: var(--text-color);
                }
                
                /* --- Sliders --- */
                .slider-container {
                  overflow: hidden;
                  padding: 2rem 0;
                  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .slider-track {
                  display: flex;
                  gap: 2rem;
                  width: fit-content;
                  will-change: transform;
                }
                .slider-container:hover .slider-track {
                  animation-play-state: paused;
                }
                @keyframes slide {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }

                /* --- Services --- */
                .service-card {
                  background: var(--surface-color);
                  padding: 2rem;
                  border-radius: 10px;
                  border: 1px solid var(--border-color);
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                  display: flex;
                  flex-direction: column;
                  width: 320px;
                  flex-shrink: 0;
                }
                .service-card h3 { color: var(--text-color); }
                .service-card p { color: var(--text-muted-color); flex-grow: 1; }
                .service-card:hover { 
                    transform: translateY(-5px); 
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
                }
                .service-card-image-container {
                    height: 180px;
                    margin: -2rem -2rem 1.5rem -2rem;
                    overflow: hidden;
                    border-radius: 10px 10px 0 0;
                }
                .service-card-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.3s ease;
                }
                .service-card:hover .service-card-image { transform: scale(1.1); }
                
                /* --- Portfolio --- */
                .portfolio-card {
                  background: var(--surface-color);
                  border-radius: 10px;
                  overflow: hidden;
                  border: 1px solid var(--border-color);
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                  cursor: pointer;
                  display: flex;
                  flex-direction: column;
                  width: 360px;
                  flex-shrink: 0;
                }
                .portfolio-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }
                .portfolio-image-wrapper {
                    overflow: hidden;
                    aspect-ratio: 16 / 10;
                    background-color: var(--border-color);
                }
                .portfolio-image {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.4s ease-out;
                }
                .portfolio-card:hover .portfolio-image { transform: scale(1.1); }
                .portfolio-content {
                  padding: 1.5rem;
                  display: flex;
                  flex-direction: column;
                  flex-grow: 1;
                }
                 .portfolio-content p { color: var(--text-muted-color); flex-grow: 1; }
                
                /* --- About --- */
                .about-layout {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 3rem;
                  align-items: center;
                }
                .about-content p {
                  margin-bottom: 1rem;
                  color: var(--text-muted-color);
                }
                .about-content .cta-button { margin-top: 2rem; }
                .about-image-wrapper { position: relative; }
                .about-image-wrapper img { border-radius: 10px; width: 100%; }
                .about-image-wrapper::after {
                  content: '';
                  position: absolute;
                  top: -15px;
                  left: -15px;
                  width: 100%;
                  height: 100%;
                  border: 2px solid var(--primary-color);
                  border-radius: 10px;
                  z-index: -1;
                  transition: all 0.3s ease;
                }
                
                /* --- Skills --- */
                .skills-slider {
                  max-width: 800px;
                  margin: 0 auto;
                }
                .skill-item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                  position: relative;
                  width: 120px;
                  flex-shrink: 0;
                  height: 100px;
                }
                .skill-icon {
                    width: 50px;
                    height: 50px;
                    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s ease;
                    filter: grayscale(80%);
                }
                .skill-item:hover .skill-icon { 
                    transform: scale(1.15) translateY(-5px); 
                    filter: grayscale(0%); 
                }
                .skill-tooltip {
                    position: absolute;
                    bottom: -5px;
                    background-color: var(--primary-color);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: none;
                }
                .skill-item:hover .skill-tooltip { opacity: 1; transform: translateY(0); }
                
                /* --- Testimonials --- */
                .testimonial-card {
                  background: var(--surface-color);
                  padding: 2rem;
                  border-radius: 10px;
                  border: 1px solid var(--border-color);
                  width: 340px;
                  flex-shrink: 0;
                }
                .testimonial-card p { font-style: italic; }
                .testimonial-author {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  margin-top: 1.5rem;
                }
                .testimonial-author img {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  object-fit: cover;
                }
                .testimonial-author div {
                  font-size: 0.9rem;
                  color: var(--text-muted-color);
                }
                
                /* --- Contact --- */
                .contact-layout {
                  display: grid;
                  grid-template-columns: 1fr 1.5fr;
                  gap: 3rem;
                  background: var(--surface-color);
                  padding: 3rem;
                  border-radius: 10px;
                  border: 1px solid var(--border-color);
                }
                .contact-info p {
                    color: var(--text-muted-color);
                    margin-bottom: 1rem;
                }
                .social-links {
                  display: flex;
                  gap: 1.5rem;
                  margin-top: 2rem;
                }
                 .social-links a { color: var(--text-color); transition: color 0.2s ease, transform 0.2s ease; }
                 .social-links a:hover { color: var(--primary-color); transform: scale(1.1); }
                .form-group { margin-bottom: 1.5rem; }
                .form-input {
                  width: 100%;
                  padding: 0.8rem;
                  background: var(--bg-color);
                  border: 1px solid var(--border-color);
                  border-radius: 5px;
                  color: var(--text-color);
                  font-size: 1rem;
                  transition: border-color 0.2s ease;
                  font-family: 'Inter', sans-serif;
                }
                .form-input:focus {
                  outline: none;
                  border-color: var(--primary-color);
                }
                textarea.form-input { resize: vertical; }
                .form-input.error { border-color: #e53e3e; }
                .error-message {
                  color: #e53e3e;
                  font-size: 0.875rem;
                  margin-top: 0.5rem;
                }
                .form-submission-feedback {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                    background-color: var(--bg-color);
                    border-radius: 8px;
                }
                .form-submission-feedback h3 {
                    color: var(--primary-color);
                    font-size: 1.8rem;
                }
                .form-submission-feedback p {
                    color: var(--text-muted-color);
                    margin-bottom: 2rem;
                    max-width: 400px;
                }
                
                /* --- Footer --- */
                .site-footer {
                  background-color: var(--surface-color);
                  border-bottom: none;
                }
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 3rem;
                    padding: 4rem 0;
                    text-align: left;
                }
                .footer-column h4 {
                    margin-bottom: 1.5rem;
                    color: var(--text-color);
                    font-size: 1.1rem;
                    position: relative;
                }
                .footer-column h4::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -8px;
                    width: 30px;
                    height: 2px;
                    background: var(--gradient);
                }
                .footer-column p, .footer-column a {
                    color: var(--text-muted-color);
                    margin-bottom: 0.75rem;
                    display: block;
                    transition: color 0.2s ease, padding-left 0.2s ease;
                    text-decoration: none;
                }
                .footer-column a:hover {
                    color: var(--primary-color);
                    padding-left: 5px;
                }
                .footer-socials {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .footer-socials a {
                    display: inline-block;
                    color: var(--text-muted-color);
                    transition: color 0.2s ease, transform 0.2s ease;
                }
                 .footer-socials a:hover {
                    color: var(--primary-color);
                    transform: scale(1.1);
                    padding-left: 0;
                }
                .footer-bottom {
                    padding: 1.5rem 0;
                    border-top: 1px solid var(--border-color);
                    text-align: center;
                    color: var(--text-muted-color);
                    font-size: 0.9rem;
                }
                .footer-logo {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: var(--text-color);
                    margin-bottom: 1rem;
                }
                
                /* --- Modals --- */
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 2000;
                    opacity: 0;
                    animation: fadeIn 0.3s forwards;
                }
                .modal-content {
                    background: var(--surface-color);
                    padding: 2.5rem;
                    border-radius: 10px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    border: 1px solid var(--border-color);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    transform: scale(0.9);
                    animation: zoomIn 0.3s forwards;
                }
                .portfolio-modal-content, .service-modal-content {
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    padding: 2rem;
                }
                .portfolio-modal-image, .service-modal-image { 
                    width: 100%; border-radius: 8px; margin-bottom: 1.5rem; 
                    aspect-ratio: 16/9; object-fit: cover; 
                }
                .portfolio-modal-content h2, .service-modal-content h2 { 
                    color: var(--text-color); margin-bottom: 0.5rem; 
                }
                .long-description { color: var(--text-muted-color); margin-bottom: 1.5rem; }
                .tech-stack { margin-bottom: 2rem; }
                .tech-stack h4 { margin-bottom: 0.75rem; }
                .tech-stack-items { display: flex; flex-wrap: wrap; gap: 0.5rem; }
                .tech-stack-item { background: var(--bg-color); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.9rem; border: 1px solid var(--border-color); }
                .project-links { display: flex; gap: 1rem; flex-wrap: wrap; }

                .modal-close-btn {
                    position: absolute; top: 1rem; right: 1rem;
                    background: transparent; border: none;
                    color: var(--text-muted-color);
                    cursor: pointer; padding: 0.5rem;
                }
                .modal-close-btn:hover { color: var(--text-color); }

                @keyframes fadeIn { to { opacity: 1; } }
                @keyframes zoomIn { to { transform: scale(1); } }
                
                /* --- Admin Panel Styles --- */
                .admin-dashboard {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--bg-color);
                    z-index: 1500;
                    display: flex;
                    color: var(--text-color);
                }
                .admin-sidebar {
                    width: 250px;
                    background-color: var(--surface-color);
                    padding: 2rem 1rem;
                    border-right: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                }
                .admin-sidebar h2 {
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 1.5rem;
                }
                .admin-nav-item {
                    padding: 0.8rem 1rem;
                    margin-bottom: 0.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                .admin-nav-item.active, .admin-nav-item:hover {
                    background: var(--gradient);
                }
                .admin-sidebar .cta-button { margin-top: auto; }
                .admin-content {
                    flex-grow: 1;
                    padding: 2rem;
                    overflow-y: auto;
                }
                .admin-content-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                 .admin-content-header h3 { font-size: 2rem; margin: 0; }
                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .admin-table th, .admin-table td {
                    padding: 0.8rem;
                    border-bottom: 1px solid var(--border-color);
                    text-align: left;
                    vertical-align: middle;
                }
                .admin-table th {
                    background-color: var(--surface-color);
                }
                .admin-actions {
                    display: flex;
                    gap: 0.5rem;
                }
                .admin-actions button {
                    padding: 0.3rem 0.6rem;
                    font-size: 0.8rem;
                }
                .admin-form-container {
                    background-color: var(--surface-color);
                    padding: 2rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    max-width: 800px;
                    margin: 0 auto;
                }
                .admin-form-container h3 { margin-top: 0; margin-bottom: 2rem; }
                .admin-form-container .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
                .admin-form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
                .skill-icon.placeholder {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px dashed var(--border-color);
                    border-radius: 50%;
                    font-size: 1.5rem;
                    color: var(--text-muted-color);
                }
                .admin-image-preview {
                    max-width: 200px;
                    margin-top: 1rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                }
                
                 /* --- Live Chat Widget --- */
                .live-chat-widget {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1100;
                }
                .chat-toggle-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--gradient);
                    border: none;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .chat-toggle-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
                }
                .chat-window {
                    position: absolute;
                    bottom: calc(100% + 1rem);
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background-color: var(--surface-color);
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    border: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    transform-origin: bottom right;
                    transform: scale(0);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }
                .chat-window.open {
                    transform: scale(1);
                    opacity: 1;
                }
                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.8rem 1.2rem;
                    background-color: var(--bg-color);
                    border-bottom: 1px solid var(--border-color);
                }
                .chat-header h3 { margin: 0; font-size: 1.1rem; }
                .chat-header button { background: none; border: none; color: var(--text-muted-color); cursor: pointer; padding: 0.2rem; }
                .chat-messages {
                    flex-grow: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .message-bubble {
                    padding: 0.6rem 1rem;
                    border-radius: 18px;
                    max-width: 80%;
                    line-height: 1.4;
                }
                .message-bubble.user {
                    background: var(--gradient);
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 4px;
                }
                .message-bubble.bot {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    align-self: flex-start;
                    border-bottom-left-radius: 4px;
                }
                .chat-input-form {
                    display: flex;
                    padding: 0.8rem;
                    border-top: 1px solid var(--border-color);
                }
                .chat-input-form input {
                    flex-grow: 1;
                    border: none;
                    background: none;
                    color: var(--text-color);
                    padding: 0.5rem;
                    font-size: 1rem;
                }
                .chat-input-form input:focus { outline: none; }
                .chat-input-form button {
                    background: none;
                    border: none;
                    color: var(--primary-color);
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .typing-indicator span {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: var(--text-muted-color);
                    margin: 0 2px;
                    animation: typing 1.4s infinite;
                }
                .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }

                /* --- Theme Toggle Button --- */
                .theme-toggle-button {
                  background: transparent;
                  border: 1px solid var(--border-color);
                  color: var(--text-muted-color);
                  width: 38px;
                  height: 38px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  padding: 0;
                }
                .theme-toggle-button:hover {
                  color: var(--primary-color);
                  border-color: var(--primary-color);
                  transform: rotate(25deg);
                }
                .mobile-nav-menu .theme-toggle-button {
                  margin-top: 1rem;
                }

                /* --- Responsive Design --- */
                
                /* Tablets */
                @media (max-width: 992px) {
                  h1 { font-size: 2.8rem; }
                  h2 { font-size: 2rem; }
                  .container { padding: 3rem 0; }
                  .section { padding: 4rem 0; }
                  .desktop-nav { display: none; }
                  .mobile-nav-toggle { display: block; }
                  
                  .contact-layout { grid-template-columns: 1fr; gap: 2.5rem; }
                }
                
                /* Mobile */
                @media (max-width: 768px) {
                  body { font-size: 15px; }
                  h1 { font-size: 2.2rem; }
                  .container { width: 95%; padding: 2.5rem 0; }
                  .section { padding: 3.5rem 0; }
                  
                  .hero-subtitle { font-size: 1.1rem; }
                  
                  .about-layout { grid-template-columns: 1fr; gap: 2.5rem; }
                  .about-image-wrapper { grid-row: 1; }

                  .contact-layout { padding: 2rem; }

                  .footer-content {
                    grid-template-columns: 1fr;
                    text-align: center;
                  }
                  .footer-column h4::after {
                    left: 50%;
                    transform: translateX(-50%);
                  }
                  .footer-socials, .social-links { justify-content: center; }
                  
                  .portfolio-modal-content, .modal-content, .service-modal-content { 
                    padding: 1.5rem; width: 95%; 
                  }

                  .admin-dashboard { flex-direction: column; }
                  .admin-sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid var(--border-color); flex-direction: row; align-items: center; overflow-x: auto; padding: 0.5rem; }
                  .admin-sidebar h2 { display: none; }
                  .admin-nav-item { margin-bottom: 0; white-space: nowrap; }
                  .admin-sidebar .cta-button { margin-top: 0; margin-left: auto; }
                  .admin-content { padding: 1rem; }
                  .admin-content-header { flex-direction: column; align-items: flex-start; gap: 1rem; }

                }
                
                /* Small Mobile */
                @media (max-width: 480px) {
                  .hero-title { font-size: clamp(2rem, 10vw, 2.5rem); }
                  .hero-subtitle { font-size: 1rem; }
                  .cta-button { padding: 0.8rem 1.5rem; font-size: 0.9rem; }
                  .clients-container { gap: 2rem; }
                  .client-logo { height: 20px; }
                  .live-chat-widget { bottom: 1rem; right: 1rem; }
                  .chat-window { width: calc(100vw - 2rem); height: 70vh; }
                }

            `}</style>
            <Header 
                onGetQuoteClick={handleGetQuoteClick} 
                onAdminLoginClick={() => setIsLoginModalOpen(true)}
                isAdminLoggedIn={isAdminLoggedIn}
                onDashboardClick={() => setIsAdminDashboardOpen(true)}
                onLogoutClick={handleAdminLogout}
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <Hero />
            <Clients />
            <Services services={servicesData} onCardClick={handleServiceCardClick} />
            <Portfolio projects={projectsData} onCardClick={handlePortfolioCardClick} />
            <About />
            <Skills technologies={technologiesData} />
            <Testimonials testimonials={testimonialsData} />
            <Contact />
            <Footer />

            <QuoteModal 
                isOpen={isQuoteModalOpen}
                quote={currentQuote}
                onClose={() => setIsQuoteModalOpen(false)}
            />
            <PortfolioModal
                isOpen={isPortfolioModalOpen}
                project={selectedProject}
                onClose={() => setIsPortfolioModalOpen(false)}
            />
            <ServiceModal
                isOpen={isServiceModalOpen}
                service={selectedService}
                onClose={() => setIsServiceModalOpen(false)}
            />
            
            <LiveChatWidget />

            {/* Admin Modals & Dashboard */}
             <AdminLoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={handleAdminLogin}
            />
            
             <AdminDashboard
                isOpen={isAdminDashboardOpen}
                onLogout={handleAdminLogout}
                servicesData={servicesData}
                setServicesData={setServicesData}
                projectsData={projectsData}
                setProjectsData={setProjectsData}
                technologiesData={technologiesData}
                setTechnologiesData={setTechnologiesData}
                testimonialsData={testimonialsData}
                setTestimonialsData={setTestimonialsData}
            />
        </main>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);