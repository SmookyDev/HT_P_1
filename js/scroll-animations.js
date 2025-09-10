// 🎬 Advanced Scroll Animations for Video Editor Portfolio
// Modern, smooth animations perfect for showcasing video editing skills

class AdvancedScrollAnimations {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        // Respect user's motion preferences
        if (this.prefersReducedMotion) {
            this.setupReducedMotionFallbacks();
            return;
        }

        this.setupScrollTriggerAnimations();
        this.setupParallaxEffects();
        this.setupTextRevealAnimations();
        this.setupVideoGalleryAnimations();
        this.setupSectionTransitions();
        this.setupHoverAnimations();
        this.setupMagneticEffects();
        this.setupFloatingNavigation();
        this.setupMobileOptimizations();
    }

    setupScrollTriggerAnimations() {
        // Smooth fade in from bottom
        gsap.registerPlugin(ScrollTrigger);

        // Section headers with stagger
        gsap.fromTo(".section-transition", {
            y: this.isMobile ? 50 : 100,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: this.isMobile ? 0.6 : 1,
            stagger: this.isMobile ? 0.1 : 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".section-transition",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Video cards animation
        gsap.fromTo(".video-item", {
            scale: 0.8,
            y: 50,
            opacity: 0,
        }, {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".video-scroll-gallery",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // Tools/Software icons animation
        gsap.fromTo(".grid-item", {
            rotateY: 90,
            opacity: 0,
            scale: 0.5,
        }, {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".grids",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Main video container dramatic reveal
        gsap.fromTo(".main-video-container", {
            scale: 0.9,
            y: 100,
            opacity: 0,
        }, {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".main-video-container",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }

    setupParallaxEffects() {
        // Background parallax for sections
        gsap.registerPlugin(ScrollTrigger);

        // Smooth parallax for background elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Floating animation for hero elements
        gsap.to(".floating-element", {
            y: -20,
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.5
        });
    }

    setupTextRevealAnimations() {
        // Typewriter effect for hero text
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                onEnter: () => {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        element.textContent += text[i];
                        i++;
                        if (i >= text.length) {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }
            });
        });

        // Split text reveal animation
        const splitTextElements = document.querySelectorAll('.split-text');
        
        splitTextElements.forEach(element => {
            const text = element.textContent;
            const letters = text.split('').map(letter => 
                letter === ' ' ? '&nbsp;' : `<span class="letter">${letter}</span>`
            ).join('');
            
            element.innerHTML = letters;
            
            gsap.fromTo(element.querySelectorAll('.letter'), {
                opacity: 0,
                y: 50,
                rotateX: 90,
            }, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.05,
                stagger: 0.02,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Gradient text reveal
        gsap.fromTo(".gradient-reveal", {
            backgroundPosition: "-100% 0",
        }, {
            backgroundPosition: "100% 0",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".gradient-reveal",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }

    setupVideoGalleryAnimations() {
        // Smooth video thumbnail hover effects
        const videoItems = document.querySelectorAll('.video-item');
        
        videoItems.forEach(item => {
            const video = item.querySelector('video');
            const overlay = item.querySelector('.absolute');
            
            // Smooth hover enter
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.4,
                    ease: "power3.out"
                });
                
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.3
                });
                
                if (video) video.play();
            });
            
            // Smooth hover leave
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out"
                });
                
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3
                });
                
                if (video) video.pause();
            });
        });

        // Gallery navigation animations
        const navButtons = document.querySelectorAll('.gallery-nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                gsap.fromTo(btn, {
                    scale: 0.9,
                }, {
                    scale: 1.1,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
            });
        });
    }

    setupSectionTransitions() {
        // Smooth section reveals
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Add a subtle entrance animation
            gsap.fromTo(section, {
                opacity: 0,
                y: 30,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Progress indicator
        gsap.to(".progress-bar", {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    }

    setupHoverAnimations() {
        // Enhanced button hover effects
        const buttons = document.querySelectorAll('button, .btn, a[href]');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Image hover effects
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.02,
                    filter: "brightness(1.1)",
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            img.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    filter: "brightness(1)",
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });
    }

    setupMagneticEffects() {
        // Magnetic hover effect for special elements
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    setupFloatingNavigation() {
        const floatingNav = document.getElementById('floating-nav');
        const navDots = document.querySelectorAll('.nav-dot');
        
        if (!floatingNav) return;
        
        // Show navigation after scrolling past hero
        ScrollTrigger.create({
            trigger: "#home",
            start: "bottom 80%",
            end: "bottom top",
            onEnter: () => {
                gsap.to(floatingNav, { opacity: 1, duration: 0.5 });
            },
            onLeaveBack: () => {
                gsap.to(floatingNav, { opacity: 0, duration: 0.5 });
            }
        });
        
        // Smooth scroll functionality
        navDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = dot.getAttribute('href');
                this.scrollToSection(targetId);
                
                // Visual feedback
                gsap.to(dot, {
                    scale: 1.3,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
            });
        });
        
        // Active state based on scroll position
        const sections = ['#home', '#tools', '#works', '#contact'];
        
        sections.forEach((sectionId, index) => {
            ScrollTrigger.create({
                trigger: sectionId,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => {
                    navDots.forEach(dot => dot.classList.remove('active'));
                    navDots[index]?.classList.add('active');
                    
                    gsap.to(navDots[index], {
                        backgroundColor: '#bd485b',
                        scale: 1.2,
                        duration: 0.3
                    });
                },
                onLeave: () => {
                    gsap.to(navDots[index], {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        scale: 1,
                        duration: 0.3
                    });
                },
                onEnterBack: () => {
                    navDots.forEach(dot => dot.classList.remove('active'));
                    navDots[index]?.classList.add('active');
                    
                    gsap.to(navDots[index], {
                        backgroundColor: '#bd485b',
                        scale: 1.2,
                        duration: 0.3
                    });
                },
                onLeaveBack: () => {
                    gsap.to(navDots[index], {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        scale: 1,
                        duration: 0.3
                    });
                }
            });
        });
    }

    // Smooth scroll to sections
    scrollToSection(sectionId) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: sectionId,
                autoKill: false
            },
            ease: "power3.inOut"
        });
    }

    // Add loading progress animation
    animateLoadingProgress(progress) {
        gsap.to(".loading-bar", {
            width: progress + "%",
            duration: 0.5,
            ease: "power2.out"
        });
    }

    setupMobileOptimizations() {
        if (this.isMobile) {
            // Reduce animation intensity on mobile
            gsap.globalTimeline.timeScale(1.5); // Speed up animations by 50%
            
            // Disable complex animations on mobile for performance
            gsap.set(".floating-element", { clearProps: "all" });
            gsap.set(".magnetic", { clearProps: "all" });
            
            // Use simpler parallax on mobile
            const mobileParallaxElements = document.querySelectorAll('[data-parallax]');
            mobileParallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) * 0.3; // Reduce parallax intensity
                
                gsap.to(element, {
                    yPercent: -10 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: element,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });
            });
            
            // Disable video hover effects on mobile (touch devices)
            const videoItems = document.querySelectorAll('.video-item');
            videoItems.forEach(item => {
                item.style.transform = 'none';
                item.style.transition = 'none';
            });
        }
        
        // Optimize for battery and performance
        this.setupPerformanceOptimizations();
    }

    setupReducedMotionFallbacks() {
        // Provide reduced motion alternatives
        console.log('Reduced motion preferences detected - using minimal animations');
        
        // Simple fade-ins instead of complex animations
        gsap.fromTo(".section-transition", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".section-transition",
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
        
        // Remove all transform-based animations
        gsap.set(".floating-element, .magnetic, [data-parallax]", { clearProps: "all" });
        
        // Simple video loading without hover effects
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const video = item.querySelector('video');
                if (video) {
                    video.play();
                }
            });
        });
    }

    setupPerformanceOptimizations() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                gsap.globalTimeline.pause();
            } else {
                gsap.globalTimeline.resume();
            }
        });
        
        // Reduce animation frequency on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            gsap.globalTimeline.timeScale(2); // Double speed to reduce duration
        }
        
        // Throttle scroll animations on mobile
        if (this.isMobile) {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                scrollTimeout = setTimeout(() => {
                    // Process scroll animations
                }, 16); // ~60fps
            });
        }
    }

    // Method to toggle animations based on performance
    toggleHighPerformanceMode(enable) {
        if (enable) {
            gsap.globalTimeline.timeScale(2);
            gsap.set(".floating-element, .magnetic", { clearProps: "all" });
        } else {
            gsap.globalTimeline.timeScale(1);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        window.scrollAnimations = new AdvancedScrollAnimations();
    } else {
        console.warn('GSAP not loaded - animations disabled');
    }
});

// Export for global access
window.AdvancedScrollAnimations = AdvancedScrollAnimations;
