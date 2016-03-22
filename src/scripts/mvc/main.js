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