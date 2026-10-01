document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dark/Light Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on click of link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 3. Interactive Skills Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            skillCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 4. Modal Popup Details for Projects ---
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');

    const projectData = {
        engine: {
            title: "3D 4-Cylinder Engine Assembly & Motion",
            description: "Modeled and assembled a complete 4-cylinder internal combustion engine using SolidWorks. Designed individual parts including the piston, piston pin, connecting rod, cap, and crankshaft. Applied precise concentric, distance, and mechanical mates to animate fluid mechanical motion.",
            tags: ["SolidWorks", "CAD", "Kinematics", "Mechanical Design"]
        },
        maintenance: {
            title: "Predictive Maintenance in Computer Labs",
            description: "Developed a prototype monitoring system for educational computer labs. Integrated environmental and temperature sensors with Arduino to log machine health and send warning alerts prior to hardware failures.",
            tags: ["Arduino", "IoT", "Sensors", "Predictive Analytics"]
        },
        jes: {
            title: "JES Club Centralized Web Portal",
            description: "Conceptualized and built a responsive front-end dashboard for Jharsuguda Engineering School to manage literary, digital, and photography student clubs with event registration interfaces.",
            tags: ["HTML5", "CSS3", "JavaScript", "UI/UX Design"]
        }
    };

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.dataset.project;
            const data = projectData[projectKey];

            if (data) {
                modalBody.innerHTML = `
                    <h2>${data.title}</h2>
                    <p style="margin: 15px 0; color: var(--text-muted);">${data.description}</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        ${data.tags.map(tag => `<span style="background:var(--bg-alt); padding:4px 10px; border-radius:4px; font-size:0.8rem;">${tag}</span>`).join('')}
                    </div>
                `;
                modal.style.display = 'flex';
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- 5. Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        formStatus.style.color = 'green';
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();

        setTimeout(() => {
            formStatus.textContent = '';
        }, 4000);
    });
});