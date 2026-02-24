// Offline JD Analyzer Utility

const SKILL_DEF = {
    "Core CS": ["dsa", "oop", "dbms", "os", "networks", "data structures", "algorithms"],
    "Languages": ["java", "python", "javascript", "typescript", "c", "c++", "c#", "go", "golang"],
    "Web": ["react", "next.js", "node.js", "express", "rest", "graphql", "html", "css", "frontend", "backend"],
    "Data": ["sql", "mongodb", "postgresql", "mysql", "redis", "database"],
    "Cloud/DevOps": ["aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "linux", "devops", "k8s"],
    "Testing": ["selenium", "cypress", "playwright", "junit", "pytest", "jest", "mocha"]
};

// Skill-specific question bank
const QUESTION_BANK = {
    "sql": "Explain indexing and when it helps to speed up queries.",
    "react": "Explain state management options and when to choose which.",
    "dsa": "How would you optimize search in sorted data?",
    "data structures": "How would you optimize search in sorted data?",
    "algorithms": "Explain the time complexity of quicksort vs mergesort.",
    "java": "Explain memory management in Java and how the Garbage Collector works.",
    "python": "What are decorators in Python and how do they work?",
    "javascript": "Explain closures and the event loop in JavaScript.",
    "typescript": "What are the benefits of strict type checking in TypeScript?",
    "oop": "Explain the four pillars of OOP with real-world examples.",
    "dbms": "What are ACID properties and why are they important?",
    "os": "Explain the difference between a process and a thread.",
    "networks": "What happens when you type a URL into a browser?",
    "aws": "How is scaling handled in AWS (e.g., using ASG and ELB)?",
    "docker": "What is the difference between an image and a container?",
    "kubernetes": "Explain pods, deployments, and services in Kubernetes.",
    "ci/cd": "How would you set up a basic CI/CD pipeline from scratch?",
    "mongodb": "When would you choose a NoSQL database over a relational database?",
    "redis": "How does Redis achieve high performance and when should it be used?",
    "rest": "What are the key constraints of RESTful architecture?",
    "graphql": "How does GraphQL solve the overfetching problem of REST?"
};

const GENERIC_QUESTIONS = [
    "Walk me through your resume and your most challenging project.",
    "Describe a time you had to learn a new technology quickly.",
    "How do you handle disagreements on technical approaches within a team?",
    "What is your approach to debugging a complex issue in production?",
    "Where do you see your career heading in the next 3 to 5 years?",
    "How do you ensure your code is readable and maintainable?",
    "What is the most interesting technical article or book you've read recently?",
    "Describe a situation where you had to meet a tight deadline.",
    "How do you prioritize tasks when you have multiple deliverables?",
    "Tell me about a time you failed and what you learned from it."
];

export function analyzeJD(company, role, jdText) {
    const text = jdText.toLowerCase();

    // 1) Extract Skills
    const extractedSkills = {};
    let totalCategories = 0;

    Object.keys(SKILL_DEF).forEach(category => {
        const found = SKILL_DEF[category].filter(skill => {
            // Create word boundary regex if possible, otherwise simple includes is enough for heuristics
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });

        if (found.length > 0) {
            // Map back to proper casing
            extractedSkills[category] = Array.from(new Set(found.map(f => {
                if (f === 'dsa') return 'DSA';
                if (f === 'oop') return 'OOP';
                if (f === 'dbms') return 'DBMS';
                if (f === 'os') return 'OS';
                if (f === 'ci/cd') return 'CI/CD';
                if (f === 'aws') return 'AWS';
                if (f === 'gcp') return 'GCP';
                if (f === 'rest') return 'REST';
                return f.charAt(0).toUpperCase() + f.slice(1);
            })));
            totalCategories++;
        }
    });

    const flatSkills = Object.values(extractedSkills).flat();
    const hasSkills = flatSkills.length > 0;

    if (!hasSkills) {
        extractedSkills["General"] = ["General fresher stack"];
    }

    // 2) Generate Output checklists
    const checklist = {
        "Round 1: Aptitude / Basics": [
            "Review quantitative aptitude formulas",
            "Practice logical reasoning puzzles",
            "Brush up on verbal ability",
            "Revise basic CS fundamentals",
            "Take 1 full-length aptitude mock"
        ],
        "Round 2: DSA + Core CS": [
            "Practice array and string manipulation",
            "Review linked lists, stacks, and queues",
            "Solve basic tree and graph problems",
            "Revise Time/Space complexity",
            "Brush up on sorting and searching algorithms"
        ],
        "Round 3: Tech interview (projects + stack)": [
            "Prepare a 2-minute project pitch",
            "Review architecture of past projects",
            "Prepare for deep-dive into your specific code",
            hasSkills ? `Revise concepts for: ${flatSkills.slice(0, 3).join(", ")}` : "Revise your strongest programming language",
            "Practice whiteboarding solutions"
        ],
        "Round 4: Managerial / HR": [
            "Prepare STAR method stories for common behavioral questions",
            `Research ${company || 'the company'}'s recent news and culture`,
            "Prepare 3 strong questions to ask the interviewer",
            "Review salary expectations and negotiation strategy",
            "Ensure quiet environment and technical setup for call"
        ]
    };

    // 3) 7-day Plan
    let day5Plan = "Project + resume alignment";
    if (extractedSkills["Web"]) day5Plan += " + Frontend/Backend Revision";
    if (extractedSkills["Data"]) day5Plan += " + Database & SQL Revision";

    const plan = [
        { day: "Day 1–2", title: "Basics + Core CS", desc: "Brush up on OS, Networks, DBMS, and OOP concepts." },
        { day: "Day 3–4", title: "DSA + Coding Practice", desc: "Focus on frequent patterns, arrays, strings, and trees." },
        { day: "Day 5", title: day5Plan, desc: "Align your resume with the JD and revise your tech stack." },
        { day: "Day 6", title: "Mock Interview Questions", desc: "Practice speaking solutions out loud with a timer." },
        { day: "Day 7", title: "Revision + Weak Areas", desc: "Go over formulas, complex concepts, and rest well." }
    ];

    // 4) Questions Generator
    const questions = [];
    const lowercaseSkills = flatSkills.map(s => s.toLowerCase());

    // Pick skill-specific questions
    lowercaseSkills.forEach(skill => {
        if (QUESTION_BANK[skill] && questions.length < 10) {
            if (!questions.includes(QUESTION_BANK[skill])) {
                questions.push(QUESTION_BANK[skill]);
            }
        }
    });

    // Fill the rest with generic questions
    let genericIndex = 0;
    while (questions.length < 10 && genericIndex < GENERIC_QUESTIONS.length) {
        if (!questions.includes(GENERIC_QUESTIONS[genericIndex])) {
            questions.push(GENERIC_QUESTIONS[genericIndex]);
        }
        genericIndex++;
    }

    // 5) Readiness Score
    let baseScore = 35; // base
    baseScore += Math.min(30, totalCategories * 5);
    if (company && company.trim().length > 0) baseScore += 10;
    if (role && role.trim().length > 0) baseScore += 10;
    if (jdText && jdText.trim().length > 800) baseScore += 10;

    if (jdText && jdText.trim().length < 50) baseScore -= 15; // penalty for very short JDs

    // Initialize Confidence Map
    const skillConfidenceMap = {};
    flatSkills.forEach(skill => {
        skillConfidenceMap[skill] = "practice";
    });

    let practiceCount = flatSkills.length;
    let score = baseScore - (practiceCount * 2);

    score = Math.max(0, Math.min(100, score)); // clamp

    // 6) Company Intel & Dynamic Round Mapping
    let companyIntel = null;
    let roundMapping = null;

    if (company && company.trim().length > 0) {
        const ENTERPRISE_LIST = ['amazon', 'google', 'microsoft', 'meta', 'apple', 'netflix', 'infosys', 'tcs', 'wipro', 'hcl', 'cognizant', 'ibm', 'accenture', 'capgemini', 'oracle', 'cisco', 'deloitte', 'pwc', 'ey', 'kpmg', 'tech mahindra'];

        const isEnterprise = ENTERPRISE_LIST.includes(company.trim().toLowerCase());
        const size = isEnterprise ? "Enterprise (2000+)" : "Startup (<200)";
        const focus = isEnterprise ? "Structured DSA + core fundamentals" : "Practical problem solving + stack depth";

        companyIntel = {
            name: company.trim(),
            industry: "Technology Services",
            size,
            focus
        };

        if (isEnterprise) {
            roundMapping = [
                { title: "Round 1: Online Test", desc: "DSA + Aptitude", why: "Filters candidates based on core problem-solving speed and logic." },
                { title: "Round 2: Technical", desc: "DSA + Core CS", why: "Evaluates deep understanding of data structures and computer science fundamentals." },
                { title: "Round 3: Tech + Projects", desc: "Stack Implementation", why: "Assesses practical application of your tech stack in real-world scenarios." },
                { title: "Round 4: HR", desc: "Behavioral", why: "Checks behavioral fit, leadership principles, and communication." }
            ];
        } else {
            roundMapping = [
                { title: "Round 1: Practical coding", desc: "Take-home or pair programming", why: "Tests your ability to build functional features quickly and cleanly." },
                { title: "Round 2: System discussion", desc: "Architecture deep dive", why: "Evaluates how you architect solutions and understand your specific tech stack." },
                { title: "Round 3: Culture fit", desc: "Founder or team round", why: "Ensures you align with the fast-paced, ownership-driven startup environment." }
            ];
        }
    }

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company: company || "Unknown Company",
        role: role || "Unknown Role",
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions,
        baseScore,
        skillConfidenceMap,
        readinessScore: score,
        companyIntel,
        roundMapping
    };
}
