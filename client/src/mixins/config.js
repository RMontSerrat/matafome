config = {
    server: 'http://localhost:5000/',

    dateToday: function dateToday() {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth()+1, 
            yyyy = today.getFullYear();

        if(dd < 10) {
            dd = '0'+ dd;
        } 

        if(mm < 10) {
            mm ='0'+ mm;
        } 

        return yyyy+'-'+mm+'-'+dd;
    },
    
    dateFormatted: function dateFormatted(date) {
        date = date.split("-");
        var dd = date[2],
        mm = date[1],
        yyyy = date[0];

        return dd+'/'+mm+'/'+yyyy;
    },
    
    paramObj: function paramObj(param) {
        var url = Object.keys(param).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(param[k])
        }).join('&')

        return url.toLowerCase();
    }
}