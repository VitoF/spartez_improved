function $ (selector, el) {
     if (!el) {el = document;}
     return el.querySelector(selector);
}
function $$ (selector, el) {
     if (!el) {el = document;}
//     return el.querySelectorAll(selector);
     return Array.prototype.slice.call(el.querySelectorAll(selector));
}

var application;
{
    var xhr = new XMLHttpRequest();
    var url = '../data/data.json';
    
    xhr.open( 'GET', url, true );
    xhr.onreadystatechange = function() {
        if( this.readyState === 4 && this.status !== 404 ) {
            var dataObj = JSON.parse(this.responseText);
            
            application = new MainApp(dataObj,'main');
        }
    }
    xhr.send();
}