"use strict";
class MainApp {
    constructor(dataObj, mainId){
        this.mainId = mainId;
        this.wrapper = $('#'+mainId);
        this.tabs = $$('#'+mainId+' .component_tabs_header .component_tabs_header_item');
        this.runner = $('#'+mainId+' .component_tabs_header_runner');
        this.contentNewest = $('#'+mainId+' .component_tabs_content[data-tab="content_newest"]');
        this.contentPopular = $('#'+mainId+' .component_tabs_content[data-tab="content_popular"]');
        this.tiles = dataObj.tiles;
        this.newest();
        this.popular();
        this.clickListener();
    }
    clickListener(){
        var that = this;
        makeRunner();
        
        function makeRunner(){
            var runnerWidth = $('#'+that.mainId+' .component_tabs_header .component_tabs_header_item.active').offsetWidth || 100; 
            var runnerLeft = $('#'+that.mainId+' .component_tabs_header .component_tabs_header_item.active').offsetLeft || 0;
            that.runner.style.width = runnerWidth+'px';
            that.runner.style.left = runnerLeft+'px';
        }
        
        
        function removeClass(objArr, removableClass){
            objArr.forEach((obj)=>{
                let newClass = obj.className.replace(' '+removableClass,'');
                obj.className = newClass;
            });
        }
        function addClass(objArr, addedClass){
            objArr.forEach((obj)=>{
                let newClass = obj.className + ' ' + addedClass;
                obj.className = newClass;
            });
        }
        this.tabs.forEach((tab)=>{
            tab.addEventListener('click',(e)=>{
                var dataTab = tab.getAttribute('data-tab');
                removeClass($$('#'+this.mainId+' .component_tabs_content'), 'active');
                addClass($$('#'+this.mainId+' .component_tabs_content[data-tab="content_'+dataTab+'"]'), 'active');
                removeClass(this.tabs, 'active');
                addClass($$('#'+this.mainId+' .component_tabs_header_item[data-tab="'+dataTab+'"]'), 'active');
                makeRunner();
            });
        });
        
        window.addEventListener('resize',(e)=>{
            makeRunner();
        });
    }
    newest(){
        var newestObj = {},
            newestArr = [];
        this.tiles.forEach((tileObj)=>{
            newestObj[tileObj.date] = tileObj;
            newestArr.push(tileObj.date);
        });
        function sortNumber(a, b){return a - b;}
        newestArr = newestArr.sort(sortNumber);
        
        var counter = 6; //count of tiles in the document
        for(let i = newestArr.length-1; i>=0; i--){
            if (counter>0){
                const tile = new Tile(newestObj[newestArr[i]]);
                tile.rend(this.contentNewest);   
                counter--;
            }else{break;}
        }
    }
    popular(){
        var popularObj = {},
            popularArr = [];
        this.tiles.forEach((tileObj)=>{
            popularObj[tileObj.votes] = tileObj;
            popularArr.push(tileObj.votes);
        });
        function sortNumber(a, b){return a - b;}
        popularArr = popularArr.sort(sortNumber);
        
        var counter = 6; //count of tiles in the document
        for(let i = popularArr.length-1; i>=0; i--){
            if (counter>0){
                const tile = new Tile(popularObj[popularArr[i]]);
                tile.rend(this.contentPopular);   
                counter--;
            }else{break;}
        }
    }
}
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