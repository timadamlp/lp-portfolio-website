/**
 * Elite Content Solutions - Portfolio Filter
 * Filtering functionality for the portfolio grid
 */

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilters();
});

/**
 * Initialize Portfolio Filters
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-filters .filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            filterPortfolio(filterValue, portfolioItems);
        });
    });
    
    // Initialize portfolio with animation classes
    portfolioItems.forEach((item, index) => {
        item.classList.add('scroll-animation');
        
        // Add staggered animation delay
        const delay = Math.min(index, 4); // Limit to 5 stagger levels
        item.classList.add(`stagger-${delay}`);
    });
}

/**
 * Filter Portfolio Items
 * @param {string} filter - The filter category
 * @param {NodeList} items - The portfolio items to filter
 */
function filterPortfolio(filter, items) {
    items.forEach(item => {
        // Reset animation classes
        item.classList.remove('visible');
        
        if (filter === 'all') {
            // Show all items with a staggered animation
            setTimeout(() => {
                item.style.display = 'block';
                
                // Trigger reflow to restart animation
                void item.offsetWidth;
                
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            }, 50);
        } else {
            // Check if item has the selected category
            if (item.classList.contains(filter)) {
                setTimeout(() => {
                    item.style.display = 'block';
                    
                    // Trigger reflow to restart animation
                    void item.offsetWidth;
                    
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 10);
                }, 50);
            } else {
                // Hide items that don't match
                item.style.display = 'none';
            }
        }
    });
}

/**
 * Initialize Portfolio Item Modal
 * Opens a modal when a portfolio item is clicked
 */
function initPortfolioModal() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    // Create modal container if it doesn't exist
    let modal = document.getElementById('portfolio-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'portfolio-modal';
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close button functionality
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            // Enable scrolling on body again
            document.body.style.overflow = '';
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
                // Enable scrolling on body again
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                // Enable scrolling on body again
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add click event to portfolio links
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfUrl = this.getAttribute('href');
            const title = this.closest('.portfolio-info').querySelector('h3').textContent;
            
            // If it's a PDF, create PDF viewer or iframe
            if (pdfUrl.endsWith('.pdf')) {
                const modalBody = modal.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <h2>${title}</h2>
                    <div class="pdf-viewer">
                        <iframe src="${pdfUrl}" width="100%" height="600px"></iframe>
                    </div>
                `;
            } else {
                // Handle other types of links
                const modalBody = modal.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <h2>${title}</h2>
                    <p>Loading content...</p>
                `;
                
                // You could implement AJAX loading here if needed
            }
            
            // Show modal
            modal.classList.add('active');
            
            // Disable scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });
}

/**
 * Initialize Isotope Grid (if needed for more advanced filtering)
 * Note: This requires the Isotope.js library to be included
 */
function initIsotopeGrid() {
    // Check if Isotope is available
    if (typeof Isotope !== 'undefined') {
        const grid = document.querySelector('.portfolio-grid');
        
        // Initialize Isotope
        const iso = new Isotope(grid, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        
        // Filter items on button click
        const filterButtons = document.querySelectorAll('.portfolio-filters .filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter items
                if (filterValue === 'all') {
                    iso.arrange({ filter: '*' });
                } else {
                    iso.arrange({ filter: `.${filterValue}` });
                }
            });
        });
    }
}
