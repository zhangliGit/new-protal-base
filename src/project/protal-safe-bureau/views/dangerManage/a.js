$(document).ready(function () {
  263         // canvas生成图片
  264         $("#btn").on("click", function () {
  265             var getPixelRatio = function (context) { // 获取设备的PixelRatio
  266                 var backingStore = context.backingStorePixelRatio ||
  267                     context.webkitBackingStorePixelRatio ||
  268                     context.mozBackingStorePixelRatio ||
  269                     context.msBackingStorePixelRatio ||
  270                     context.oBackingStorePixelRatio ||
  271                     context.backingStorePixelRatio || 0.5;
  272                 return (window.devicePixelRatio || 0.5) / backingStore;
  273             };
  274             //生成的图片名称
  275             var imgName = "@(webSiteName)@(weekName).jpg";
  276             var shareContent = document.getElementById("imgDiv");
  277             var width = shareContent.offsetWidth;
  278             var height = shareContent.offsetHeight;
  279             var canvas = document.createElement("canvas");
  280             var context = canvas.getContext('2d');
  281             var scale = getPixelRatio(context); //将canvas的容器扩大PixelRatio倍，再将画布缩放，将图像放大PixelRatio倍。
  282             canvas.width = width * scale;
  283             canvas.height = height * scale;
  284             canvas.style.width = width + 'px';
  285             canvas.style.height = height + 'px';
  286             context.scale(scale, scale);
  287 
  288             var opts = {
  289                 scale: 1,
  290                 background: '#FFFFFF'
  291             };
  292             window.pageYoffset = 0;
  293             document.documentElement.scrollTop = 0;
  294             document.body.scrollTop = 0;
  295             html2canvas(shareContent, opts).then(function (canvas) {
  296                 context.imageSmoothingEnabled = false;
  297                 context.webkitImageSmoothingEnabled = false;
  298                 context.msImageSmoothingEnabled = false;
  299                 context.imageSmoothingEnabled = false;
  300                 var dataUrl = canvas.toDataURL('image/jpeg', 1.0);
  301                 dataURIToBlob(imgName, dataUrl, callback);
  302             });
  303         });
  304     })
  305 
  306 
  307     // edited from https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
  308     var dataURIToBlob = function (imgName, dataURI, callback) {
  309         var binStr = atob(dataURI.split(',')[1]),
  310             len = binStr.length,
  311             arr = new Uint8Array(len);
  312 
  313         for (var i = 0; i < len; i++) {
  314             arr[i] = binStr.charCodeAt(i);
  315         }
  316 
  317         callback(imgName, new Blob([arr]));
  318     }
  319 
  320     var callback = function (imgName, blob) {
  321         var triggerDownload = $("<a>").attr("href", URL.createObjectURL(blob)).attr("download", imgName).appendTo("body").on("click", function () {
  322             if (navigator.msSaveBlob) {
  323                 return navigator.msSaveBlob(blob, imgName);
  324             }
  325         });
  326         triggerDownload[0].click();
  327         triggerDownload.remove();
  328     };