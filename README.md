## Lazyloader Vanilla JS

Simple to use and does not need extra library to work.

##### Getting Started

Download and load the script and css. Then call it

```javascript
let lazyload = new Lazy();
```

It does not requires arguments, it already listens for ```.rogano-lazy``` and ```.lazy-broken``` classes for lazyloader and broken images. 

##### Arguments
It only has 3 arguments, use them only in case you want to change the delay time before start loading the image and change the classes it listens.

```javascript
let lazyload = new Lazy(delayInt, '.lazy-image-class', '.broken-image-class');
```

Change classes only if you want a custom animation.

##### Animations

- **.lazy-fade**: simple fade in animation with no translation
- **.lazy-half**: from half transparent from full opacity with no translation
- **.lazy-translate**: translation from bottom to regular position
- **.lazy-folder**: from perspective with rotationX to default position
- **.lazy-scale**: simple scale animation from smallto regular size
