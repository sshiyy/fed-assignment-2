//image carousel
let image = document.getElementById('image');
let images = [
    'images/hotdrink1.jpg', 'images/menu1.jpg', 'images/menu2.jpg', 
    'images/menu3.jpg', 'images/menu4.jpg', 'images/menu5.jpg', 
    'images/menu6.jpg', 'images/menu7.jpg', 'images/menu8.jpg', 
    'images/menu9.jpg', 'images/menu10.jpg', 'images/menu12.jpg'
];

setInterval(function() {
    let random = Math.floor(Math.random() * images.length);
    image.src = images[random];
}, 800);