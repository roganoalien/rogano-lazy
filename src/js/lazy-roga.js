class Lazy {
    constructor(delay = 0, lazyload = '.rogano-lazy', broken = '.lazy-broken'){
        this._timeout;
        this.broken = document.querySelectorAll(`img${broken}`);
        this.data = 'data-broken';
        this.delay = delay;
        this.lazyload = lazyload;
        this.listener = this.lazyInit.bind(this);
        this.document = document;
        this.window = window;
        this.lazyClass = this.lazyload.split('.').join('');
        this.img = document.querySelectorAll(`img${this.lazyload}`);
        this.initEvents();
        this.initBroken();
        this.lazyInit();
    }
    /*******************************************
     * BROKEN FUNCTION TO ADD THE CLASS NEEDED *
     *******************************************/
    initBroken(){
        let _attr;
        this.broken.forEach(img => {
            _attr = img.getAttribute(this.data);
            img.classList.add(this.whichSvg(_attr));
        });
    }
    /*****************************************
     * START EVENTS LISTENERS FOR LAZYLOADER *
     *****************************************/
    initEvents(){
        this.document.addEventListener('scroll', this.listener);
        this.window.addEventListener('resize', this.listener);
        this.window.addEventListener('orientationchange', this.listener);
    }
    /************************************
     * SELECTS THE CLASS TO ADD THE SVG *
     ************************************/
    whichSvg(i){
        switch(i){
            case "broken":
                return 'broken-img';
            case "unlink":
                return 'unlink-img';
        }
    }
    /*******************
     * LAZYLOADERSTART *
     *******************/
    lazyInit(){
        // get all objects with same className
        let myImg = document.querySelectorAll(this.lazyload);
        //clears timeout
        if(this._timeout){ clearTimeout(this._timeout);}
        // If there is no more imgs to load detach eventlisteners
        if(myImg.length === 0){
            this.document.removeEventListener('scroll', this.listener);
            this.window.removeEventListener('resize', this.listener);
            this.window.removeEventListener('orientationchange', this.listener);
            return false;
        }
        // Start timeout to do changes
        this._timeout = setTimeout(()=>{
            // cycle through every image
            myImg.forEach(img=>{
                // validate if is inside
                if(this.isInsideViewport(img)){
                    // create fake temp image to load
                    let tempImg = new Image();
                    // remove class for lazyloader
                    img.classList.remove(this.lazyClass);
                    // when finishes loading fake temp image then add it to the real img src
                    tempImg.onload = ()=>{
                        img.src = tempImg.src;
                    }
                    // add the dataset src from real img to fake temp image
                    tempImg.src = img.dataset.src;
                }
            });
        }, this.delay);
    }
    /*************************************************
     * FUNCTION TO KNOW IF OBJECT IS INSIDE VIEWPORT *
     *************************************************/
    isInsideViewport(object){
        let scroll = window.scrollY || window.pageYOffset,
            boundsTop = object.getBoundingClientRect().top + scroll,
            viewport = {
                bottom: scroll + window.innerHeight,
                top: scroll
            },
            bounds = {
                bottom: boundsTop + object.clientHeight,
                top: boundsTop
            };
        return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
    }
}