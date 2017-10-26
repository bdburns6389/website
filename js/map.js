<!DOCTYPE HTML>
<html>
<head>
    <title>Geolocation watchPosition() by The Code of a Ninja</title>
     
    <!-- for mobile view -->
    <meta content='width=device-width, initial-scale=1' name='viewport'/>
     
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&ampsensor=false&amplanguage=en"></script>
    <script type="text/javascript">
 
        // you can specify the default lat long
        var map,
            currentPositionMarker,
            mapCenter = new google.maps.LatLng(39.022421, -94.656573),
            map;
 
        // change the zoom if you want
        function initializeMap()
        {
            map = new google.maps.Map(document.getElementById('map_canvas'), {
               zoom: 18,
               center: mapCenter,
               mapTypeId: google.maps.MapTypeId.ROADMAP
             });
        }
 
        function locError(error) {
            // tell the user if the current position could not be located
            alert("The current position could not be found!");
        }
 
        // current position of the user
        function setCurrentPosition(pos) {
            currentPositionMarker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ),
                title: "Current Position"
            });
            map.panTo(new google.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ));
        }
 
        function displayAndWatch(position) {
         
            // set current position
            setCurrentPosition(position);
             
            // watch position
            watchCurrentPosition();
        }
 
        function watchCurrentPosition() {
            var positionTimer = navigator.geolocation.watchPosition(
                function (position) {
                    setMarkerPosition(
                        currentPositionMarker,
                        position
                    );
                });
        }
 
        function setMarkerPosition(marker, position) {
            marker.setPosition(
                new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude)
            );
        }
 
        function initLocationProcedure() {
            initializeMap();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
            } else {
                // tell the user if a browser doesn't support this amazing API
                alert("Your browser does not support the Geolocation API!");
            }
        }
 
        // initialize with a little help of jQuery
        $(document).ready(function() {
            initLocationProcedure();
        });
    </script>
</head>
 
<body style="margin:0; padding:0;">
     
    <!-- display the map here, you can changed the height or style -->
    <div id="map_canvas" style="height:25em; width:25em; margin:0; padding:0;"></div>
</body>
 
</html>