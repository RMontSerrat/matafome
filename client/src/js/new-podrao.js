(function() {
   'use strict'
   
   var newPodrao = {
      bindSubmit: function bindSubmit() {
         var form = document.querySelector('button');
         form.addEventListener('click', this.getLocation);
      },

      getLocation: function getLocation() {
         var geocoder = new google.maps.Geocoder(),
             address = document.querySelector("input[name='vicinity']").value;
         geocoder.geocode( { 'address': address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
             var latitude = results[0].geometry.location.lat();
             var longitude = results[0].geometry.location.lng();
             newPodrao.submit([latitude, longitude]);
           } 
         }); 
      },

      submit: function submit(location) {
         var data = {
            name: document.querySelector("input[name='name']").value,
            vicinity: document.querySelector("input[name='vicinity']").value,
            location: location,
            from: document.querySelector("input[name='from']").value,
            to: document.querySelector("input[name='to']").value
         };

         $.ajax({
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            url: "http://localhost:5000/add/",
            data: JSON.stringify(data),
            success: function(request) {
               console.log(request);
            }
         });
      },

      bindLike: function bindLike() {
         var button = document.getElementById("like");
         button.addEventListener('click', this.like);
      },

      like: function like(e) {
         console.log(e.target.value);
         var data = {
            id: e.target.value 
         }

         $.ajax({
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            url: "http://localhost:5000/like/",
            data: JSON.stringify(data),
            success: function(request) {
               console.log(request);
            }
         });
      },

      bindComplaint: function bindComplaint() {
         var button = document.getElementById("complaint");
         button.addEventListener('click', this.complaint);
      },

      complaint: function complaint(e) {
         var data = {
            id: e.target.value 
         }

         $.ajax({
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            url: "http://localhost:5000/complaint/",
            data: JSON.stringify(data),
            success: function(request) {
               console.log(request);
            }
         });
      },

      init: function init() {
         this.bindSubmit();
         this.bindLike();
         this.bindComplaint();
      }
   };

   newPodrao.init();
})();