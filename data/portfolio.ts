export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type Experience = {
  role: string;
  company: string;
  employmentType: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  period: string;
  featured: boolean;
  accent: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  platform?: string;
  issueDate?: string;
  credentialUrl?: string;
  credentials?: Array<{
    label: string;
    url: string;
  }>;
  image?: string;
};

export const portfolio = {
  seo: {
    title: "Nguyen Thanh Luan — AI Developer",
    description:
      "Portfolio of Nguyen Thanh Luan, an AI developer building thoughtful, reliable digital products.",
    siteUrl: "https://example.com",
  },
  sections: {
    showAchievements: false,
  },
  person: {
    name: "Nguyen Thanh Luan",
    initials: "NL",
    role: "AI Developer",
    availability: "Final-year AI student • Open to opportunities",
    location: "Ho Chi Minh City, Vietnam",
    timezone: "UTC+7",
    email: "luanntai13@gmail.com",
    avatar: "/images/nguyen-thanh-luan.jpg",
    heroTitle: "I build practical AI systems for real-world problems.",
    heroDescription:
      "Final-year Artificial Intelligence student at FPT University, focused on Computer Vision, NLP, and building end-to-end AI applications from model training to deployment.",
    currentFocus: "Computer Vision, NLP, and end-to-end AI systems.",
    profileNote: "Final-year AI student at FPT University",
    resumeUrl: "https://drive.google.com/file/d/1Qk6RLn06pGduFtio-qfdBiXLqK7MDr1d/view?usp=sharing",
    aboutTitle: "Final-year AI student building practical intelligent systems.",
    bio: [
      "I am a final-year Artificial Intelligence student at FPT University, focused on building practical AI systems across computer vision, natural language processing, and machine learning.",
      "I enjoy turning research ideas into end-to-end products—from data processing and model training to APIs, desktop applications, and deployment. I am currently looking for opportunities to contribute, learn, and grow as an AI Engineer.",
    ],
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ] as NavigationItem[],
  socials: [
    { label: "GitHub", href: "https://github.com/luannt1010" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ntl1005" },
    { label: "Email", href: "mailto:luanntai13@gmail.com" },
  ] as SocialLink[],
  contact: [
    {
      label: "Email",
      value: "luanntai13@gmail.com",
      href: "mailto:luanntai13@gmail.com",
    },
    {
      label: "Phone",
      value: "(+84) 0963349004",
      href: "tel:+84963349004",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ntl1005",
      href: "https://www.linkedin.com/in/ntl1005",
    },
    {
      label: "GitHub",
      value: "github.com/luannt1010",
      href: "https://github.com/luannt1010",
    },
    {
      label: "Location",
      value: "Ho Chi Minh City, Vietnam",
    },
  ] as ContactItem[],
  stats: [
    { value: "2027", label: "Expected graduation" },
    { value: "7", label: "End-to-end AI projects" },
    { value: "8.4/10", label: "Current GPA" },
  ],
  skills: [
    {
      category: "Programming Languages",
      summary: "Core languages for AI, data, and software projects.",
      items: ["Python", "SQL", "R", "C++"],
    },
    {
      category: "Machine Learning & Deep Learning",
      summary: "Model training, evaluation, and experimentation.",
      items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "CNNs"],
    },
    {
      category: "Computer Vision",
      summary: "Detection, recognition, and image understanding pipelines.",
      items: [
        "YOLO",
        "OpenCV",
        "DeepSeek-OCR",
        "PaddleOCR",
        "OBB Detection",
        "Image Segmentation",
      ],
    },
    {
      category: "Natural Language Processing",
      summary: "Vietnamese language modeling, retrieval, and text processing.",
      items: ["PhoBERT", "RAG", "Transformers", "PyVi"],
    },
    {
      category: "Data Processing & Visualization",
      summary: "Data preparation, analysis, and visual communication.",
      items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Plotly"],
    },
    {
      category: "MLOps & Deployment",
      summary: "API serving, experiment tracking, and containerized delivery.",
      items: ["FastAPI", "Flask", "Streamlit", "MLflow", "Docker"],
    },
    {
      category: "Developer Tools",
      summary: "Everyday tools for development and experimentation.",
      items: ["Git", "Jupyter Notebook", "VS Code"],
    },
    {
      category: "Soft Skills",
      summary: "Working effectively through change, collaboration, and challenges.",
      items: ["Problem Solving", "Team Collaboration", "Adaptability"],
    },
  ],
  experience: [
    {
      role: "R&D Intern",
      company: "VietDynamic",
      employmentType: "Internship",
      period: "Jan 2026 — Apr 2026",
      description:
        "Contributed to the development of an automated robotic spray-painting system that integrates 2D/3D vision, point cloud processing, conveyor tracking, and robotic path planning.",
      highlights: [
        "Developed 2D-to-3D processing using a 3D camera.",
        "Processed 3D point clouds for object geometry extraction.",
        "Implemented conveyor tracking to compensate for moving objects.",
        "Contributed to spray path generation and robot motion planning.",
        "Integrated vision outputs into the automated spraying pipeline.",
      ],
    },
  ] as Experience[],
  education: [
    {
      degree: "Bachelor of AI in Computer Science",
      institution: "FPT University — HCMC",
      period: "Oct 2023 — Dec 2027 (Expected)",
      detail: "GPA: 8.4/10 · Ho Chi Minh City, Vietnam",
    },
  ],
  projects: [
    {
      slug: "face-recognition-system",
      title: "Face Recognition System",
      category: "Computer Vision",
      shortDescription:
        "An end-to-end real-time multi-face recognition system for registration, tracking, and identity matching.",
      description:
        "A modular computer vision pipeline that combines deep face embeddings, real-time tracking, vector search, API services, and a desktop interface.",
      highlights: [
        "Developed an end-to-end real-time multi-face recognition system using PyTorch and OpenCV, integrating SCRFD detection, face alignment, ByteTrack tracking, and cosine similarity matching.",
        "Built and trained 512-dimensional face embedding models using MobileFaceNet, ResNet, and iResNet with ArcFace, AdaFace, and Triplet Loss, achieving 92.63% training accuracy, 91.37% validation accuracy, and TAR@FAR=1% of 87.72% on the training set and 85.27% on the validation set.",
        "Designed FastAPI services and a PyQt6 desktop application for face registration and recognition, using ONNX Runtime for inference and PostgreSQL/pgvector for vector search.",
      ],
      technologies: [
        "PyTorch",
        "OpenCV",
        "SCRFD",
        "ByteTrack",
        "FastAPI",
        "PyQt6",
        "ONNX Runtime",
        "PostgreSQL",
        "pgvector",
      ],
      githubUrl: "https://github.com/luannt1010/face-recoginition-system.git",
      period: "Personal Project",
      featured: true,
      accent: "#3454d1",
    },
    {
      slug: "vietnamese-alpr",
      title: "Vietnamese License Plate Recognition",
      category: "Computer Vision",
      shortDescription:
        "An automatic license plate recognition pipeline built specifically for Vietnamese vehicles.",
      description:
        "The system detects single-line and two-line plates, recognizes their characters, and exposes practical desktop and command-line workflows for image and video processing.",
      highlights: [
        "Developed an end-to-end ALPR pipeline for Vietnamese vehicles, combining Faster R-CNN and YOLO11n for plate detection with fine-tuned DeepSeek-OCR for character recognition.",
        "Trained and evaluated a Faster R-CNN detector for single-line and two-line license plates, achieving 96.46% mAP@50 and 76.88% mAP@50:95.",
        "Built CLI tools and a PyQt5 desktop application to process images and video frames, visualize detected plates, and export predictions as structured JSON results.",
      ],
      technologies: [
        "PyTorch",
        "Faster R-CNN",
        "YOLO11n",
        "DeepSeek-OCR",
        "OpenCV",
        "PyQt5",
      ],
      githubUrl: "https://github.com/luannt1010/alpr-system.git",
      period: "Personal Project",
      featured: true,
      accent: "#e2552f",
    },
    {
      slug: "rag-scientific-papers",
      title: "RAG-based Question Answering for Scientific Papers",
      category: "Natural Language Processing · RAG",
      shortDescription:
        "An in-progress RAG system for grounded question answering over scientific papers and PDF documents.",
      description:
        "A baseline retrieval-augmented generation pipeline covering document parsing, text chunking, embedding generation, hybrid retrieval, and grounded response generation.",
      highlights: [
        "Developed a baseline RAG pipeline for answering questions over scientific papers and PDF documents, covering document parsing, text chunking, embedding generation, retrieval, and grounded response generation.",
        "Experimented with multiple chunking configurations and embedding models to analyze and improve retrieval relevance.",
        "Implemented hybrid retrieval combining semantic vector search with keyword-based search.",
        "Currently exploring reranking, query rewriting, and systematic RAG evaluation; an interactive demo is planned.",
      ],
      technologies: [
        "Python",
        "LangChain",
        "PostgreSQL",
        "pgvector",
        "Ollama",
        "Hugging Face",
      ],
      githubUrl:
        "https://github.com/luannt1010/ai-research-paper-assistant.git",
      period: "Personal Project · In Progress",
      featured: true,
      accent: "#7c3aed",
    },
    {
      slug: "real-time-sketch-recognition",
      title: "Real-Time Sketch Recognition",
      category: "Deep Learning",
      shortDescription:
        "A web-based system that recognizes hand-drawn objects from a canvas or live camera feed.",
      description:
        "A full-stack recognition workflow centered on a custom residual CNN, with real-time hand tracking and a feedback loop for collecting corrected predictions.",
      highlights: [
        "Developed an end-to-end hand-drawn sketch recognition system using a custom residual CNN in PyTorch, integrated with a Django REST API and React web application.",
        "Processed and augmented 12,500 balanced images across 25 object classes, implemented OpenCV-based stroke normalization, and trained a three-block CNN that achieved 90% accuracy and a 91% F1-score.",
        "Built canvas and camera-based recognition workflows using MediaPipe hand tracking, displaying prediction confidence and inference time while collecting corrected labels and drawings in SQLite for future model improvement.",
      ],
      technologies: [
        "PyTorch",
        "Django REST",
        "React",
        "MediaPipe",
        "OpenCV",
        "SQLite",
      ],
      githubUrl: "https://github.com/luannt1010/real-time-sketch-recognition.git",
      period: "Personal Project",
      featured: true,
      accent: "#20876a",
    },
    {
      slug: "dota-multiscale-obb-segmentation",
      title: "DOTA Multi-Scale OBB Segmentation & Tracking",
      category: "Computer Vision · Remote Sensing",
      shortDescription:
        "A multi-task PyTorch system for oriented object detection, semantic segmentation, and video tracking in aerial imagery.",
      description:
        "An end-to-end research prototype for 15 DOTA classes, combining a custom multi-scale architecture, exact rotated geometry, experiment management, and a desktop inference application.",
      highlights: [
        "Built an end-to-end PyTorch pipeline that jointly predicts oriented bounding boxes and semantic segmentation masks for 15 object classes in the DOTA v1.0 aerial imagery dataset.",
        "Designed an approximately 15.03M-parameter architecture with an LSKNet-style backbone, FPN, fine/context dual-flow features, bidirectional cross-attention, and a dynamic scale gate.",
        "Implemented polygon target generation, periodic angle loss, exact rotated IoU, class-wise rotated NMS, dataset-level mAP evaluation, and Rotated IoU and DeepSORT-based video tracking.",
        "Developed a multithreaded PyQt6 application for image and video inference; a 50-epoch experiment achieved 34.25% mIoU, 48.73% Mean Dice, and a best mAP@0.50 of 9.16%.",
      ],
      technologies: [
        "PyTorch",
        "LSKNet",
        "FPN",
        "OpenCV",
        "PyQt6",
        "DeepSORT",
        "NumPy",
      ],
      githubUrl:
        "https://github.com/luannt1010/dota-multiscale-obb-segmentation.git",
      period: "Personal Project",
      featured: true,
      accent: "#d97706",
    },
    {
      slug: "vietnamese-clickbait-detection",
      title: "Vietnamese Clickbait Detection with PhoBERT",
      category: "Natural Language Processing",
      shortDescription:
        "A Vietnamese news clickbait classifier supporting headlines, article URLs, and batch inference.",
      description:
        "An end-to-end Vietnamese NLP pipeline that combines word segmentation, a fine-tuned PhoBERT model, web content extraction, and accessible prediction tools.",
      highlights: [
        "Developed an end-to-end Vietnamese clickbait detection pipeline using PyVi word segmentation and fine-tuned PhoBERT.",
        "Processed and consolidated 6,186 multi-source news articles, addressed class imbalance, and constructed combined inputs from titles, lead paragraphs, and article content, achieving 83.55% accuracy and an 83.55% F1-score on the test set.",
        "Built CLI tools and a Streamlit application with a REST API supporting predictions from headlines and article URLs, web content crawling, and batch inference from CSV and Excel files.",
      ],
      technologies: [
        "PhoBERT",
        "PyVi",
        "Streamlit",
        "REST API",
        "Python",
        "Pandas",
      ],
      githubUrl:
        "https://github.com/luannt1010/PhoBert-VietNamClickBait-Recognize.git",
      period: "Personal Project",
      featured: true,
      accent: "#9b5de5",
    },
    {
      slug: "machine-learning-foundations",
      title: "Machine Learning Foundations",
      category: "Machine Learning · Computer Vision",
      shortDescription:
        "A collection of six hands-on projects spanning classical machine learning, mathematical foundations, and computer vision.",
      description:
        "A learning-focused repository that connects algorithms implemented from scratch with practical regression, classification, image reconstruction, and YOLOv8-style object detection workflows.",
      highlights: [
        "Built six projects covering YOLOv8-style license plate detection, insurance cost and house price regression, cat recognition, Iris classification, and PCA-based image reconstruction.",
        "Implemented Logistic Regression, K-Nearest Neighbors, binary SVM, Principal Component Analysis, and Gradient Descent from mathematical foundations using NumPy.",
        "Developed a modular YOLOv8-style PyTorch detector with C2f and SPPF blocks, FPN-PAN features, a decoupled head, Task-Aligned Assignment, CIoU/DFL losses, mAP evaluation, and class-aware NMS.",
        "Achieved 0.9147 holdout R² for house price prediction, approximately 97.78% test accuracy with KNN on Iris, and reduced cat-classifier cost from 0.6931 to 0.1357 after 2,000 iterations.",
      ],
      technologies: [
        "Python",
        "NumPy",
        "PyTorch",
        "Scikit-learn",
        "XGBoost",
        "OpenCV",
        "Pandas",
        "Jupyter",
      ],
      githubUrl:
        "https://github.com/luannt1010/Machine_Learning_Foundations.git",
      period: "Personal Project",
      featured: true,
      accent: "#0f766e",
    },
  ] as Project[],
  certificates: [
    {
      name: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      platform: "Coursera",
      credentialUrl:
        "https://coursera.org/share/939397b7244ece212d048c2d5ca946fc",
    },
    {
      name: "Machine Learning",
      issuer: "IBM",
      platform: "Coursera",
      credentials: [
        {
          label: "Classification",
          url: "https://coursera.org/share/1b9a86a1719afe8d8fbd9553f9f0b8e2",
        },
        {
          label: "Regression",
          url: "https://coursera.org/share/20c95f4612b943fd39fe44f1afe459dc",
        },
      ],
    },
    {
      name: "Natural Language Processing",
      issuer: "DeepLearning.AI",
      platform: "Coursera",
      credentialUrl:
        "https://coursera.org/share/3509d18624f17f5a0f0c9ce5fcb9993d",
    },
    {
      name: "PyTorch for Deep Learning",
      issuer: "DeepLearning.AI",
      platform: "Coursera",
      credentialUrl:
        "https://coursera.org/share/d29a2298c7169c30d116004cb24e7cb2",
    },
    {
      name: "Data Science Specialization",
      issuer: "Johns Hopkins University",
      platform: "Coursera",
      credentialUrl:
        "https://coursera.org/share/c9a8f293e0bd961303def69281149452",
    },
    {
      name: "Gradient to Production: MLOps & Model Serving",
      issuer: "Coursera",
      platform: "Coursera",
      credentialUrl:
        "https://coursera.org/share/31e068398ac389b759b5f3c397cde408",
    },
    {
      name: "AI Engineer Professional",
      issuer: "Packt",
      platform: "Coursera",
      credentialUrl:
        "https://coursera.org/share/3a36e5539e58d129ee85bf0cb86d5aa7",
    },
  ] as Certificate[],
  achievements: [
    {
      year: "2025",
      title: "Top 10 — Global AI Product Hackathon",
      description: "Built an accessible, multilingual learning assistant in 48 hours.",
    },
    {
      year: "2024",
      title: "Open-source milestone",
      description: "Maintainer of developer tools reaching 1,800+ GitHub stars.",
    },
    {
      year: "2023",
      title: "Engineering excellence award",
      description: "Recognized for measurable improvements to platform reliability.",
    },
  ],
};
