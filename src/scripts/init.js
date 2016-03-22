var application;
{
    var xhr = new XMLHttpRequest();
    var url = '../data/data.json';
    
    xhr.open( 'GET', url, true );
    xhr.onreadystatechange = function() {
        if( this.readyState === 4 && this.status !== 404 ) {
            var dataObj = JSON.parse(this.responseText);
            
            application = new MainApp(dataObj,'main');
            application.run();
        }
    }
    xhr.send();
}