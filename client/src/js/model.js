function initMap () {
    var input = document.querySelector("input[name='vicinity']");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
       var place = autocomplete.getPlace();
       if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
       }
       
       var address = '';
       if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
       }
    })
};

function seria(obj) {
   var o = {};
   var a = obj.serializeArray();
   $.each(a, function() {
       if (o[obj.name]) {
           if (!o[obj.name].push) {
               o[obj.name] = [o[obj.name]];
           }
           o[obj.name].push(obj.value || '');
       } else {
           o[obj.name] = obj.value || '';
       }
   });
   return o;
}