class Tile{
    constructor(tileObj){
        this.imgSrc = tileObj.imgSrc || 'noimage';
        this.title = tileObj.title || 'No title';
        this.date = tileObj.date || 0;
        this.text = tileObj.text || 'No text.';
        this.votes = tileObj.votes || 0;
        this.subject = tileObj.subject || ' ';
    }
    
    rend(el){
        var d = new Date(this.date);
        var day = d.getDate();
        var mi = d.getMonth(), 
            month = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var year = d.getFullYear();
        
        switch (this.imgSrc){
            case 'noimage': 
                this.html = '<div class="tile_item no_img">\
                    <div class="tile_item_title">'+this.title+'</div>\
                    <div class="tile_item_date">'+day+' '+month[mi]+' '+year+'</div>\
                    <div class="tile_item_text">'+this.text+'</div>\
                    <div class="tile_item_footer">\
                        <div class="tile_item_votes">'+this.votes+'</div>\
                        <div class="tile_item_subject">'+this.subject+'</div>\
                    </div>\
                </div>';
                break;
            default:
                this.html = '<div class="tile_item yes_img">\
                    <img class="tile_item_image" src="../images/'+this.imgSrc+'" alt="spartez"/>\
                    <div class="tile_item_title">'+this.title+'</div>\
                    <div class="tile_item_date">'+day+' '+month[mi]+' '+year+'</div>\
                    <div class="tile_item_votes">'+this.votes+'</div>\
                </div>';
        }
        
        el.innerHTML += this.html;
    }
}