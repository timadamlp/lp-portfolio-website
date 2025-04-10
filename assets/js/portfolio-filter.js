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
 * Initialize Portfolio Item Links
 * Ensures all portfolio links open in new tab
 */
function initPortfolioLinks() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    portfolioLinks.forEach(link => {
        // Ensure target="_blank" is set
        link.setAttribute('target', '_blank');
        
        // Add rel="noopener noreferrer" for security
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Initialize portfolio links when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioLinks();
});

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
