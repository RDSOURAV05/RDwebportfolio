document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. KICK OFF INTRO SCREEN LOGIC
    // ==========================================
    const introScreen = document.getElementById('intro-screen');
    const enterBtn = document.getElementById('enter-career-btn');
    
    // Check session storage so it only plays once per session
    if (!sessionStorage.getItem('introPlayed')) {
        enterBtn.addEventListener('click', () => {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
                sessionStorage.setItem('introPlayed', 'true');
            }, 800);
        });
    } else {
        introScreen.style.display = 'none';
    }

    // ==========================================
    // 2. NAVBAR & MOBILE TOGGLE
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 7, 18, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(3, 7, 18, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // ==========================================
    // 3. SCROLL REVEAL & ATTRIBUTE BARS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const attrFills = document.querySelectorAll('.attr-bar-fill');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If this is the attributes section, fill the bars
                if (entry.target.classList.contains('attr-category')) {
                    const bars = entry.target.querySelectorAll('.attr-bar-fill');
                    bars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Timeline fill
    const timeline = document.querySelector('.journey-timeline');
    const timelineProgress = document.getElementById('timeline-progress');
    if (timeline && timelineProgress) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        timelineProgress.style.width = '100%';
                    }, 500);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        timelineObserver.observe(timeline);
    }

    // ==========================================
    // 4. ACTIVE NAV STATE SYNC
    // ==========================================
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#` + current) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 5. MATCH REPORT MODAL (PROJECTS)
    // ==========================================
    const matchData = {
        "1": {
            title: "Smart College Bus Management",
            tech: "React • Firebase • GPS API",
            obj: "Solve the daily logistics challenge of coordinating college transport fleets by providing real-time data.",
            features: [
                "Live geolocation tracking of buses on campus.",
                "Real-time routing and ETA updates for students.",
                "Admin dashboard for fleet monitoring.",
                "Responsive React UI paired with fast Firebase syncing."
            ],
            contrib: "Engineered the full frontend architecture and integrated GPS tracking logic. The result was a deployable system that drastically reduced student wait times.",
            github: "https://github.com/RDSOURAV05/College_Bus_S6_Mini_Project",
            demo: null
        },
        "2": {
            title: "Tomato Leaf Disease Detector",
            tech: "Python • Deep Learning • CNN",
            obj: "Aid agricultural sustainability by automating the early detection of crop diseases using computer vision.",
            features: [
                "Custom Convolutional Neural Network trained on leaf image datasets.",
                "High accuracy classification of multiple disease types.",
                "Image preprocessing pipeline for robust feature extraction."
            ],
            contrib: "Developed and trained the core deep learning model in Python, optimizing the CNN architecture for high validation accuracy resulting in a reliable diagnostic tool.",
            github: "https://github.com/RDSOURAV05/Tomato_leaf_disease_ID",
            demo: null
        },
        "3": {
            title: "JRJS Clinical Assistant & Portal",
            tech: "LangGraph • RAG • AI Agents",
            obj: "Modernize hospital triage and appointment booking with an intelligent, multi-node RAG conversational agent.",
            features: [
                "Multi-node LangGraph agent flow for complex clinical reasoning.",
                "RAG-powered chatbot utilizing medical guidelines.",
                "Seamless appointment triage interface."
            ],
            contrib: "Architected the LangGraph state machine and integrated the RAG search tools. Resulted in a highly interactive, intelligent healthcare portal deployed live.",
            github: "https://github.com/RDSOURAV05/ai-powered-hospital-appointment",
            demo: "https://rdsourav05.github.io/ai-powered-hospital-appointment/"
        },
        "4": {
            title: "Blood Donation Management",
            tech: "Python • Flask • MySQL",
            obj: "Bridge the gap between donors, hospitals, and blood banks during emergencies to save lives efficiently.",
            features: [
                "Centralized inventory management for blood banks.",
                "Emergency request coordination system.",
                "Secure MySQL relational database for donor matching.",
                "Flask backend routing and API architecture."
            ],
            contrib: "Built the relational database schema and Flask backend, creating a robust, transactional platform for critical healthcare coordination.",
            github: "https://github.com/RDSOURAV05/Blood_connect",
            demo: null
        }
    };

    const modal = document.getElementById('match-modal');
    const modalClose = document.querySelector('.modal-close');
    const matchCards = document.querySelectorAll('.match-card');
    
    // Modal elements
    const mTitle = document.getElementById('modal-title');
    const mTech = document.getElementById('modal-tech');
    const mObj = document.getElementById('modal-obj');
    const mFeatures = document.getElementById('modal-features');
    const mContrib = document.getElementById('modal-contrib');
    const mLinks = document.getElementById('modal-links');

    matchCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project');
            const data = matchData[id];
            if(!data) return;

            // Populate data
            mTitle.textContent = data.title;
            mTech.textContent = data.tech;
            mObj.textContent = data.obj;
            mContrib.textContent = data.contrib;
            
            mFeatures.innerHTML = '';
            data.features.forEach(f => {
                const li = document.createElement('li');
                li.textContent = f;
                mFeatures.appendChild(li);
            });

            mLinks.innerHTML = '';
            if(data.github) {
                mLinks.innerHTML += `<a href="${data.github}" target="_blank" class="btn btn-primary"><span><i class="fa-brands fa-github"></i> GITHUB</span></a>`;
            }
            if(data.demo) {
                mLinks.innerHTML += `<a href="${data.demo}" target="_blank" class="btn btn-secondary"><span><i class="fa-solid fa-arrow-up-right-from-square"></i> LIVE DEMO</span></a>`;
            }

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent bg scroll
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

});
