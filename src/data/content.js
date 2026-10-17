// Site-wide data for Krishna Bhatt's portfolio

export const personalInfo = {
  name: "Krishna Bhatt",
  tagline: "Neuroscience · Computation · Engineering",
  bio: "In my natural habitat, you'll find me tackling whatever puzzle is bugging me—from decoding brain waves to building balancing devices for Parkinson's!",
  mission: "My dream is that everybody will have the agency to fully live their lives.",
  headshot: "/assets/img/headshot-new.jpg",
  email: "contact@krishnabhatt.com",
  github: "https://github.com/blizzard-labs",
  interests: [
    { field: "Neurons", focus: "Excitability & Bursting" },
    { field: "Circuits", focus: "Chaos, Attractors & Synchrony" },
    { field: "Brain Structure", focus: "Diffusion MRI & Tractography" },
    { field: "Interfaces", focus: "Decoding EEG for Prosthetic Control" }
  ]
};

export const projects = [
  {
    id: "thalis",
    year: 2026,
    title: "THALis",
    subtitle: "Modeling Cortico-Prosthetic Dynamics for Dexterous EEG-driven Hand Control",
    status: "PATENT PENDING",
    tags: ["In Development", "ISEF 2026, 3rd", "CSEF 2026, 2nd", "Grand Award Synopsys"],
    layout: "spotlight",
    description: "A non-invasive EEG framework for proportional multi-finger prosthetic control that reconstructs subject-specific brain dynamics using Takens embeddings, an echo-state reservoir, and a phase-locked loop. In cross-validated consumer EEG tests, it achieved r=0.68±0.04 for finger tracking—a 54.5% improvement over CNN baselines—and 81.78% four-primitive accuracy.",
    media: [
      { type: "video", label: "Research Overview", src: "https://youtu.be/1w8bLjzduX4" },
      { type: "video", label: "Live Demo", src: "https://youtu.be/2H2K4UVOt9A" },
      { type: "pdf", label: "Quad Chart", src: "/assets/img/projects/THALis/quadchart-58c164e853d11653.pdf", thumb: "/assets/img/projects/THALis/quadchart-thumb-45ddac0eb572f5f7.webp" },
      { type: "pdf", label: "Expert Commentary", src: "/assets/img/projects/THALis/expert-commentary-db2b7dd7f7b31e12.pdf", thumb: "/assets/img/projects/THALis/expert-commentary-thumb-f77117f62b8c2828.webp" },
      { type: "pdf", label: "Proposal", src: "/assets/img/projects/THALis/proposal-f9bbaf8c7df0b1cd.pdf", thumb: "/assets/img/projects/THALis/proposal-thumb-94cbce924bbb5ce1.webp" }
    ],
    resourceNotice: {
      text: "THALis is still under development, so not all details can be publicly shared at this time. For specific inquiries, please reach out to me at",
      email: "krishbhatt2019@gmail.com"
    },
    abstract: "Over 80 million people face loss of upper-limb function. Yet noninvasive electroencephalogram (EEG) prosthetic hand interfaces are limited to cumbersome, binary control due to severe signal noise—often 90% greater than invasive counterparts. Deep convolutional methods struggle in this noisy, data-scarce setting, leaving a major gap in our current capability. To address this, I developed THALis, the first noninvasive system to our knowledge to proportionally decode multi-finger motion from scalp EEG alone. My core innovation reframes neural decoding as a dynamical reconstruction problem: THALis acts as a state-observer replicating subject-specific brain dynamics for prosthetic inference, bypassing noise as a structural bottleneck. I achieve this via a novel theory-driven approach: (1) Via Takens embeddings, I show latent cortical mappings for finger control are recoverable from EEG-scale observations while preserving homotopy under bounded noise. (2) I exploit this to design an echo-state reservoir with a bifurcation mechanism generating attractors topologically conjugate to cortical limit cycles. (3) A phase-locked-loop decodes proportional finger position from the reservoir, reducing a nonlinear problem to a tractable linear one. On cross-validated consumer EEG tests, THALis tracks realtime finger kinematics at r=0.68±0.04—a 54.5% improvement over state-of-the-art CNNs—while achieving 81.78% 4-primitive accuracy. The reservoir preserves distinct representations (Cohen's d=1.19) with 10-minute calibration. By decoupling decoder integrity from signal quality, THALis proposes a scalable nonsurgical path to natural control. My approach can extend to motor disease monitoring and multimodal neuroanalysis, warranting further study as a general foundation for noninvasive BCI.",
    resources: [
      { label: "ISEF Project & Abstract", url: "https://isef.net/project/cbio039-dexterous-non-invasive-eeg-prosthetic-hand-control" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/thalis-eeg-control" }
    ]
  },
  {
    id: "mesonet",
    year: 2025,
    title: "MesoNet",
    subtitle: "Optimizing Spiking Neural Networks with Dynamic Saddle Distributions",
    status: "PREPRINT POSTED",
    tags: ["Alt. Grand Award Silicon Valley Science Fair", "CSEF 2026"],
    layout: "spotlight",
    description: "Addresses energy efficiency challenges in neural network clustering by mathematically investigating SNN learning behavior with dynamical systems theory. Introduces variable plasticity and triangulated attribution algorithms maintaining optimal learning conditions at the edge of chaos.",
    media: [
      { type: "video", label: "Video Presentation", src: "https://youtu.be/4yPmUsaXKY0" },
      { type: "video", label: "Turing Map", src: "https://youtu.be/vj3dSUOi5Mo" },
      { type: "pdf", label: "Poster", src: "/assets/img/projects/MesoNet/poster-9807fbdbc0a1e039.pdf", thumb: "/assets/img/projects/MesoNet/poster-thumb-895ab5e83f5d874e.webp" },
      { type: "pdf", label: "Manuscript", src: "/assets/img/projects/MesoNet/manuscript-86d79a6f54decc3b.pdf", thumb: "/assets/img/projects/MesoNet/manuscript-thumb-d860e3843a7fc1f7.webp" }
    ],
    abstract: "Artificial neural network (ANN) clustering algorithms require hundreds of watts, considerably limiting their abilities across numerous energy-critical applications. A developing technology, spiking neural networks (SNNs) offer a promising alternative, requiring mere milliwatts by mimicking biological neurons on neuromorphic chips. However, the prevalent spike-timing-dependent-plasticity (STDP) learning rule struggles to scale for practical tasks, reducing accuracy by up to 40% compared to ANNs. This paper addresses these challenges with a two-step approach: mathematically investigating SNN learning behavior with dynamical systems theory, before developing an algorithm for improved generalization. We identify an optimal learning regime at the edge of chaos and introduce two algorithms- variable plasticity and triangulated attribution- maintaining these optimal learning conditions. Notably, these mechanisms dynamical form and annihilate saddle points to enhance representations. Implemented in a split-and-merge architecture, our network MesoNet implements these algorithms to achieve performative improvements in accuracy and information retention.",
    resources: [
      { label: "Preprint", url: "https://doi.org/10.5281/zenodo.17771306" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/NMCtests" },
      { label: "Video Presentation", url: "https://youtu.be/4yPmUsaXKY0" }
    ]
  },
  {
    id: "balancerator",
    year: 2023,
    title: "The Balancerator",
    subtitle: "A Wearable for Active Prevention of Falls Through GRU-based Gyroscopic Inference",
    status: "PATENT PENDING",
    tags: ["1st Engineering, U.S."],
    layout: "spotlight",
    description: "An Arduino-controlled wearable manipulating the user's center of mass with weights based upon inclination captured by gyroscope. Uses Kalman filtration with Gaussian Motion and a GRU neural network for classification. Achieved 70.5% lower fall rate.",
    media: [
      { type: "video", label: "Video Presentation", src: "https://youtu.be/4_raTs4aqj4" },
      { type: "video", label: "Video Demo", src: "https://youtu.be/kiuBgn9vBLI" },
      { type: "pdf", label: "Poster", src: "/assets/img/projects/Balancerator/poster-f7352824539bd957.pdf", thumb: "/assets/img/projects/Balancerator/poster-thumb-fabdaa1172cc01f5.webp" },
      { type: "pdf", label: "Figures", src: "/assets/img/projects/Balancerator/figures-6d1917539e089134.pdf", thumb: "/assets/img/projects/Balancerator/figures-thumb-68f84bb5288d7251.webp" }
    ],
    abstract: "Freezing of gait along with balance dysfunctions is a widespread cause of severe injuries worldwide, making them one of the largest causes of fatality for elderlies above 65. The project’s goal is to lower falling rates for individuals with balancing dysfunctions without weakening brain-muscle activations, an effect of other walking aids. My prototype is an Arduino UNO-controlled wearable, which manipulates the user’s center of mass (CoM) with 1.8-kilogram weights on each side based upon their inclination, captured by a gyroscope. The prototype is interfaced through a mobile app with emergency contact capabilities and walking pattern trends for doctors. Various hardware models were developed through iteration with the final design being optimized for equally distributed load, battery life longevity, and maximum CoM displacement. Various software models were also developed to eliminate gyroscopic noise and to determine the state of the user. In the final iteration, Kalman filtration was utilized alongside Gaussian Motion and Bayes’ theorem to compare the prediction and update curve of the gyroscope to remove noise. In addition to this, a Recurrent Neural Network variant, the Gated Recurrent Unit (GRU), was trained through stochastic gradient descent to classify the position of the user as walking, standing, or unbalanced. After an overall 1,400 data points were collected, the gyroscope had 93.3% less bias, the GRU had an F1-score of 0.9369, and the device had a 70.5% lower fall rate than without it. The device has great potential to reduce falling rates without adverse effects.",
    resources: [
      { label: "Project Spotlight", url: "https://www.societyforscience.org/jic/2023-student-finalists/krishna-bhatt/" },
      { label: "Video Presentation", url: "https://youtu.be/4_raTs4aqj4" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/balancerator" }
    ]
  },
  {
    id: "reconbench",
    year: 2025,
    title: "Evolmoves Benchmark",
    subtitle: "A Phylogenetic MCMC Benchmark",
    status: "IN DEVELOPMENT",
    layout: "spotlight",
    description: "Developed at the Holmes Lab, UC Berkeley. A comprehensive evaluation framework for Historian, enabling rigorous testing across a wide range of phylogenetic conditions. Using INDELible to simulate evolutionary histories, we generated biologically-derived datasets spanning the four major SCOP protein types.",
    images: [
      { src: "/assets/img/projects/ReconBench/corr.png", alt: "Correlation analysis" },
      { src: "/assets/img/projects/ReconBench/param.png", alt: "Parameter analysis" },
      { src: "/assets/img/projects/ReconBench/tree.png", alt: "Phylogenetic tree" }
    ],
    media: [
      { type: "pdf", label: "Report", src: "/assets/img/projects/ReconBench/report-c50aad1b0e0e8756.pdf", thumb: "/assets/img/projects/ReconBench/report-thumb-b113b6a2cff0aa14.webp" }
    ],
    resources: [
      { label: "Evolbrew", url: "https://evolbrew.org", note: "Next-generation WebGPU version" },
      { label: "Publication", url: "#", note: "Forthcoming, Oxford Press" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/phylo-mcmc-evaluation" },
      { label: "Modified Historian", url: "https://github.com/blizzard-labs/historian-mod" }
    ]
  },
  {
    id: "neuroreach",
    year: 2026,
    title: "NeuroReach",
    subtitle: "EEG-Assisted Motor Rehabilitation",
    tags: ["Powered by THALis", "Pacific Stroke Association"],
    layout: "spotlight",
    description: "Combines EEG decoding with webcam-based movement tracking to make upper-limb stroke rehabilitation more engaging.",
    media: [
      { type: "video", label: "Introduction", src: "https://youtu.be/hHVyAqoD-6w" },
      { type: "video", label: "Console & App Walkthrough", src: "https://youtu.be/Uo2iDNLLS2w" },
      { type: "pdf", label: "Pilot Proposal", src: "/assets/img/projects/NeuroReach/pilot-proposal-acb9f97ef1962f42.pdf", thumb: "/assets/img/projects/NeuroReach/pilot-proposal-thumb-45fc7cc4da61a61a.webp" },
      { type: "pdf", label: "Community Newsletter", src: "/assets/img/projects/NeuroReach/newsletter-49d65eb70b08ce05.pdf", thumb: "/assets/img/projects/NeuroReach/newsletter-thumb-940e9c76fc39b1aa.webp" }
    ],
    resources: [
      { label: "Project Resources", url: "https://neuroreach.notion.site/NeuroReach-EEG-Assisted-Motor-Rehabilitation-RESOURCES-3ac0b3bfcc1381189586e200abe4d8cd" },
      { label: "Pilot Interest Form", url: "https://forms.gle/PsNS4jqEq4hxhP5YA" },
      { label: "Github Repo", url: "https://github.com/blizzard-labs/thalis-rehab-game" },
      { label: "Introduction", url: "https://youtu.be/hHVyAqoD-6w" },
      { label: "Console & App Walkthrough", url: "https://youtu.be/Uo2iDNLLS2w" }
    ]
  },
  {
    id: "homebuilt",
    year: 2025,
    title: "HomeBuilt",
    subtitle: "Your DIY Home Improvement Partner",
    status: "STARTUP",
    tags: ["Diamond Challenge Finalist"],
    layout: "spotlight",
    description: "An app enabling users to create customized home improvement projects with curated materials and instructions. Features Benji, an AI assistant for design customization, and partnerships with local hardware suppliers.",
    teammates: ["Aayush Hegde", "Archit Deepak"],
    images: [
      { src: "/assets/img/projects/HomeBuilt/logo.png", alt: "HomeBuilt logo" },
      { src: "/assets/img/projects/HomeBuilt/app.png", alt: "HomeBuilt app" },
      { src: "/assets/img/projects/HomeBuilt/instructions.png", alt: "Project instructions" }
    ],
    media: [
      { type: "video", label: "Video Pitch", src: "https://youtu.be/yTSA3R-rAMo" },
      { type: "video", label: "Product Video", src: "https://youtu.be/EMH5Av3ElTQ" },
      { type: "pdf", label: "Launch Writeup", src: "/assets/img/projects/HomeBuilt/writeup-829d20709e77139f.pdf", thumb: "/assets/img/projects/HomeBuilt/writeup-thumb-0507f42794c0654a.webp" },
      { type: "clip", label: "Testimonials", src: "/assets/img/projects/HomeBuilt/testimonials-ce1d5d401e574e2f.mp4", thumb: "/assets/img/projects/HomeBuilt/testimonials-manager-thumb.webp" },
      { type: "pdf", label: "Pitch Deck", src: "/assets/img/projects/HomeBuilt/pitch-bf629c79979743e1.pdf", thumb: "/assets/img/projects/HomeBuilt/pitch-thumb-d965f6cdc8d219e0.webp" }
    ],
    resources: [
      { label: "Video Pitch", url: "https://youtu.be/yTSA3R-rAMo" }
    ]
  },
  {
    id: "cookie-dispenser",
    year: 2022,
    title: "The Cookie Dispenser",
    subtitle: "A Device to Limit Obesity",
    layout: "spotlight",
    description: "A child-friendly cookie dispenser that dispenses one cookie daily, controlled via Bluetooth and smartphone application. Designed to help reduce childhood obesity rates.",
    images: [
      { src: "/assets/img/projects/CookieDispenser/image.png", alt: "Cookie Dispenser device" },
      { src: "/assets/img/projects/CookieDispenser/app.png", alt: "Cookie Dispenser app" }
    ],
    media: [
      { type: "video", label: "Project Video", src: "https://youtu.be/TzsfR5Whx-k" },
      { type: "pdf", label: "Presentation", src: "/assets/img/projects/CookieDispenser/presentation-f525e9dabde1717f.pdf", thumb: "/assets/img/projects/CookieDispenser/presentation-thumb-82ce0b791ba62fa5.webp" }
    ],
    resources: [
      { label: "Project Video", url: "https://youtu.be/TzsfR5Whx-k" }
    ]
  },
  {
    // Archived: hidden from the site. Its assets live in archive/projects/TractX;
    // move them back to public/assets/img/projects/TractX and drop this flag to restore.
    archived: true,
    id: "tractx",
    year: 2024,
    title: "TractX",
    subtitle: "A Density-Aware Streamline Exclusion System for Accurate White Matter Reconstruction",
    layout: "spotlight",
    description: "Resolves bottleneck issues in white matter tractography through a three-part pipeline utilizing a novel nerve-density-analysis architecture. Achieved 94.52% recall and 72.83% precision—216.15% higher precision than current state-of-the-art pipelines.",
    images: [
      { src: "/assets/img/projects/TractX/bottlneck.png", alt: "TractX visualization 1" },
      { src: "/assets/img/projects/TractX/corr.png", alt: "TractX visualization 2" },
      { src: "/assets/img/projects/TractX/tract.png", alt: "TractX visualization 3" }
    ],
    media: [
      { type: "pdf", label: "Poster", src: "/assets/img/projects/TractX/poster-7b14afb031d7943a.pdf", thumb: "/assets/img/projects/TractX/poster-thumb-43de54cfbf621669.webp" }
    ],
    resources: [
      { label: "Github Repo", url: "https://github.com/blizzard-labs/tractx-no-maps" }
    ]
  }
];

export const featuredVideos = [
  {
    id: "p16yuvj5rWI",
    title: '"The Space Between: Your Brain is Not a Biometric" | A Brief Introduction',
    channel: "Krishna Bhatt"
  },
  {
    id: "Uf-ZGhrgUkU",
    title: "The Fight Against Alzheimer's & Parkinson's",
    channel: "The Brain Brew Ride"
  },
  {
    id: "BY5uuJ8oXug",
    title: "The Missing Steps to the Big Picture (and How to Find Them)",
    channel: "TEDx Talks · TEDxBISV Youth"
  },
  {
    id: "vRbyVhcvi0g",
    title: "Big Ideas, Little Time: The Science of Powerful Pitches",
    channel: "TEDx Talks · TEDxBISV Youth"
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
      "THALis: EEG-driven Hand Control [IN DEVELOPMENT]",
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
  { src: "/assets/img/gallery/cityhall-purple.jpg", alt: "We lit city hall purple for Alzheimer's!", position: "center 80%" },
  { src: "/assets/img/gallery/brainbrew-filming.jpg", alt: "Filming day for the Brain Brew Ride [Oct 2026]" },
  { src: "/assets/img/gallery/alamo-square-empathy-cafe.jpg", alt: "Alamo Square with the Empathy Cafe" },
  { src: "/assets/img/gallery/film-set-interview.jpg", alt: "TEDxUnityPark Interview [Sep 2026]" },
  { src: "/assets/img/gallery/sanjose-recognition-2026.jpg", alt: "Recognized by the City of San Jose [Jun 2026]" },
  { src: "/assets/img/gallery/alaska-skiff.jpg", alt: "Skiff ride through the fjords in Alaska [May 2026]" },
  { src: "/assets/img/gallery/sciencefair-ribbons-2026.jpg", alt: "Science fair friends! [Mar 2026]" },
  { src: "/assets/img/gallery/kayaking.jpg", alt: "Kayaking on the bay [Oct 2025]" },
  { src: "/assets/img/gallery/mesonet-poster.jpg", alt: "Presenting MesoNet [Mar 2025]" },
  { src: "/assets/img/gallery/classroom-under-desk.jpg", alt: "Science Fair Students, engineering under a desk [Sep 2024]" },
  { src: "/assets/img/gallery/paper-airplanes.jpg", alt: "Science Fair students test flight! [Sep 2024]" },
  { src: "/assets/img/gallery/pc-build.jpg", alt: "Old gamer parts = new GPU rig [Jun 2024]" },
  { src: "/assets/img/gallery/sanjose-recognition-2024.jpg", alt: "Commendation from the City of San Jose [Apr 2024]" },
  { src: "/assets/img/gallery/tractx-poster.jpg", alt: "Presenting TractX [Mar 2024]" },
  { src: "/assets/img/gallery/whitehouse-selfie.jpg", alt: "Outside the West Wing [Nov 2023]" },
  { src: "/assets/img/gallery/whitehouse-donut.jpg", alt: "Donut break at the White House [Nov 2023]" },
  { src: "/assets/img/gallery/fall-wearable-poster.jpg", alt: "Presenting the fall-prevention wearable [Oct 2023]" },
  { src: "/assets/img/gallery/trophies-pineapple.jpg", alt: "World Scholar's Cup Awards! [Jul 2023]" },
  { src: "/assets/img/gallery/smka.jpeg", alt: "P2 at Formula KFX (CCKRA) [Jul 2026]" },
  { src: "/assets/img/gallery/alaska.jpg", alt: "Alaska Research Expedition on the Endeavor [Jun 2026]" },
  { src: "/assets/img/gallery/elementaryclass.jpg", alt: "Last day of school special talk at my sister's class!" },
  { src: "/assets/img/gallery/isefawards_new.jpeg", alt: "Comp Bio Awards [May 2026]" },
  { src: "/assets/img/gallery/isef_new.jpg", alt: "ISEF 26 Booth [May 2026]" },
  { src: "/assets/img/gallery/group_new.jpg", alt: "ISEF 26 Silicon Valley Delegation [May 2026]" },
  { src: "/assets/img/gallery/stanford.jpeg", alt: "Visiting Dr. Hainmueller's Lab [Apr 2026]" },
  { src: "/assets/img/gallery/award_new.png", alt: "Grand award at Silicon Valley Science Fair" },
  { src: "/assets/img/gallery/candlelight.jpeg", alt: "Power outage! Working by candlelight" },
  { src: "/assets/img/gallery/image.png", alt: "2-stroke Karting top 10!" },
  { src: "/assets/img/gallery/datagathering.png", alt: "Gathering data" },
  { src: "/assets/img/gallery/5k.jpg", alt: "Running 5K after Amma defeats cancer!" },
  { src: "/assets/img/gallery/citycouncil.jpg", alt: "City Council Recognition" },
  { src: "/assets/img/gallery/tedtalk.jpg", alt: "TEDxBISV 2025" },
  { src: "/assets/img/gallery/eegdata.jpeg", alt: "EEG working! [Nov 2025]" },
  { src: "/assets/img/gallery/DCsummit.jpg", alt: "Diamond Challenge Summit" },
  { src: "/assets/img/gallery/csef.jpg", alt: "CSEF 2025" },
  { src: "/assets/img/gallery/synopsysAwards.jpg", alt: "Grand award alternate at Silicon Valley Science Fair" },
  { src: "/assets/img/gallery/sft.jpeg", alt: "BISV Middle Science Fair Team! [Sep 2024]" },
  { src: "/assets/img/gallery/firstpodium.jpg", alt: "First Podium [Jun 2025]" },
  { src: "/assets/img/gallery/firstcomplab.jpeg", alt: "First Day at the Holmes Lab [Jun 2025]" },
  { src: "/assets/img/gallery/firstultraprecisetract.png", alt: "Ultra precise tractogram" },
  { src: "/assets/img/gallery/tedbisv24.jpeg", alt: "TEDxBISV 2024" },
  { src: "/assets/img/gallery/tractv1.jpeg", alt: "TractX Version 1 [Dec 2023]" },
  { src: "/assets/img/gallery/firstEngineering.jpg", alt: "First Engineering in the entire US!" },
  { src: "/assets/img/gallery/congress.jpg", alt: "Advocacy at the White House" },
  { src: "/assets/img/gallery/nationals.jpg", alt: "Thermo Fisher JIC Booth" },
  { src: "/assets/img/gallery/challenge.jpg", alt: "Engineering Challenge" },
  { src: "/assets/img/gallery/construct.jpg", alt: "Working on the Balancerator [Nov 2022]" },
  { src: "/assets/img/gallery/elementary_new.jpg", alt: "First science fair" },
];
