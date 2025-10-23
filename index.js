const dscc = window.dscc;
let map;

function drawViz(data) {
  const rows = data.tables.DEFAULT;
  const mapDiv = document.getElementById("map");

  if (!map) {
    map = new google.maps.Map(mapDiv, {
      zoom: 5,
      center: { lat: 20.5937, lng: 78.9629 }, // center on India
    });
  }

  // Clear old markers
  if (map.markers) map.markers.forEach((m) => m.setMap(null));
  map.markers = [];

  rows.forEach((row) => {
    const lat = parseFloat(row["latitude"]);
    const lng = parseFloat(row["longitude"]);
    const iconUrl = row["icon"];
    const label = row["label"];

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(32, 32),
      },
      title: label,
    });

    map.markers.push(marker);
  });
}

// Hook into Looker Studio updates
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
