// Offline JD Analyzer Utility

const SKILL_DEF = {
    "coreCS": ["dsa", "oop", "dbms", "os", "networks", "data structures", "algorithms"],
    "languages": ["java", "python", "javascript", "typescript", "c", "c++", "c#", "go", "golang"],
    "web": ["react", "next.js", "node.js", "express", "rest", "graphql", "html", "css", "frontend", "backend"],
    "data": ["sql", "mongodb", "postgresql", "mysql", "redis", "database"],
    "cloud": ["aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "linux", "devops", "k8s"],
    "testing": ["selenium", "cypress", "playwright", "junit", "pytest", "jest", "mocha"]
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
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    let totalCategories = 0;

    Object.keys(SKILL_DEF).forEach(category => {
        const found = SKILL_DEF[category].filter(skill => {
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });

        if (found.length > 0) {
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

    let flatSkills = Object.values(extractedSkills).flat();
    const hasSkills = flatSkills.length > 0;

    if (!hasSkills) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
        flatSkills = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // 2) Generate Output checklists
    const checklist = [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: [
                "Review quantitative aptitude formulas",
                "Practice logical reasoning puzzles",
                "Brush up on verbal ability",
                "Revise basic CS fundamentals",
                "Take 1 full-length aptitude mock"
            ]
        },
        {
            roundTitle: "Round 2: DSA + Core CS",
            items: [
                "Practice array and string manipulation",
                "Review linked lists, stacks, and queues",
                "Solve basic tree and graph problems",
                "Revise Time/Space complexity",
                "Brush up on sorting and searching algorithms"
            ]
        },
        {
            roundTitle: "Round 3: Tech interview (projects + stack)",
            items: [
                "Prepare a 2-minute project pitch",
                "Review architecture of past projects",
                "Prepare for deep-dive into your specific code",
                hasSkills ? `Revise concepts for: ${flatSkills.slice(0, 3).join(", ")}` : "Revise generic behavioral questions and problem solving",
                "Practice whiteboarding solutions"
            ]
        },
        {
            roundTitle: "Round 4: Managerial / HR",
            items: [
                "Prepare STAR method stories for common behavioral questions",
                `Research ${company || 'the company'}'s recent news and culture`,
                "Prepare 3 strong questions to ask the interviewer",
                "Review salary expectations and negotiation strategy",
                "Ensure quiet environment and technical setup for call"
            ]
        }
    ];

    // 3) 7-day Plan
    let day5Plan = "Project + resume alignment";
    if (extractedSkills.web.length > 0) day5Plan += " + Frontend/Backend Revision";
    if (extractedSkills.data.length > 0) day5Plan += " + Database & SQL Revision";
    if (!hasSkills) day5Plan = "Project + Soft Skills Revision";

    const plan7Days = [
        { day: "Day 1–2", focus: "Basics + Core CS", tasks: ["Brush up on OS, Networks, DBMS, and OOP concepts.", "Review general project structures."] },
        { day: "Day 3–4", focus: "DSA + Coding Practice", tasks: ["Focus on frequent patterns, arrays, strings, and trees.", "Solve 5 problems daily."] },
        { day: "Day 5", focus: day5Plan, tasks: ["Align your resume with the JD.", "Revise your tech stack."] },
        { day: "Day 6", focus: "Mock Interview Questions", tasks: ["Practice speaking solutions out loud with a timer.", "Record yourself answering HR questions."] },
        { day: "Day 7", focus: "Revision + Weak Areas", tasks: ["Go over formulas, complex concepts, and rest well.", "Prepare your interview space."] }
    ];

    // 4) Questions Generator
    const questions = [];
    const lowercaseSkills = flatSkills.map(s => s.toLowerCase());

    lowercaseSkills.forEach(skill => {
        if (QUESTION_BANK[skill] && questions.length < 10) {
            if (!questions.includes(QUESTION_BANK[skill])) {
                questions.push(QUESTION_BANK[skill]);
            }
        }
    });

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

    // Max sure base score isn't too low if short JD but lots of skills
    baseScore = Math.max(0, Math.min(100, baseScore));

    const skillConfidenceMap = {};
    flatSkills.forEach(skill => {
        skillConfidenceMap[skill] = "practice";
    });

    let practiceCount = flatSkills.length;
    let score = baseScore - (practiceCount * 2);
    score = Math.max(0, Math.min(100, score));

    // 6) Company Intel & Dynamic Round Mapping
    let roundMapping = [];

    // Default startup mapping
    let isEnterprise = false;

    if (company && company.trim().length > 0) {
        const ENTERPRISE_LIST = ['amazon', 'google', 'microsoft', 'meta', 'apple', 'netflix', 'infosys', 'tcs', 'wipro', 'hcl', 'cognizant', 'ibm', 'accenture', 'capgemini', 'oracle', 'cisco', 'deloitte', 'pwc', 'ey', 'kpmg', 'tech mahindra'];
        isEnterprise = ENTERPRISE_LIST.includes(company.trim().toLowerCase());
    }

    let companyIntel = null;

    if (isEnterprise) {
        companyIntel = {
            name: company.trim(),
            industry: "Technology Services",
            size: "Enterprise (2000+)",
            focus: "Structured DSA + core fundamentals"
        };
        roundMapping = [
            { roundTitle: "Round 1: Online Test", focusAreas: ["DSA", "Aptitude"], whyItMatters: "Filters candidates based on core problem-solving speed and logic." },
            { roundTitle: "Round 2: Technical", focusAreas: ["DSA", "Core CS"], whyItMatters: "Evaluates deep understanding of data structures and computer science fundamentals." },
            { roundTitle: "Round 3: Tech + Projects", focusAreas: ["Stack Implementation", "Projects"], whyItMatters: "Assesses practical application of your tech stack in real-world scenarios." },
            { roundTitle: "Round 4: HR", focusAreas: ["Behavioral", "Culture Fit"], whyItMatters: "Checks behavioral fit, leadership principles, and communication." }
        ];
    } else if (company && company.trim().length > 0) {
        companyIntel = {
            name: company.trim(),
            industry: "Technology Services",
            size: "Startup (<200)",
            focus: "Practical problem solving + stack depth"
        };
        roundMapping = [
            { roundTitle: "Round 1: Practical coding", focusAreas: ["Take-home", "Pair programming"], whyItMatters: "Tests your ability to build functional features quickly and cleanly." },
            { roundTitle: "Round 2: System discussion", focusAreas: ["Architecture", "Deep dive"], whyItMatters: "Evaluates how you architect solutions and understand your specific tech stack." },
            { roundTitle: "Round 3: Culture fit", focusAreas: ["Founder", "Team alignment"], whyItMatters: "Ensures you align with the fast-paced, ownership-driven startup environment." }
        ];
    } else {
        // Even if no company intel is generated (no company provided), we still keep the round string arrays for fallback
        roundMapping = [
            { roundTitle: "Round 1: Practical coding", focusAreas: ["Take-home", "Pair programming"], whyItMatters: "Tests your ability to build functional features quickly and cleanly." },
            { roundTitle: "Round 2: System discussion", focusAreas: ["Architecture", "Deep dive"], whyItMatters: "Evaluates how you architect solutions and understand your specific tech stack." },
            { roundTitle: "Round 3: Culture fit", focusAreas: ["Founder", "Team alignment"], whyItMatters: "Ensures you align with the fast-paced, ownership-driven startup environment." }
        ];
    }

    const now = new Date().toISOString();

    return {
        id: Date.now().toString(),
        createdAt: now,
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        companyIntel,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        skillConfidenceMap,
        finalScore: score,
        updatedAt: now
    };
}
