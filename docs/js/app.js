
// Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }

        // Intersection Observer for skill bars
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

// MODAL
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            // Show success modal
            document.getElementById('success-modal').style.display = 'flex';
            form.reset();
        } else {
            alert('There was a problem sending your message. Please try again.');
        }
    })
    .catch(error => {
        alert('There was an error: ' + error.message);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
});

// Close modal handlers
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('success-modal').style.display = 'none';
});

document.querySelector('.modal-close-btn').addEventListener('click', function() {
    document.getElementById('success-modal').style.display = 'none';
});

// Close when clicking outside modal
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('success-modal')) {
        document.getElementById('success-modal').style.display = 'none';
    }
});

document.querySelector('.email-link').addEventListener('click', function(e) {
    // Check if the user is likely on a Google service
    if (document.cookie.match(/GOOGLE_ACCOUNT/)) {
      e.preventDefault();
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=zachary.z.prejean@gmail.com', '_blank');
    }
    // Otherwise let the default mailto: link work
  });
