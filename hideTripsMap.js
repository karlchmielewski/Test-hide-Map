/**
 * Hide Trips Map Button Action - WORKING VERSION
 * Supports both Classic and React Trips History layouts
 */

geotab.customButtons.hideTripsMap = function(event, api, state) {
    console.log('Toggle Map button clicked');

    // Track map visibility state globally
    if (typeof window.geotabMapHidden === 'undefined') {
        window.geotabMapHidden = false;
    }

    // Try multiple selectors for different MyGeotab layouts
    function findMapPanel() {
        const selectors = [
            // Classic Trips History (detected from your page)
            '#tripsHistory_map',                          // Main map panel container
            '.trips-history__map-panel',                  // Map panel by class
            '#historyTrips_ToolbarAndMapCanvasLayout',   // Toolbar and map layout
            '.trips-history__map',                        // Map div
            '#liveMap_mapCanvas',                         // Map canvas

            // React Trips History (for other users)
            '.react-trips-history__map-panel',
            '.react-trips-history__map-container',

            // Generic map containers
            '.map-with-options',
            '#GoogleMapsMapCanvasId'
        ];

        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.offsetHeight > 100) {
                console.log('✓ Map found with selector:', selector);
                console.log('Element:', element);
                console.log('Size:', `${element.offsetWidth}x${element.offsetHeight}px`);
                return element;
            }
        }

        console.log('✗ Map not found');
        return null;
    }

    // Find the map panel
    let mapPanel = findMapPanel();

    // If not found, wait and try again (page might still be loading)
    if (!mapPanel) {
        console.log('Waiting 500ms and retrying...');

        setTimeout(function() {
            mapPanel = findMapPanel();

            if (!mapPanel) {
                console.error('Map panel not found after retry');
                alert('Could not find map panel.\n\nPlease make sure you are on the Trips History page and the map is visible.');
                return;
            }

            // Found after waiting
            toggleMap(mapPanel);
        }, 500);

        return;
    }

    // Found immediately
    toggleMap(mapPanel);

    // Toggle function
    function toggleMap(element) {
        console.log('Toggling map visibility...');
        console.log('Current hidden state:', window.geotabMapHidden);

        if (window.geotabMapHidden) {
            // Show map
            element.style.display = '';
            element.style.visibility = '';
            window.geotabMapHidden = false;

            // Save preference
            try {
                localStorage.setItem('hideTripsMap_state', 'visible');
            } catch (e) {
                console.warn('Could not save state:', e);
            }

            console.log('✓ Map shown');
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

            console.log('✓ Map hidden');
        }
    }
};

// Auto-restore previous state when page loads
(function() {
    try {
        const savedState = localStorage.getItem('hideTripsMap_state');
        if (savedState === 'hidden') {
            // Wait for page to load, then hide map automatically
            setTimeout(function() {
                const selectors = [
                    '#tripsHistory_map',
                    '.trips-history__map-panel',
                    '.react-trips-history__map-panel',
                    '#liveMap_mapCanvas'
                ];

                for (let selector of selectors) {
                    const mapPanel = document.querySelector(selector);
                    if (mapPanel && mapPanel.offsetHeight > 100) {
                        mapPanel.style.display = 'none';
                        window.geotabMapHidden = true;
                        console.log('✓ Map auto-hidden based on saved preference');
                        break;
                    }
                }
            }, 1500);
        }
    } catch (e) {
        console.warn('Could not restore map state:', e);
    }
})();

console.log('Hide Trips Map add-in loaded (v1.0 - Classic & React support)');
