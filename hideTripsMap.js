/**
 * Hide Trips Map Button Action - DIAGNOSTIC VERSION
 * This version will show detailed debug info to help diagnose the issue
 */

geotab.customButtons.hideTripsMap = function(event, api, state) {
    console.log('%c=== TOGGLE MAP BUTTON CLICKED ===', 'color: blue; font-weight: bold; font-size: 14px');
    console.log('Current URL:', window.location.href);
    console.log('Page state:', state);

    // Track map visibility state globally
    if (typeof window.geotabMapHidden === 'undefined') {
        window.geotabMapHidden = false;
    }

    // Diagnostic: Show what we can find
    function diagnosticScan() {
        console.log('%cDIAGNOSTIC SCAN:', 'color: green; font-weight: bold');

        // Check all possible selectors
        const selectors = [
            '.react-trips-history__map-panel',
            '.react-trips-history__map-container',
            '#liveMap_mapCanvas',
            '.map-with-options',
            '.map-with-options__map',
            '#GoogleMapsMapCanvasId',
            '.gm-style',
            'div[class*="react-trips-history__map"]',
            'div[class*="map-panel"]',
            'div[class*="map-container"]'
        ];

        let found = false;
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`✓ Found ${elements.length} element(s) with selector: ${selector}`);
                elements.forEach((el, i) => {
                    console.log(`  [${i}]`, {
                        display: el.style.display,
                        visibility: el.style.visibility,
                        offsetHeight: el.offsetHeight,
                        offsetWidth: el.offsetWidth,
                        element: el
                    });
                });
                found = true;
            } else {
                console.log(`✗ No elements found with: ${selector}`);
            }
        });

        if (!found) {
            console.log('%cNO MAP ELEMENTS FOUND!', 'color: red; font-weight: bold');
            console.log('Listing all large divs instead:');

            const allDivs = document.querySelectorAll('div');
            const largeDivs = Array.from(allDivs).filter(d => d.offsetHeight > 300 && d.offsetWidth > 300);
            console.log(`Found ${largeDivs.length} large divs:`);
            largeDivs.slice(0, 10).forEach((div, i) => {
                console.log(`  [${i}]`, {
                    id: div.id,
                    class: div.className,
                    size: `${div.offsetWidth}x${div.offsetHeight}`
                });
            });
        }

        return found;
    }

    // Try to find map panel with multiple strategies
    function findMapPanel() {
        console.log('%cSEARCHING FOR MAP PANEL...', 'color: orange; font-weight: bold');

        const selectors = [
            '.react-trips-history__map-panel',
            '.react-trips-history__map-container',
            '#liveMap_mapCanvas',
            '.map-with-options',
            'div[class*="react-trips-history__map"]'
        ];

        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.offsetHeight > 100) {
                console.log('%c✓ MAP FOUND!', 'color: green; font-weight: bold');
                console.log('Selector:', selector);
                console.log('Element:', element);
                console.log('Size:', `${element.offsetWidth}x${element.offsetHeight}px`);
                return element;
            }
        }

        console.log('%c✗ MAP NOT FOUND with primary selectors', 'color: orange');
        return null;
    }

    // Run diagnostic first
    const scanFound = diagnosticScan();

    // Find the map panel
    let mapPanel = findMapPanel();

    // If not found, wait and try again
    if (!mapPanel) {
        console.log('%cWaiting 1 second and trying again...', 'color: orange');

        setTimeout(function() {
            console.log('%cRETRYING AFTER DELAY...', 'color: blue; font-weight: bold');
            diagnosticScan();
            mapPanel = findMapPanel();

            if (!mapPanel) {
                console.log('%c✗ STILL NOT FOUND!', 'color: red; font-weight: bold');
                console.log('Please copy all console output and share it for debugging.');
                alert('Map panel not found.\n\nPlease:\n1. Press F12 to open console\n2. Click this button again\n3. Copy all console output\n4. Share it for debugging');
                return;
            }

            // Found after delay
            console.log('%c✓ Found after delay!', 'color: green; font-weight: bold');
            toggleMap(mapPanel);
        }, 1000);

        return;
    }

    // Found immediately
    toggleMap(mapPanel);

    // Toggle function
    function toggleMap(element) {
        console.log('%cTOGGLING MAP...', 'color: blue; font-weight: bold');
        console.log('Element to toggle:', element);
        console.log('Current display:', element.style.display);
        console.log('Current hidden state:', window.geotabMapHidden);

        if (window.geotabMapHidden) {
            // Show map
            element.style.display = '';
            element.style.visibility = '';
            window.geotabMapHidden = false;

            try {
                localStorage.setItem('hideTripsMap_state', 'visible');
            } catch (e) {
                console.warn('Could not save state:', e);
            }

            console.log('%c✓ MAP SHOWN', 'color: green; font-weight: bold; font-size: 14px');
        } else {
            // Hide map
            element.style.display = 'none';
            window.geotabMapHidden = true;

            try {
                localStorage.setItem('hideTripsMap_state', 'hidden');
            } catch (e) {
                console.warn('Could not save state:', e);
            }

            console.log('%c✓ MAP HIDDEN', 'color: green; font-weight: bold; font-size: 14px');
        }

        console.log('New display:', element.style.display);
        console.log('New hidden state:', window.geotabMapHidden);
    }

    console.log('%c=== END OF BUTTON CLICK ===', 'color: blue; font-weight: bold; font-size: 14px');
};

console.log('%cHide Trips Map add-in loaded (DIAGNOSTIC version)', 'color: purple; font-weight: bold');
console.log('Version: Diagnostic with detailed logging');
console.log('Current URL:', window.location.href);
