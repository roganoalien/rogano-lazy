class Lazy {
    constructor(delay = 10, lazyload = '.rogano-lazy', broken = '.lazy-broken'){
        this._timeout;
        this.broken = document.querySelectorAll(`img${broken}`);
        this.data = 'data-broken';
        this.delay = delay;
        this.lazyload = lazyload;
        this.lazyClass = this.lazyload.split('.').join('');
        this.img = document.querySelectorAll(`img${this.lazyload}`);
        this.initEvents();
        this.initBroken();
        // this.lazyInit();
    }

    initBroken(){
        let _attr;
        this.broken.forEach(img => {
            _attr = img.getAttribute(this.data);
            img.classList.add(this.whichSvg(_attr));
        });
    }

    initEvents(){
        document.addEventListener('scroll', ()=>this.lazyInit());
        window.addEventListener('resize', ()=>this.lazyInit());
        window.addEventListener('orientationchange', ()=>this.lazyInit());
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
        if(this._timeout){ clearTimeout(this._timeout);}
        if(this.img.length === 0){
            console.log('Remueve');
            document.removeEventListener('scroll', this.lazyInit());
            window.removeEventListener('resize', ()=>this.lazyInit());
            window.removeEventListener('orientationchange', ()=>this.lazyInit());
            return false;
        }
        this._timeout = setTimeout(()=>{
            this.img.forEach(img=>{
                console.log(this.isInsideViewport(img));
                if(this.isInsideViewport(img)){
                    let tempImg = new Image();
                    console.log(this.lazyload);
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
        console.log(object);
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