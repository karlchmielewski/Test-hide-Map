/**
 * Hide Trips Map Button Action - FINAL VERSION
 * Specifically targets MyGeotab Trips History map panel
 * Waits for page to load and tries multiple selectors
 */

geotab.customButtons.hideTripsMap = function(event, api, state) {
    console.log('Toggle Map button clicked');

    // Track map visibility state globally
    if (typeof window.geotabMapHidden === 'undefined') {
        window.geotabMapHidden = false;
    }

    // Try multiple selectors based on detected structure
    function findMapPanel() {
        const selectors = [
            '.react-trips-history__map-panel',
            '.react-trips-history__map-container',
            '#liveMap_mapCanvas',
            '.map-with-options',
            'div[class*="react-trips-history__map"]'
        ];

        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log('Map found with selector:', selector);
                return element;
            }
        }

        return null;
    }

    // Find the map panel
    let mapPanel = findMapPanel();

    // If not found, wait a bit and try again (page might still be loading)
    if (!mapPanel) {
        console.log('Map not found immediately, waiting for page load...');

        setTimeout(function() {
            mapPanel = findMapPanel();

            if (!mapPanel) {
                console.error('Map panel still not found after waiting!');
                alert('Map panel not found. Please wait for the page to fully load and try again.');
                return;
            }

            // Found it after waiting, now toggle
            toggleMap(mapPanel);
        }, 500);

        return; // Exit and let the timeout handle it
    }

    // Found it immediately, toggle now
    toggleMap(mapPanel);

    // Toggle function
    function toggleMap(element) {
        console.log('Toggling map panel:', element);

        if (window.geotabMapHidden) {
            // Show map
            element.style.display = '';
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
            element.style.display = 'none';
            window.geotabMapHidden = true;

            // Save preference
            try {
                localStorage.setItem('hideTripsMap_state', 'hidden');
            } catch (e) {
                console.warn('Could not save state:', e);
            }

            console.log('Map hidden');
        }
    }
};

// Auto-restore previous state when page loads
(function() {
    try {
        const savedState = localStorage.getItem('hideTripsMap_state');
        if (savedState === 'hidden') {
            // Wait longer for page to fully load before auto-hiding
            setTimeout(function() {
                const selectors = [
                    '.react-trips-history__map-panel',
                    '.react-trips-history__map-container',
                    '#liveMap_mapCanvas',
                    '.map-with-options'
                ];

                for (let selector of selectors) {
                    const mapPanel = document.querySelector(selector);
                    if (mapPanel) {
                        mapPanel.style.display = 'none';
                        window.geotabMapHidden = true;
                        console.log('Map auto-hidden based on saved preference');
                        break;
                    }
                }
            }, 2000);
        }
    } catch (e) {
        console.warn('Could not restore map state:', e);
    }
})();

console.log('Hide Trips Map add-in loaded (FINAL version - multi-selector)');
