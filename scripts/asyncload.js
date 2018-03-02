
function loadImage(id, link, $) {
    let downloadingImage = new Image();
    downloadingImage.onload = function() {
        $(id + ">a>img").attr("src", this.src);
        $(id + ">.img_desc>.img-button-container>.img-button").attr("href", this.src);
    };
    downloadingImage.src = link;
}
