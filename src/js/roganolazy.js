const LAZY = (function(){
    let _$broken,
        _$img,
        _timeout;
    /*********************************************************************************
     * GETS EVERY IMG WITH CLASS LAZY-BROKEN TO ADD THE CLASS FOR SELECTED SVG IMAGE *
     *********************************************************************************/
    const _initBroken = ()=>{
        let _attr;
        // Gets every img with 'lazy-broken' class
        _$broken = document.querySelectorAll('img.lazy-broken');
        // Cycle on every 'lazy-broken' img
        _$broken.forEach(img=>{
            // Gets the data-broken attr
            _attr = img.getAttribute('data-broken');
            // Adds the class to the single image
            img.classList.add(_whichSvg(_attr));
        });
    };
    /****************************************
     * ADD THE SVG ACCORDING TO DATA-BROKEN *
     ****************************************/
    const _whichSvg = (i)=>{
        // Selects the class to be added on every broken image see css if you want to see the styles
        switch(i){
            case "broken":
                return 'broken-img';
            case "unlink":
            return 'unlink-img';
        }
    };
    /*****************************
     * INITIALIZE EVENTS BINDING *
     *****************************/
    const _initEvents = ()=>{
        // Binds scroll event to document
        document.addEventListener('scroll', _lazy);
        // Binds resize event to window
        window.addEventListener('resize', _lazy);
        // Binds orientation change event to window
        window.addEventListener('orientationchange', _lazy);
    };
    /*****************
     * LAZY FUNCTION *
     *****************/
    const _lazy = ()=>{
        // Gets every img with 'rogano-lazy' class every event call
        _$img = document.querySelectorAll('img.rogano-lazy');
        // Clears the timeout
        if(_timeout){
            clearTimeout(_timeout);
        }
        // If there are no more imgs to be lazy loaded detach the document and window events
        if(_$img.length == 0){
            document.removeEventListener('scroll', _lazy);
            window.removeEventListener('resize', _lazy);
            window.removeEventListener('orientationChange', _lazy);
        }
        // Timeout before doing the lazyload, add time for a delayed effect
        _timeout = setTimeout(()=>{
            // Cycle through every img
            _$img.forEach(img => {
                // If is inside the viewport then
                if(_isInsideViewport(img)){
                    // Creates new temp image for loading purposes
                    let _img = new Image();
                    // Removes the class from img for it not to be accounted next scroll
                    img.classList.remove('rogano-lazy');
                    // When temp img finishes loading then
                    _img.onload = ()=>{
                        // Add the actual img on DOM the temp image src
                        img.src = _img.src;
                    }
                    // Add the data-src from img to the SRC of temp img
                    _img.src = img.dataset.src;
                }
            });
        }, 0);
    };
    /**************************************************************************************************
     * DETECTS IF PART OF THE OBJECT IS INSIDE OF VIEWPORT. NO NEED FOR THE WHOLE OBJECT TO BE INSIDE *
     *                                     RETURNS TRUE OR FALSE                                      *
     **************************************************************************************************/
    const _isInsideViewport = (object)=>{
        // Gets window scroll position
        let scroll = window.scrollY || window.pageYoffset;
        // gets object.top position and adds it to scroll inside var
        let boundsTop = object.getBoundingClientRect().top + scroll;
        //easier way to access data 
        let viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight
        }
        //easier way to access data
        let bounds = {
            top: boundsTop,
            bottom: boundsTop + object.clientHeight
        }
        // Returns true or false if part of object is inside viewport
        return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
    };
    return{
        init: function(){
            _initEvents();
            _lazy();
            _initBroken();
        }
    }
}());