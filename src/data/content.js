// Site-wide data for Krishna Bhatt's portfolio

export const personalInfo = {
  name: "Krishna Bhatt",
  tagline: "Neuroscience · Computation · Engineering",
  bio: "In my natural habitat, you'll probably find me working on a puzzle that's bugging me, from deciphering cortical dynamics from EEG data to constructing balancing devices for Parkinson's patients.",
  mission: "My dream is that all people will be enabled with the independence to fully live their lives.",
  headshot: "/assets/img/headshot.png",
  email: "contact@krishnabhatt.com",
  github: "https://github.com/blizzard-labs",
  interests: [
    { field: "Neuroscience", focus: "Cortical Circuit Dynamics" },
    { field: "Computer Science", focus: "SNNs & Unsupervised Learning" },
    { field: "Dynamical Systems", focus: "Signal Processing" },
    { field: "Kart Racing", focus: "Tractographic Reconstruction" }
  ]
};

export const projects = [
  {
    id: "thalis",
    year: 2026,
    title: "THALis",
    subtitle: "Modeling Cortico-Prosthetic Dynamics for Dexterous EEG-driven Hand Control",
    status: "IN PROGRESS",
    description: "A neurocomputational framework for non-invasive prosthetic control that integrates insights from computational neuroscience, nonlinear dynamics, and spiking neural networks (SNNs). The central hypothesis is that the fundamental emergent properties of neural activity—including chaotic dynamics, synchronization, and nonlinear attractor behavior—are partially reflected in scalp EEG.",
    motivation: [
      "Expand the functional capacity of non-invasive prosthetic hands for amputees who cannot access invasive brain–computer interfaces",
      "Demonstrate that computational neuroscience principles can concretely enhance assistive neurotechnology"
    ],
    resources: [
      { label: "Github Repo", url: "https://github.com/blizzard-labs/thalis-eeg-control" },
      { label: "Project Proposal", url: "https://docs.google.com/document/d/135vfImX9XZffEkq6f2IK6FvMbcDsl175/preview" }
    ],
    tags: ["EEG", "Prosthetics", "Spiking Neural Networks", "Dynamical Systems"]
  },
  {
    id: "reconbench",
    year: 2025,
    title: "ReconBench",
    subtitle: "A Phylogenetic MCMC Benchmark",
    status: "PUBLISHED",
    description: "Developed at the Holmes Lab, UC Berkeley. A comprehensive evaluation framework for Historian, enabling rigorous testing across a wide range of phylogenetic conditions. Using INDELible to simulate evolutionary histories, we generated biologically-derived datasets spanning the four major SCOP protein types.",
    images: [
      { src: "/assets/img/projects/ReconBench/corr.png", alt: "Correlation analysis" },
      { src: "/assets/img/projects/ReconBench/param.png", alt: "Parameter analysis" },
      { src: "/assets/img/projects/ReconBench/tree.png", alt: "Phylogenetic tree" }
    ],
    resources: [
      { label: "Publication", url: "#", note: "Forthcoming, Oxford Press" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/phylo-mcmc-evaluation" },
      { label: "Project Report", url: "https://drive.google.com/file/d/1ch-W26xjg0PbhFo8QuBGvkchhoeWDRs0/preview" },
      { label: "Modified Historian", url: "https://github.com/blizzard-labs/historian-mod" }
    ],
    tags: ["Phylogenetics", "MCMC", "Computational Biology", "Benchmarking"]
  },
  {
    id: "homebuilt",
    year: 2025,
    title: "HomeBuilt",
    subtitle: "Your DIY Home Improvement Partner",
    status: "STARTUP",
    description: "An app enabling users to create customized home improvement projects with curated materials and instructions. Features Benji, an AI assistant for design customization, and partnerships with local hardware suppliers.",
    images: [
      { src: "/assets/img/projects/HomeBuilt/logo.png", alt: "HomeBuilt logo" },
      { src: "/assets/img/projects/HomeBuilt/app.png", alt: "HomeBuilt app" },
      { src: "/assets/img/projects/HomeBuilt/instructions.png", alt: "Project instructions" }
    ],
    resources: [
      { label: "Launch Writeup", url: "https://drive.google.com/file/d/1K063vRwWWBMYVAiNsq_a-sU5c8eeiPUm/preview" },
      { label: "Video Pitch", url: "https://youtu.be/yTSA3R-rAMo" },
      { label: "Customer Testimonials", url: "https://drive.google.com/file/d/1EJ36i9EDGFnBcR54bqFN0lnPjuB8OVlu/preview" }
    ],
    tags: ["Entrepreneurship", "AI", "Mobile App", "Local Business"]
  },
  {
    id: "mesonet",
    year: 2025,
    title: "MesoNet",
    subtitle: "Optimizing Spiking Neural Networks with Dynamic Saddle Distributions",
    status: "PREPRINT",
    description: "Addresses energy efficiency challenges in neural network clustering by mathematically investigating SNN learning behavior with dynamical systems theory. Introduces variable plasticity and triangulated attribution algorithms maintaining optimal learning conditions at the edge of chaos.",
    images: [
      { src: "/assets/img/projects/MesoNet/lyapunov.png", alt: "Lyapunov analysis" },
      { src: "/assets/img/projects/MesoNet/turing.png", alt: "Turing pattern" },
      { src: "/assets/img/projects/MesoNet/unsup.png", alt: "Unsupervised learning" }
    ],
    resources: [
      { label: "Preprint", url: "https://doi.org/10.5281/zenodo.17771306" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/NMCtests" },
      { label: "Video Presentation", url: "https://youtu.be/4yPmUsaXKY0" },
      { label: "Poster", url: "https://drive.google.com/file/d/1kDdw0U7FfciGSA6t0wHDR0jmJ54sKUvg/preview" }
    ],
    tags: ["Spiking Neural Networks", "Dynamical Systems", "Edge of Chaos", "Machine Learning"]
  },
  {
    id: "tractx",
    year: 2024,
    title: "TractX",
    subtitle: "A Density-Aware Streamline Exclusion System for Accurate White Matter Reconstruction",
    status: "COMPLETED",
    description: "Resolves bottleneck issues in white matter tractography through a three-part pipeline utilizing a novel nerve-density-analysis architecture. Achieved 94.52% recall and 72.83% precision—216.15% higher precision than current state-of-the-art pipelines.",
    images: [
      { src: "/assets/img/projects/TractX/bottlneck.png", alt: "TractX visualization 1" },
      { src: "/assets/img/projects/TractX/corr.png", alt: "TractX visualization 2" },
      { src: "/assets/img/projects/TractX/tract.png", alt: "TractX visualization 3" }
    ],
    resources: [
      { label: "Github Repo", url: "https://github.com/blizzard-labs/tractx-no-maps" },
      { label: "Poster Presentation", url: "https://drive.google.com/file/d/1msfSQkJJBQ3r8podPtQThE3YrCb9IFjb/preview" }
    ],
    tags: ["Tractography", "Neuroimaging", "dMRI", "Signal Processing"]
  },
  {
    id: "balancerator",
    year: 2023,
    title: "The Balancerator",
    subtitle: "A Wearable for Active Prevention of Falls Through GRU-based Gyroscopic Inference",
    status: "TO BE PATENTED",
    description: "An Arduino-controlled wearable manipulating the user's center of mass with weights based upon inclination captured by gyroscope. Uses Kalman filtration with Gaussian Motion and a GRU neural network for classification. Achieved 70.5% lower fall rate.",
    images: [
      { src: "/assets/img/projects/Balancerator/structure.png", alt: "Balancerator structure" },
      { src: "/assets/img/projects/Balancerator/pinout.png", alt: "Arduino pinout" },
      { src: "/assets/img/projects/Balancerator/weight.png", alt: "Weight mechanism" }
    ],
    resources: [
      { label: "Project Spotlight", url: "https://www.societyforscience.org/jic/2023-student-finalists/krishna-bhatt/" },
      { label: "Video Presentation", url: "https://youtu.be/ve8pqWtbBm0" },
      { label: "Project Poster", url: "https://drive.google.com/file/d/162AHb5D_bjp-7TEQn_o3OxmyVhgVhEBL/preview" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/balancerator" }
    ],
    tags: ["Wearables", "GRU", "Kalman Filter", "Healthcare", "Arduino"]
  },
  {
    id: "cookie-dispenser",
    year: 2022,
    title: "The Cookie Dispenser",
    subtitle: "A Device to Limit Obesity",
    status: "COMPLETED",
    description: "A child-friendly cookie dispenser that dispenses one cookie daily, controlled via Bluetooth and smartphone application. Designed to help reduce childhood obesity rates.",
    images: [
      { src: "/assets/img/projects/CookieDispenser/image.png", alt: "Cookie Dispenser device" },
      { src: "/assets/img/projects/CookieDispenser/app.png", alt: "Cookie Dispenser app" }
    ],
    resources: [
      { label: "Project Poster", url: "https://drive.google.com/file/d/1H4tsudnYg4-o26NanthVHXAIR48T0lyM/preview" },
      { label: "Project Video", url: "https://youtu.be/uDxKYNIIAQ0" }
    ],
    tags: ["Arduino", "Bluetooth", "Health", "Mobile App"]
  }
];

export const experience = [
  {
    role: "Lead Computational Intern",
    organization: "Holmes Lab, UC Berkeley",
    location: "Berkeley (Stanley Hall)",
    period: "July 2024 - September 2025",
    description: "Worked with a team of six interns under Dr. Ian Holmes; collaborated with post-grads and professors in a lab environment.",
    highlights: [
      "Summer 2025: Developed 'ReconBench,' a benchmarking suite for MCMC evolutionary reconstructors",
      "Summer 2024: Built data engineering pipelines mapping structural protein data with phylogeny data"
    ]
  },
  {
    role: "Independent Researcher / Engineer",
    organization: "Self-Directed",
    location: "San Jose",
    period: "June 2022 - Present",
    description: "Developed various passion engineering projects presented at science fairs, research symposiums, and hackathons.",
    highlights: [
      "THALis: EEG-driven Hand Control [IN PROGRESS]",
      "MesoNet: Optimizing SNNs [2025]",
      "TractX: White Matter Reconstruction [2024]",
      "Balancerator: Fall Prevention Wearable [2023]"
    ]
  },
  {
    role: "Keynote Speaker",
    organization: "TEDx & Symposiums",
    location: "San Francisco Bay Area",
    period: "May 2024 - Present",
    description: "Spoke at multiple TEDx keynote events regarding emerging innovation and presentation techniques.",
    highlights: [
      "TEDxBISV '25: Big Ideas, Little Time: The Science of Powerful Pitches",
      "NorCal JSHS '25: MesoNet– Optimizing SNNs",
      "TEDxBISV '24: The Missing Steps to the Big Picture"
    ]
  }
];

export const awards = {
  scienceFair: [
    { title: "1st Engineering ($3500) and Top 30 Finalist", event: "Thermo Fisher JIC", year: 2024 },
    { title: "Alternate Grand Award (15/1000+)", event: "Synopsys Science Fair", year: 2025 },
    { title: "IBM Award and Grant + Sponsored Awards ($900+)", event: "Science Fair", year: 2024 },
    { title: "1st, 3rd, 2nd Category Awards", event: "Science Fair", years: "2023-2025" },
    { title: "Commendation by San Jose City Council", event: "", years: "2022-2025" }
  ],
  entrepreneurship: [
    { title: "Top 40/3000+ Business Finalist", event: "International Diamond Challenge", year: 2025 },
    { title: "Secured 2 Official Local Business Partners", event: "HomeBuilt", year: 2025 },
    { title: "Hosted text-based games (4000+ total players)", event: "", year: "" }
  ],
  academic: [
    { title: "5th/10000+ Overall", event: "World Scholars Cup ToC Debate", year: 2023 },
    { title: "2x AP Scholar with Distinction", event: "", years: "2024-2025" },
    { title: "9x Distinguished Honor Roll Student", event: "", years: "2023-2026" },
    { title: "KUMON Math and Reading Accomplishment", event: "", years: "2021-2022" }
  ]
};

export const education = {
  school: "BASIS Independent Silicon Valley High School",
  gpa: "4.75 (weighted, unranked), 4.0 UW",
  sat: "1570",
  courses: [
    "AP Calculus BC", "AP Calculus AB", "AP Computer Science A", "AP Biology",
    "AP Physics C", "AP Statistics", "AP Psychology", "AP Physics I",
    "AP Environmental Science", "AP English Language", "AP English Literature",
    "AP US History", "AP US Government", "AP Macroeconomics", "AP Microeconomics",
    "AP World History"
  ]
};

export const prabha = {
  name: "Prabha",
  tagline: "Grassroots Neurorehabilitation Initiative",
  mission: "Empower every individual affected by neurological conditions to reclaim independence and dignity through compassionate, accessible, and inclusive care.",
  description: "A grassroots neurorehabilitation effort founded to address accessible, affordable, and compassionate care for individuals with neurological conditions in low-income rural areas of Kerala.\n\n Our mission is to  empower every individual affected by neurological conditions to reclaim independence and dignity through compassionate, accessible, and inclusive care. Through home-based care, community partnerships, and youth-led service, Prabha creates a cycle of healing that uplifts entire families—not just patients.",
  interestForm: "https://forms.gle/HMwgVYpdM4ZxseK3A",
  values: [
    { title: "Local Communities", description: "Serving Edappal, Ponnani, Marancheri, and surrounding towns" },
    { title: "Student Empowerment", description: "Empowering students with supervised, real-world experience" },
    { title: "Partnerships", description: "Collaborating with doctors, hospitals, and colleges" },
    { title: "Accessibility", description: "Reaching patients at home, minimizing burdens" }
  ],
  benefits: [
    {
      title: "Clinical Experience with Real-World Impact",
      description: "Work hands-on with patients affected by complex neurological conditions, tailoring treatment plans and seeing direct impact of your care."
    },
    {
      title: "Certified Hours and Documentation Support",
      description: "Receive official certificate and letter validating experience in neurorehabilitation, geriatric physiotherapy, and community-based rehabilitation."
    },
    {
      title: "Modest Stipend for Therapy Hours",
      description: "All PTs receive a stipend per active therapy hour, paid regularly during your term."
    }
  ]
};

export const readings = [
  {
    title: "Dynamical Systems in Neuroscience: The Geometry of Excitability and Bursting",
    author: "Eugene M. Izhikevich",
    url: "https://direct.mit.edu/books/monograph/2589/Dynamical-Systems-in-NeuroscienceThe-Geometry-of"
  },
  {
    title: "Nonlinear Dynamics and Chaos",
    author: "Steven H. Strogatz",
    url: "https://www.biodyn.ro/course/literatura/Nonlinear_Dynamics_and_Chaos_2018_Steven_H._Strogatz.pdf"
  },
  {
    title: "Engineering Math: Differential Equations and Dynamical Systems",
    author: "Steve Brunton",
    url: "https://youtube.com/playlist?list=PLMrJAkhIeNNTYaOnVI3QpH7jgULnAmvPA&si=E9uJyBym2oLrUKdk",
    type: "Lecture Series"
  },
  {
    title: "Video Documentaries by Artem Kirsanov",
    author: "Artem Kirsanov",
    url: "https://www.youtube.com/@ArtemKirsanov",
    type: "Video Series"
  }
];

export const galleryImages = [
  { src: "/assets/img/gallery/candlelight.jpeg", alt: "Candlelight event" },
  { src: "/assets/img/gallery/datagathering.png", alt: "Data gathering" },
  { src: "/assets/img/gallery/csef.jpg", alt: "CSEF" },
  { src: "/assets/img/gallery/DCsummit.jpg", alt: "DC Summit" },
  { src: "/assets/img/gallery/firstcomplab.jpeg", alt: "First comp lab" },
  { src: "/assets/img/gallery/image.png", alt: "Image" },
  { src: "/assets/img/gallery/nationals.jpg", alt: "Nationals" },
  { src: "/assets/img/gallery/tedtalk.jpg", alt: "TED Talk" },
  { src: "/assets/img/gallery/5k.jpg", alt: "5K event" },
  { src: "/assets/img/gallery/citycouncil.jpg", alt: "City Council" },
  { src: "/assets/img/gallery/eegdata.jpeg", alt: "EEG Data" },
  { src: "/assets/img/gallery/firstEngineering.jpg", alt: "First Engineering" },
  { src: "/assets/img/gallery/firstpodium.jpg", alt: "First Podium" },
  { src: "/assets/img/gallery/firstultraprecisetract.png", alt: "First ultra precise tract" },
  { src: "/assets/img/gallery/synopsysAwards.jpg", alt: "Synopsys Awards" },
  { src: "/assets/img/gallery/tractv1.jpeg", alt: "Tract v1" },
  { src: "/assets/img/gallery/congress.jpg", alt: "Congress Advocacy" },
  { src: "/assets/img/gallery/challenge.jpg", alt: "Thermo Fisher JIC" },
  { src: "/assets/img/gallery/archery.jpg", alt: "Archery in Maranchery" },
  { src: "/assets/img/gallery/sonomawalk.jpg", alt: "Sonoma Raceway" },
  { src: "/assets/img/gallery/zoom.jpeg", alt: "First karting session" },
];
