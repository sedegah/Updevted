import { RoadmapCareer } from "@/types";

// This is a fallback data source in case the API fails
export const roadmapsData: RoadmapCareer[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Build user interfaces and interactive web applications',
    icon: 'web',
    topics: [
      {
        name: 'HTML & CSS',
        status: 'not-started',
        resources: [
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web' },
          { name: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' }
        ]
      },
      {
        name: 'JavaScript',
        status: 'not-started',
        resources: [
          { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
          { name: 'JavaScript.info', url: 'https://javascript.info/' }
        ]
      },
      {
        name: 'React',
        status: 'not-started',
        resources: [
          { name: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
          { name: 'React Tutorial', url: 'https://reactjs.org/tutorial/tutorial.html' }
        ]
      },
      {
        name: 'State Management',
        status: 'not-started',
        resources: [
          { name: 'Redux Documentation', url: 'https://redux.js.org/introduction/getting-started' },
          { name: 'Zustand', url: 'https://github.com/pmndrs/zustand' }
        ]
      },
      {
        name: 'Build Tools',
        status: 'not-started',
        resources: [
          { name: 'Webpack', url: 'https://webpack.js.org/concepts/' },
          { name: 'Vite', url: 'https://vitejs.dev/guide/' }
        ]
      }
    ],
    salary: {
      entry: 70000,
      mid: 100000,
      senior: 150000
    },
    companies: [
      'Google',
      'Facebook',
      'Amazon',
      'Microsoft',
      'Apple'
    ],
    interviewTopics: [
      'JavaScript fundamentals',
      'React hooks and components',
      'CSS layouts and responsive design',
      'Browser rendering and performance',
      'Web accessibility'
    ]
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Build server-side applications, APIs, and database systems',
    icon: 'dns',
    topics: [
      {
        name: 'Server Languages',
        status: 'not-started',
        resources: [
          { name: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
          { name: 'Python Documentation', url: 'https://docs.python.org/3/' }
        ]
      },
      {
        name: 'Databases',
        status: 'not-started',
        resources: [
          { name: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' },
          { name: 'MongoDB University', url: 'https://university.mongodb.com/' }
        ]
      },
      {
        name: 'API Design',
        status: 'not-started',
        resources: [
          { name: 'REST API Tutorial', url: 'https://restfulapi.net/' },
          { name: 'GraphQL Documentation', url: 'https://graphql.org/learn/' }
        ]
      },
      {
        name: 'Authentication & Security',
        status: 'not-started',
        resources: [
          { name: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/' },
          { name: 'Auth0 Documentation', url: 'https://auth0.com/docs/' }
        ]
      },
      {
        name: 'Server Deployment',
        status: 'not-started',
        resources: [
          { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' },
          { name: 'Heroku Dev Center', url: 'https://devcenter.heroku.com/' }
        ]
      }
    ],
    salary: {
      entry: 75000,
      mid: 110000,
      senior: 160000
    },
    companies: [
      'Netflix',
      'Spotify',
      'Twitter',
      'LinkedIn',
      'Salesforce'
    ],
    interviewTopics: [
      'Data structures and algorithms',
      'Database design and optimization',
      'API design principles',
      'Authentication and authorization',
      'Scalability and performance'
    ]
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Manage infrastructure, CI/CD pipelines, and deployment processes',
    icon: 'settings_suggest',
    topics: [
      {
        name: 'Linux Administration',
        status: 'not-started',
        resources: [
          { name: 'Linux Journey', url: 'https://linuxjourney.com/' },
          { name: 'Linux Documentation Project', url: 'https://tldp.org/' }
        ]
      },
      {
        name: 'Containerization',
        status: 'not-started',
        resources: [
          { name: 'Docker Documentation', url: 'https://docs.docker.com/get-started/' },
          { name: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/' }
        ]
      },
      {
        name: 'CI/CD Pipelines',
        status: 'not-started',
        resources: [
          { name: 'GitHub Actions', url: 'https://docs.github.com/en/actions' },
          { name: 'Jenkins Documentation', url: 'https://www.jenkins.io/doc/' }
        ]
      },
      {
        name: 'Infrastructure as Code',
        status: 'not-started',
        resources: [
          { name: 'Terraform Documentation', url: 'https://www.terraform.io/docs' },
          { name: 'Ansible Documentation', url: 'https://docs.ansible.com/' }
        ]
      },
      {
        name: 'Monitoring & Observability',
        status: 'not-started',
        resources: [
          { name: 'Prometheus Documentation', url: 'https://prometheus.io/docs/introduction/overview/' },
          { name: 'Grafana Tutorials', url: 'https://grafana.com/tutorials/' }
        ]
      }
    ],
    salary: {
      entry: 85000,
      mid: 120000,
      senior: 170000
    },
    companies: [
      'AWS',
      'Microsoft Azure',
      'Google Cloud',
      'IBM',
      'HashiCorp'
    ],
    interviewTopics: [
      'Containerization and orchestration',
      'CI/CD pipeline design',
      'Infrastructure as code',
      'System monitoring and alerts',
      'Incident response and troubleshooting'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze data, build machine learning models, and derive insights',
    icon: 'analytics',
    topics: [
      {
        name: 'Programming for Data Science',
        status: 'not-started',
        resources: [
          { name: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
          { name: 'R for Data Science', url: 'https://r4ds.had.co.nz/' }
        ]
      },
      {
        name: 'Statistics & Mathematics',
        status: 'not-started',
        resources: [
          { name: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
          { name: 'MIT Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' }
        ]
      },
      {
        name: 'Machine Learning',
        status: 'not-started',
        resources: [
          { name: 'Scikit-Learn Documentation', url: 'https://scikit-learn.org/stable/documentation.html' },
          { name: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
        ]
      },
      {
        name: 'Deep Learning',
        status: 'not-started',
        resources: [
          { name: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' },
          { name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' }
        ]
      },
      {
        name: 'Data Visualization',
        status: 'not-started',
        resources: [
          { name: 'Matplotlib Documentation', url: 'https://matplotlib.org/stable/contents.html' },
          { name: 'D3.js Documentation', url: 'https://d3js.org/' }
        ]
      }
    ],
    salary: {
      entry: 90000,
      mid: 130000,
      senior: 180000
    },
    companies: [
      'OpenAI',
      'Meta AI',
      'DeepMind',
      'IBM Watson',
      'Nvidia'
    ],
    interviewTopics: [
      'Statistical modeling and hypothesis testing',
      'Machine learning algorithms',
      'Data cleaning and preprocessing',
      'Experiment design',
      'Model evaluation metrics'
    ]
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    description: 'Build applications for iOS, Android, and cross-platform',
    icon: 'phone_iphone',
    topics: [
      {
        name: 'Mobile UI Design',
        status: 'not-started',
        resources: [
          { name: 'Material Design', url: 'https://material.io/design' },
          { name: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/' }
        ]
      },
      {
        name: 'iOS Development',
        status: 'not-started',
        resources: [
          { name: 'Swift Documentation', url: 'https://docs.swift.org/swift-book/' },
          { name: 'Apple Developer Documentation', url: 'https://developer.apple.com/documentation/' }
        ]
      },
      {
        name: 'Android Development',
        status: 'not-started',
        resources: [
          { name: 'Android Developers', url: 'https://developer.android.com/docs' },
          { name: 'Kotlin Documentation', url: 'https://kotlinlang.org/docs/home.html' }
        ]
      },
      {
        name: 'Cross-Platform Frameworks',
        status: 'not-started',
        resources: [
          { name: 'React Native Documentation', url: 'https://reactnative.dev/docs/getting-started' },
          { name: 'Flutter Documentation', url: 'https://flutter.dev/docs' }
        ]
      },
      {
        name: 'App Publishing & Distribution',
        status: 'not-started',
        resources: [
          { name: 'Google Play Console Help', url: 'https://support.google.com/googleplay/android-developer/' },
          { name: 'App Store Connect Help', url: 'https://help.apple.com/app-store-connect/' }
        ]
      }
    ],
    salary: {
      entry: 80000,
      mid: 115000,
      senior: 165000
    },
    companies: [
      'Apple',
      'Google',
      'Uber',
      'Airbnb',
      'Tinder'
    ],
    interviewTopics: [
      'Mobile UI implementation',
      'State management in mobile apps',
      'Performance optimization',
      'Offline capabilities',
      'Mobile testing strategies'
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Design user interfaces and experiences for digital products',
    icon: 'design_services',
    topics: [
      {
        name: 'UI Design Principles',
        status: 'not-started',
        resources: [
          { name: 'Refactoring UI', url: 'https://www.refactoringui.com/' },
          { name: 'Material Design', url: 'https://material.io/design' }
        ]
      },
      {
        name: 'UX Research',
        status: 'not-started',
        resources: [
          { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/articles/' },
          { name: 'UX Research Field Guide', url: 'https://www.userinterviews.com/ux-research-field-guide' }
        ]
      },
      {
        name: 'Prototyping Tools',
        status: 'not-started',
        resources: [
          { name: 'Figma Help Center', url: 'https://help.figma.com/' },
          { name: 'Adobe XD Tutorials', url: 'https://www.adobe.com/products/xd/learn/get-started.html' }
        ]
      },
      {
        name: 'Interaction Design',
        status: 'not-started',
        resources: [
          { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/literature' },
          { name: 'Laws of UX', url: 'https://lawsofux.com/' }
        ]
      },
      {
        name: 'Visual Design',
        status: 'not-started',
        resources: [
          { name: 'Design Systems', url: 'https://www.designsystems.com/' },
          { name: 'Canva Design School', url: 'https://www.canva.com/learn/' }
        ]
      }
    ],
    salary: {
      entry: 70000,
      mid: 100000,
      senior: 150000
    },
    companies: [
      'Airbnb',
      'Figma',
      'Adobe',
      'Apple',
      'Dropbox'
    ],
    interviewTopics: [
      'Design process methodology',
      'User research techniques',
      'Wireframing and prototyping',
      'Visual hierarchy and typography',
      'Design systems and component libraries'
    ]
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Design, implement, and manage cloud infrastructure',
    icon: 'cloud',
    topics: [
      {
        name: 'Cloud Service Providers',
        status: 'not-started',
        resources: [
          { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com/' },
          { name: 'Azure Documentation', url: 'https://docs.microsoft.com/en-us/azure/' }
        ]
      },
      {
        name: 'Cloud Architecture',
        status: 'not-started',
        resources: [
          { name: 'AWS Well-Architected Framework', url: 'https://aws.amazon.com/architecture/well-architected/' },
          { name: 'Azure Architecture Center', url: 'https://docs.microsoft.com/en-us/azure/architecture/' }
        ]
      },
      {
        name: 'Cloud Security',
        status: 'not-started',
        resources: [
          { name: 'Cloud Security Alliance', url: 'https://cloudsecurityalliance.org/research/guidance/' },
          { name: 'AWS Security Documentation', url: 'https://docs.aws.amazon.com/security/' }
        ]
      },
      {
        name: 'Serverless Computing',
        status: 'not-started',
        resources: [
          { name: 'AWS Lambda', url: 'https://docs.aws.amazon.com/lambda/' },
          { name: 'Azure Functions', url: 'https://docs.microsoft.com/en-us/azure/azure-functions/' }
        ]
      },
      {
        name: 'Cloud Networking',
        status: 'not-started',
        resources: [
          { name: 'AWS Networking', url: 'https://docs.aws.amazon.com/vpc/' },
          { name: 'GCP Networking', url: 'https://cloud.google.com/vpc/docs' }
        ]
      }
    ],
    salary: {
      entry: 85000,
      mid: 125000,
      senior: 175000
    },
    companies: [
      'AWS',
      'Microsoft Azure',
      'Google Cloud',
      'IBM Cloud',
      'Oracle Cloud'
    ],
    interviewTopics: [
      'Cloud architecture patterns',
      'Infrastructure as code',
      'Cost optimization strategies',
      'High availability design',
      'Cloud security best practices'
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Build and deploy machine learning and artificial intelligence systems',
    icon: 'psychology',
    topics: [
      {
        name: 'Mathematics for AI',
        status: 'not-started',
        resources: [
          { name: 'Khan Academy Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' },
          { name: 'Stanford CS229 Linear Algebra Review', url: 'http://cs229.stanford.edu/section/cs229-linalg.pdf' }
        ]
      },
      {
        name: 'Machine Learning',
        status: 'not-started',
        resources: [
          { name: 'Andrew Ng\'s Machine Learning Course', url: 'https://www.coursera.org/learn/machine-learning' },
          { name: 'Scikit-Learn Documentation', url: 'https://scikit-learn.org/stable/documentation.html' }
        ]
      },
      {
        name: 'Deep Learning',
        status: 'not-started',
        resources: [
          { name: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning' },
          { name: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' }
        ]
      },
      {
        name: 'Natural Language Processing',
        status: 'not-started',
        resources: [
          { name: 'Hugging Face Transformers', url: 'https://huggingface.co/docs/transformers/index' },
          { name: 'spaCy Documentation', url: 'https://spacy.io/usage' }
        ]
      },
      {
        name: 'MLOps',
        status: 'not-started',
        resources: [
          { name: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html' },
          { name: 'Kubeflow Documentation', url: 'https://www.kubeflow.org/docs/' }
        ]
      }
    ],
    salary: {
      entry: 100000,
      mid: 140000,
      senior: 200000
    },
    companies: [
      'OpenAI',
      'Google Brain',
      'DeepMind',
      'Meta AI',
      'Anthropic'
    ],
    interviewTopics: [
      'Machine learning algorithms',
      'Neural network architectures',
      'Model evaluation and validation',
      'Feature engineering',
      'Large language models'
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect systems, networks, and data from cyber threats',
    icon: 'security',
    topics: [
      {
        name: 'Network Security',
        status: 'not-started',
        resources: [
          { name: 'CompTIA Network+ Certification', url: 'https://www.comptia.org/certifications/network' },
          { name: 'Cisco Networking Academy', url: 'https://www.netacad.com/' }
        ]
      },
      {
        name: 'Security Operations',
        status: 'not-started',
        resources: [
          { name: 'SANS Reading Room', url: 'https://www.sans.org/reading-room/' },
          { name: 'Splunk Documentation', url: 'https://docs.splunk.com/' }
        ]
      },
      {
        name: 'Penetration Testing',
        status: 'not-started',
        resources: [
          { name: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
          { name: 'Metasploit Documentation', url: 'https://docs.metasploit.com/' }
        ]
      },
      {
        name: 'Security Compliance',
        status: 'not-started',
        resources: [
          { name: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
          { name: 'ISO/IEC 27001', url: 'https://www.iso.org/isoiec-27001-information-security.html' }
        ]
      },
      {
        name: 'Incident Response',
        status: 'not-started',
        resources: [
          { name: 'SANS Incident Handler\'s Handbook', url: 'https://www.sans.org/white-papers/33901/' },
          { name: 'NIST Incident Handling Guide', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf' }
        ]
      }
    ],
    salary: {
      entry: 80000,
      mid: 115000,
      senior: 160000
    },
    companies: [
      'FireEye',
      'CrowdStrike',
      'Palo Alto Networks',
      'Cisco',
      'Microsoft'
    ],
    interviewTopics: [
      'Threat detection and analysis',
      'Network security protocols',
      'Security tools and frameworks',
      'Incident response procedures',
      'Compliance requirements'
    ]
  }
];
