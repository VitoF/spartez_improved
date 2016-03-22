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
        var monthD = d.getMonth() + 1, month;
        switch(monthD){
            case 1: month = 'January'; break;
            case 2: month = 'February'; break;
            case 3: month = 'March'; break;
            case 4: month = 'April'; break;
            case 5: month = 'May'; break;
            case 6: month = 'June'; break;
            case 7: month = 'July'; break;
            case 8: month = 'August'; break;
            case 9: month = 'September'; break;
            case 10: month = 'October'; break;
            case 11: month = 'November'; break;
            case 12: month = 'December'; break;
            default: month = 'January';
        }
        var year = d.getFullYear();
        
        switch (this.imgSrc){
            case 'noimage': 
                this.html = '<div class="tile_item no_img">\
                    <div class="tile_item_title">'+this.title+'</div>\
                    <div class="tile_item_date">'+day+' '+month+' '+year+'</div>\
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
                    <div class="tile_item_date">'+day+' '+month+' '+year+'</div>\
                    <div class="tile_item_votes">'+this.votes+'</div>\
                </div>';
        }
        
        el.innerHTML += this.html;
    }
}