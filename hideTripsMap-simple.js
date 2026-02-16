/**
 * Hide Trips Map - ULTRA SIMPLE VERSION
 * Minimal code for maximum reliability
 */

geotab.customButtons.hideTripsMap = function(event, api, state) {
    console.log('=== TOGGLE MAP CLICKED ===');

    // Initialize state if needed
    if (!window.mapHiddenState) {
        window.mapHiddenState = false;
    }

    // Find the map panel by ID (detected from your page)
    const mapPanel = document.querySelector('#tripsHistory_map');

    console.log('Looking for #tripsHistory_map...');
    console.log('Found:', mapPanel);

    if (!mapPanel) {
        console.error('ERROR: Map panel not found!');
        console.log('Current URL:', window.location.href);
        alert('Map panel not found!\n\nAre you on the Trips History page?');
        return;
    }

    console.log('Map panel found:', mapPanel);
    console.log('Current display:', mapPanel.style.display);
    console.log('Offset height:', mapPanel.offsetHeight);

    // Toggle display
    if (window.mapHiddenState) {
        // Show it
        mapPanel.style.display = '';
        window.mapHiddenState = false;
        console.log('✓ MAP SHOWN');
        alert('Map is now visible');
    } else {
        // Hide it
        mapPanel.style.display = 'none';
        window.mapHiddenState = true;
        console.log('✓ MAP HIDDEN');
        alert('Map is now hidden');
    }

    console.log('New display:', mapPanel.style.display);
    console.log('=== END ===');
};

console.log('✓ Hide Trips Map add-in loaded (SIMPLE VERSION)');
console.log('Function registered:', typeof geotab.customButtons.hideTripsMap);
