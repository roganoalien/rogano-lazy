class Lazy {
    constructor(delay = 0, lazyload = '.rogano-lazy', broken = '.lazy-broken'){
        this._timeout;
        this.broken = document.querySelectorAll(`img${broken}`);
        this.data = 'data-broken';
        this.delay = delay;
        this.lazyload = lazyload;
        // this.lazyInit;
        this.listener = this.lazyInit.bind(this);
        this.document = document;
        this.window = window;
        this.lazyClass = this.lazyload.split('.').join('');
        this.img = document.querySelectorAll(`img${this.lazyload}`);
        this.initEvents();
        this.initBroken();
        this.lazyInit();
    }

    initBroken(){
        let _attr;
        this.broken.forEach(img => {
            _attr = img.getAttribute(this.data);
            img.classList.add(this.whichSvg(_attr));
        });
    }

    initEvents(){
        this.document.addEventListener('scroll', this.listener);
        this.window.addEventListener('resize', this.listener);
        this.window.addEventListener('orientationchange', this.listener);
    }

    whichSvg(i){
        switch(i){
            case "broken":
                return 'broken-img';
            case "unlink":
                return 'unlink-img';
        }
    }

    lazyInit(){
        let myImg = document.querySelectorAll(this.lazyload);
        if(this._timeout){ clearTimeout(this._timeout);}
        console.log(myImg.length);
        if(myImg.length === 0){
            console.log('Remueve');
            this.document.removeEventListener('scroll', this.listener);
            this.window.removeEventListener('resize', this.listener);
            this.window.removeEventListener('orientationchange', this.listener);
            return false;
        }
        this._timeout = setTimeout(()=>{
            myImg.forEach(img=>{
                if(this.isInsideViewport(img)){
                    let tempImg = new Image();
                    img.classList.remove(this.lazyClass);
                    tempImg.onload = ()=>{
                        img.src = tempImg.src;
                    }
                    tempImg.src = img.dataset.src;
                }
            });
        }, this.delay);
    }

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