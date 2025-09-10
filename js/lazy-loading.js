// 🚀 Advanced Lazy Loading System for Video Editor Portfolio
// Optimized for performance with intersection observers

class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.videoObserver = null;
        this.init();
    }

    init() {
        this.setupImageLazyLoading();
        this.setupVideoLazyLoading();
        this.setupIframeLazyLoading();
    }

    setupImageLazyLoading() {
        // Create intersection observer for images
        const imageObserverOptions = {
            root: null,
            rootMargin: '50px 0px', // Start loading 50px before entering viewport
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, imageObserverOptions);

        // Observe all images with data-src attribute
        this.observeImages();
    }

    setupVideoLazyLoading() {
        // Create intersection observer for videos
        const videoObserverOptions = {
            root: null,
            rootMargin: '100px 0px', // Start loading 100px before entering viewport
            threshold: 0.1
        };

        this.videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    this.loadVideo(video);
                    observer.unobserve(video);
                }
            });
        }, videoObserverOptions);

        // Observe all videos
        this.observeVideos();
    }

    setupIframeLazyLoading() {
        // Create intersection observer for iframes
        const iframeObserverOptions = {
            root: null,
            rootMargin: '200px 0px', // Start loading 200px before entering viewport
            threshold: 0.1
        };

        this.iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    this.loadIframe(iframe);
                    observer.unobserve(iframe);
                }
            });
        }, iframeObserverOptions);

        // Observe all iframes with data-src
        this.observeIframes();
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src], [data-background-image]');
        lazyImages.forEach(img => {
            // Add loading placeholder
            this.addImagePlaceholder(img);
            this.imageObserver.observe(img);
        });
    }

    observeVideos() {
        const lazyVideos = document.querySelectorAll('video[data-src], video source[data-src]');
        lazyVideos.forEach(video => {
            // Add loading placeholder for videos
            this.addVideoPlaceholder(video);
            this.videoObserver.observe(video);
        });
    }

    observeIframes() {
        const lazyIframes = document.querySelectorAll('iframe[data-src]');
        lazyIframes.forEach(iframe => {
            this.addIframePlaceholder(iframe);
            this.iframeObserver.observe(iframe);
        });
    }

    loadImage(img) {
        // Smooth fade-in animation when loading
        gsap.set(img, { opacity: 0 });

        if (img.dataset.src) {
            // Regular img element
            img.src = img.dataset.src;
            img.addEventListener('load', () => {
                gsap.to(img, { 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: 'power2.out' 
                });
                img.classList.add('loaded');
                this.removeImagePlaceholder(img);
            });
        } else if (img.dataset.backgroundImage) {
            // Background image
            const imageUrl = img.dataset.backgroundImage;
            const tempImg = new Image();
            tempImg.onload = () => {
                img.style.backgroundImage = `url(${imageUrl})`;
                gsap.to(img, { 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: 'power2.out' 
                });
                img.classList.add('loaded');
                this.removeImagePlaceholder(img);
            };
            tempImg.src = imageUrl;
        }

        // Remove data-src to prevent reloading
        delete img.dataset.src;
        delete img.dataset.backgroundImage;
    }

    loadVideo(video) {
        // Handle video elements and their sources
        if (video.tagName === 'VIDEO') {
            const sources = video.querySelectorAll('source[data-src]');
            sources.forEach(source => {
                source.src = source.dataset.src;
                delete source.dataset.src;
            });

            if (video.dataset.src) {
                video.src = video.dataset.src;
                delete video.dataset.src;
            }

            // Load the video
            video.load();
            
            // Fade in when ready
            video.addEventListener('loadedmetadata', () => {
                gsap.to(video, { 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: 'power2.out' 
                });
                video.classList.add('loaded');
                this.removeVideoPlaceholder(video);
            });

        } else if (video.tagName === 'SOURCE') {
            // Handle source elements
            video.src = video.dataset.src;
            delete video.dataset.src;
            
            const parentVideo = video.closest('video');
            if (parentVideo) {
                parentVideo.load();
                parentVideo.addEventListener('loadedmetadata', () => {
                    gsap.to(parentVideo, { 
                        opacity: 1, 
                        duration: 0.5, 
                        ease: 'power2.out' 
                    });
                    parentVideo.classList.add('loaded');
                    this.removeVideoPlaceholder(parentVideo);
                });
            }
        }
    }

    loadIframe(iframe) {
        // Load iframe
        iframe.src = iframe.dataset.src;
        delete iframe.dataset.src;

        // Fade in when loaded
        iframe.addEventListener('load', () => {
            gsap.to(iframe, { 
                opacity: 1, 
                duration: 0.8, 
                ease: 'power2.out' 
            });
            iframe.classList.add('loaded');
            this.removeIframePlaceholder(iframe);
        });
    }

    addImagePlaceholder(img) {
        // Add a subtle loading animation
        img.style.backgroundColor = 'rgba(189, 72, 91, 0.1)';
        img.style.backgroundImage = `
            linear-gradient(90deg, 
                transparent, 
                rgba(189, 72, 91, 0.2), 
                transparent
            )
        `;
        img.style.backgroundSize = '200% 100%';
        img.style.animation = 'shimmer 2s infinite';
        
        // Add shimmer keyframes if not already present
        this.addShimmerAnimation();
    }

    addVideoPlaceholder(video) {
        // Add loading placeholder for video
        video.style.backgroundColor = 'rgba(189, 72, 91, 0.1)';
        video.style.opacity = '0.3';
    }

    addIframePlaceholder(iframe) {
        // Add loading placeholder for iframe
        iframe.style.backgroundColor = 'rgba(189, 72, 91, 0.05)';
        iframe.style.opacity = '0.1';
        
        // Add loading spinner
        const spinner = document.createElement('div');
        spinner.className = 'iframe-loading-spinner';
        spinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 3px solid rgba(189, 72, 91, 0.3);
            border-top: 3px solid #bd485b;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10;
        `;
        
        // Insert spinner relative to iframe
        const container = iframe.parentElement;
        if (container) {
            container.style.position = 'relative';
            container.appendChild(spinner);
        }
        
        this.addSpinnerAnimation();
    }

    removeImagePlaceholder(img) {
        // Remove loading styles
        img.style.backgroundColor = '';
        img.style.backgroundImage = img.dataset.backgroundImage ? `url(${img.dataset.backgroundImage})` : '';
        img.style.backgroundSize = '';
        img.style.animation = '';
    }

    removeVideoPlaceholder(video) {
        // Remove loading styles
        video.style.backgroundColor = '';
    }

    removeIframePlaceholder(iframe) {
        // Remove loading styles and spinner
        iframe.style.backgroundColor = '';
        
        const spinner = iframe.parentElement?.querySelector('.iframe-loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    addShimmerAnimation() {
        // Add shimmer animation CSS if not present
        if (!document.querySelector('#shimmer-animation')) {
            const style = document.createElement('style');
            style.id = 'shimmer-animation';
            style.textContent = `
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addSpinnerAnimation() {
        // Add spinner animation CSS if not present
        if (!document.querySelector('#spinner-animation')) {
            const style = document.createElement('style');
            style.id = 'spinner-animation';
            style.textContent = `
                @keyframes spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Convert existing elements to lazy loading
    convertToLazyLoading() {
        // Convert images
        const images = document.querySelectorAll('img[src]:not([data-src])');
        images.forEach(img => {
            if (img.src && !img.classList.contains('no-lazy')) {
                img.dataset.src = img.src;
                img.src = ''; // Clear src to prevent loading
                img.style.opacity = '0.3';
                this.imageObserver.observe(img);
            }
        });

        // Convert videos  
        const videos = document.querySelectorAll('video[src]:not([data-src])');
        videos.forEach(video => {
            if (video.src && !video.classList.contains('no-lazy')) {
                video.dataset.src = video.src;
                video.src = ''; // Clear src
                video.style.opacity = '0.3';
                this.videoObserver.observe(video);
            }
        });

        // Convert video sources
        const sources = document.querySelectorAll('video source[src]:not([data-src])');
        sources.forEach(source => {
            if (source.src && !source.parentElement.classList.contains('no-lazy')) {
                source.dataset.src = source.src;
                source.src = '';
                const video = source.closest('video');
                if (video) {
                    video.style.opacity = '0.3';
                    this.videoObserver.observe(source);
                }
            }
        });
    }

    // Method to preload critical resources
    preloadCriticalResources() {
        // Preload hero images and above-the-fold content
        const criticalImages = document.querySelectorAll('.critical-image, .hero img, .preload');
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                delete img.dataset.src;
            }
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        window.lazyLoader = new LazyLoader();
        
        // Convert existing elements after a short delay to allow initial render
        setTimeout(() => {
            window.lazyLoader.convertToLazyLoading();
        }, 100);
        
        // Preload critical resources immediately
        window.lazyLoader.preloadCriticalResources();
    } else {
        console.warn('IntersectionObserver not supported - lazy loading disabled');
        // Fallback: load all images immediately for older browsers
        const allImages = document.querySelectorAll('[data-src]');
        allImages.forEach(element => {
            if (element.dataset.src) {
                element.src = element.dataset.src;
                delete element.dataset.src;
            }
        });
    }
});

// Export for global access
window.LazyLoader = LazyLoader;
