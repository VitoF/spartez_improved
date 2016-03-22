class MainApp {
    constructor(dataObj, mainId){
        this.wrapper = $('#'+mainId);
        this.tabs = $$('#'+mainId+' .component_tabs_header .component_tabs_header_item');
        this.runner = $('#'+mainId+' .component_tabs_header_runner');
        this.content = $('#'+mainId+' .component_tabs_content');
        this.tiles = dataObj.tiles;
        this.newest();
        this.clickListener();
    }
    clickListener(){
//        console.log(this.tabs);
    }
    newest(){
        this.tiles.forEach((tileObj)=>{
            const tile = new Tile(tileObj);
            tile.rend(this.content);
        });
    }
}