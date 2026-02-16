/**
 * Hide Trips Map Button Action - FINAL VERSION
 * Specifically targets MyGeotab Trips History map panel
 * Based on detected selector: .react-trips-history__map-panel
 */

geotab.customButtons.hideTripsMap = function(event, api, state) {
    console.log('Toggle Map button clicked');

    // Track map visibility state globally
    if (typeof window.geotabMapHidden === 'undefined') {
        window.geotabMapHidden = false;
    }

    // Find the map panel using the specific selector
    const mapPanel = document.querySelector('.react-trips-history__map-panel');

    if (!mapPanel) {
        console.error('Map panel not found!');
        alert('Map panel not found. Please make sure you are on the Trips History page.');
        return;
    }

    console.log('Map panel found:', mapPanel);

    // Toggle visibility
    if (window.geotabMapHidden) {
        // Show map
        mapPanel.style.display = '';
        window.geotabMapHidden = false;

        // Save preference
        try {
            localStorage.setItem('hideTripsMap_state', 'visible');
        } catch (e) {
            console.warn('Could not save state:', e);
        }

        console.log('Map shown');
    } else {
        // Hide map
        mapPanel.style.display = 'none';
        window.geotabMapHidden = true;

        // Save preference
        try {
            localStorage.setItem('hideTripsMap_state', 'hidden');
        } catch (e) {
            console.warn('Could not save state:', e);
        }

        console.log('Map hidden');
    }
};

// Auto-restore previous state when page loads
(function() {
    try {
        const savedState = localStorage.getItem('hideTripsMap_state');
        if (savedState === 'hidden') {
            // Wait for page to load, then hide map automatically
            setTimeout(function() {
                const mapPanel = document.querySelector('.react-trips-history__map-panel');
                if (mapPanel) {
                    mapPanel.style.display = 'none';
                    window.geotabMapHidden = true;
                    console.log('Map auto-hidden based on saved preference');
                }
            }, 1000);
        }
    } catch (e) {
        console.warn('Could not restore map state:', e);
    }
})();

console.log('Hide Trips Map add-in loaded (FINAL version)');
