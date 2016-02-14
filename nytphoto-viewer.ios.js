var imageSource = require("image-source");
var frameModule = require("ui/frame");

NYTPhotoViewer.prototype.showViewer = function(imagesArray) {
    var currentViewController = frameModule.topmost().currentPage;
    var photosArray = NSMutableArray.alloc().init();
    var that = this;

    imagesArray.forEach(function(imageItem) {
        
        var nytImage = NYTImage.alloc().init();
        
        if(typeof imageItem === 'object' && (imageItem instanceof NSObject && imageItem.conformsToProtocol(NYTPhoto))){
            //console.log('imageItem is of type NYTImage: ' + imageItem.conformsToProtocol(NYTPhoto));
            nytImage.image = imageItem.image;
            nytImage.imageData = imageItem.imageData;
            nytImage.placeholderImage = imageItem.placeholderImage;
            nytImage.attributedCaptionTitle = imageItem.attributedCaptionTitle;
            nytImage.attributedCaptionSummary = imageItem.attributedCaptionSummary;
            nytImage.attributedCaptionCredit = imageItem.attributedCaptionCredit;
        }
        else if(typeof imageItem === 'object'){
            //console.log('imageItem is of type object: ' + imageItem.title);
            var fontFamily = that._fontFamily || "HelveticaNeue";
            var titleFontSize = that._titleFontSize || 16;
            var summaryFontSize = that._summaryFontSize || 14;
            var creditFontSize = that._creditFontSize || 14;
            var titleColor = that._titleColor || UIColor.whiteColor();;
            var summaryColor = that._summaryColor || UIColor.lightGrayColor();;
            var creditColor = that._creditColor || UIColor.grayColor();;

            nytImage.image = imageItem.image;
            nytImage.attributedCaptionTitle = attributedString(imageItem.title, titleColor, fontFamily, titleFontSize);
            nytImage.attributedCaptionSummary = attributedString(imageItem.summary, summaryColor, fontFamily, summaryFontSize);
            nytImage.attributedCaptionCredit = attributedString(imageItem.credit, creditColor, fontFamily, creditFontSize);
        }
        else if(typeof imageItem === 'string'){
            //console.log('imageItem is of type string: ' + imageItem);
            var imageURL = NSURL.URLWithString(imageItem);
            var imageData = NSData.dataWithContentsOfURL(imageURL);
            var nativeImage = UIImage.imageWithData(imageData);
            nytImage.image = nativeImage;
        }

        photosArray.addObject(nytImage);
    });

    var photosViewController = NYTPhotosViewController.alloc().initWithPhotos(photosArray);
    this._ios = photosViewController;

    //photosViewController.view.backgroundColor = UIColor.whiteColor();
    currentViewController.ios.presentViewControllerAnimatedCompletion(photosViewController, true, null);
};

function attributedString(text, color, fontFamily, fontSize) {
    var attrString = NSString.stringWithString(text);
    var attributeOptions = {
        [NSForegroundColorAttributeName]: color,
        [NSFontAttributeName]: UIFont.fontWithNameSize(fontFamily, fontSize)
    };
    return NSAttributedString.alloc().initWithStringAttributes(attrString, attributeOptions);
};

NYTPhotoViewer.prototype.newNYTPhoto = function() {
    var newImage = NYTImage.alloc().init();
    return newImage;
};
var NYTImage = NSObject.extend({
    get image() { return this.super.image; },
    set image(value) { this.super.image = value; },

    get imageData() { return this.super.imageData; },
    set imageData(value) { this.super.imageData = value; },

    get placeholderImage() { return this.super.placeholderImage; },
    set placeholderImage(value) { this.super.placeholderImage = value; },

    get attributedCaptionTitle() { return this.super.attributedCaptionTitle; },
    set attributedCaptionTitle(value) { this.super.attributedCaptionTitle = value; },

    get attributedCaptionSummary() { return this.super.attributedCaptionSummary; },
    set attributedCaptionSummary(value) { this.super.attributedCaptionSummary = value; },

    get attributedCaptionCredit() { return this.super.attributedCaptionCredit; },
    set attributedCaptionCredit(value) { this.super.attributedCaptionCredit = value; }

}, {
    name: "NYTImage",
    protocols: [NYTPhoto]
});


function NYTPhotoViewer() {

    Object.defineProperty(NYTPhotoViewer.prototype, "ios", {
        get: function () {
          return this._ios;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(NYTPhotoViewer.prototype, "fontFamily", {
        get: function () {
          return this._fontFamily;
        },
        set: function (value) {
          this._fontFamily = value;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(NYTPhotoViewer.prototype, "titleFontSize", {
        get: function () {
          return this._titleFontSize;
        },
        set: function (value) {
          this._titleFontSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NYTPhotoViewer.prototype, "summaryFontSize", {
        get: function () {
          return this._summaryFontSize;
        },
        set: function (value) {
          this._summaryFontSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NYTPhotoViewer.prototype, "creditFontSize", {
        get: function () {
          return this._creditFontSize;
        },
        set: function (value) {
          this._creditFontSize = value;
        },
        enumerable: true,
        configurable: true
    });

    
    Object.defineProperty(NYTPhotoViewer.prototype, "titleColor", {
        get: function () {
          return this._titleColor;
        },
        set: function (value) {
          this._titleColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NYTPhotoViewer.prototype, "summaryColor", {
        get: function () {
          return this._summaryColor;
        },
        set: function (value) {
          this._summaryColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NYTPhotoViewer.prototype, "creditColor", {
        get: function () {
          return this._creditColor;
        },
        set: function (value) {
          this._creditColor = value;
        },
        enumerable: true,
        configurable: true
    });


    if (!this instanceof NYTPhotoViewer) { 
        return new NYTPhotoViewer();
    }
};
module.exports = NYTPhotoViewer;