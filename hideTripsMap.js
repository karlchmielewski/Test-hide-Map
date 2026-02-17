geotab.customButtons.hideTripsMap = function(event, api, state) {
    if (!window.mapHidden) {
        window.mapHidden = false;
    }

    var mapPanel = document.querySelector('#tripsHistory_map');

    if (!mapPanel) {
        alert('Map not found');
        return;
    }

    if (window.mapHidden) {
        mapPanel.style.display = '';
        window.mapHidden = false;
    } else {
        mapPanel.style.display = 'none';
        window.mapHidden = true;
    }
};