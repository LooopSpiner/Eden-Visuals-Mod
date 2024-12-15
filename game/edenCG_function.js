window.createEdenCG = function createEdenCG(){
    window.modImgLoaderHooker.addDynamicImageTagReplacePassage(V.passage);
    const face = V.edenFace || "default";
    addEdenLayer("body","body_" + C.npc.Eden.skincolour,1);
    addEdenLayer("body","hair",30);
    addEdenLayer("face",face,2).setAttribute('id','edenFace');
}

window.addEdenLayer = function addEdenLayer(fileName,eleName,eleZindex){
   const edenLayer =  document.createElement("img");
   const edenFileName = V.edenFileName || "default";
   edenLayer.src = "img/misc/edenCG/" + edenFileName +"/"+fileName + "/" + eleName + ".png";
   edenLayer.style.zIndex = "" + eleZindex + "";
   edenLayer.className = "edenLayer";
   edenCG.appendChild(edenLayer);
   return edenLayer;
}

window.touchEvent = function touchEvent(part, url) {
    const originalFace = V.edenFace;

    Promise.all([
        window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc(originalSrc),
        window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc("img/misc/edenCG/"+V.edenFileName+"/face/" + url + ".png")
    ]).then(([base64ImgOriginal, base64ImgUrl]) => {

        const handleTouchStart = () => {edenFace.src = base64ImgUrl;V.edenFace = url;}
        const handleMouseDown = () => {edenFace.src = base64ImgUrl;V.edenFace = url;}
        const handleTouchEnd = () => {edenFace.src = base64ImgOriginal;V.edenFace = originalFace;};
        const handleMouseUp = () => {edenFace.src = base64ImgOriginal;V.edenFace = originalFace;};
        const handleTouchCancel = () => {edenFace.src = base64ImgOriginal;V.edenFace = originalFace;};

        part.addEventListener("touchstart", handleTouchStart);
        part.addEventListener("touchend", handleTouchEnd);
        part.addEventListener("touchcancel", handleTouchCancel);
        part.addEventListener("mouseup", handleMouseUp);
        part.addEventListener("mousedown", handleMouseDown);
    }).catch(err => {
        console.error('Error loading images:', err);
    });
    }


    window.startCloseEyeTimer = (function () {
        let timerId = null; // 用于跟踪定时器的 ID
        
        return function startCloseEyeTimer() {
            if (timerId !== null) {
                console.log("Timer already running, skipping duplicate start.");
                return; // 如果定时器已存在，则不重复启动
            }
    
            function executeTask() {
                // 根据条件确定 eye 的值
                let eye;
                if (!["angry", "gdom"].includes(V.edenFace)) {
                    eye = "close_" + C.npc.Eden.skincolour;
                } else {
                    eye = "close_angry";
                }
    
                // 添加 closeEye 元素
                const closeEye = addEdenLayer(V.edenFileName + "/face", eye, -1);
    
                // 请求图片并设置图片源
                window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc("img/misc/edenCG/" + V.edenFileName + "/face/" + eye + ".png")
                    .then(base64Img => {
                        closeEye.src = base64Img;
    
                        // 确保图片加载完毕后再设置类名
                        closeEye.onload = () => {
                            closeEye.className = "closeEye";
                            closeEye.style.zIndex = "3";
                        };
                    }).catch(err => {
                        console.error("Error loading image:", err);
                    });
    
                // 700ms 后删除所有 class 为 closeEye 的元素
                setTimeout(() => {
                    const elements = document.querySelectorAll(".closeEye"); // 获取所有 closeEye 元素
                    elements.forEach(element => {
                        if (element && typeof element.remove === "function") {
                            element.remove(); // 删除元素
                        }
                    });
                }, 700);
    
                timerId = setTimeout(executeTask, 6000);
            }
    
            // 开始第一次任务
            executeTask();
        };
    })();
     

// 用于生成没有差分的图片
window.createEdenCGNoDiff = function createEdenCGNoDiff(pcExist,edenExist){
    window.modImgLoaderHooker.addDynamicImageTagReplacePassage(V.passage);
    function addEdenLayerNoDiff (eleName,eleZindex){
        const edenLayer =  document.createElement("img");
        edenLayer.src = "img/misc/edenCG/" + V.edenFileName + "/" + eleName + ".png";
        edenLayer.style.zIndex = "" + eleZindex + "";
        edenLayer.className = "edenLayer";
        edenCG.appendChild(edenLayer);
        return edenLayer;
    }
    if (edenExist) {
        addEdenLayerNoDiff( "eden_" + C.npc.Eden.skincolour, 1);
    }
    if(pcExist) {
        createPC().style.zIndex = 2;
    }
    addEdenLayerNoDiff("background",0);
    addEdenLayerNoDiff("foreground",1000);
}

// 处理图片缩放
window.adjustScale = function adjustScale(width,height){
    var scale = V.scaleValue || 0.5;
    document.getElementById("edenCG").style.transform = "scale(" + scale +")";

    var parentDiv = document.getElementById("parentDiv");
    parentDiv.style.width = width*scale*2 + "px";
    parentDiv.style.height = height*scale*2 + "px";

    edenCG.style.width = width*2 + "px";
    edenCG.style.height = height*2 + "px";

    var pcCG = document.getElementById("pcCG");
    if(pcCG){
        pcCG.style.width = width*2 + "px";
        pcCG.style.height = height*2 + 'px';
        pcCG.style.setProperty("--width", width);
    }

    var touch = document.getElementById("touch");
    if(touch){
        touch.id = "touch_" + V.edenFileName;
        touchFace.id = "touchFace_" + V.edenFileName;
        touchChest.id = "touchChest_" + V.edenFileName;
        touch.style.transform = "scale(" + scale * 2 + ")";
    }
    return scale;
    
}

window.createAnimation = function createAnimation(frameDelay, frame) {
    // 创建动画容器 div 和 img 元素
    const div = document.createElement("div");
    div.className = "animation";

    const element = document.createElement("img");
    div.appendChild(element);

    // 图片路径
    const originalPath = `img/misc/edenCG/${V.edenFileName}/${frame}1.png`;
    const switchedPath = `img/misc/edenCG/${V.edenFileName}/${frame}2.png`;

    // 获取图片的 Base64 数据
    const originalSrcPromise = window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc(originalPath);
    const switchedSrcPromise = window.modSC2DataManager.getHtmlTagSrcHook().requestImageBySrc(switchedPath);

    // 将动画 div 添加到 edenCG
    edenCG.appendChild(div);

    // 启动动画
    Promise.all([originalSrcPromise, switchedSrcPromise]).then(([originalSrc, switchedSrc]) => {
        let isOriginal = true;

        // 设置初始图片
        element.src = originalSrc;

        // 定时切换图片
        setInterval(() => {
            element.src = isOriginal ? switchedSrc : originalSrc;
            isOriginal = !isOriginal;
        }, frameDelay);
    }).catch(error => {
        console.error("Error loading images for animation:", error);
    });

    return div;
};


window.createPC = function createPC() {
   
    window.modImgLoaderHooker.addDynamicImageTagReplacePassage(V.passage);
var edenCG = document.getElementById("edenCG");

function appendPC(){
    function HSVtoRGB(h, s, v) {
        let i, f, p1, p2, p3;
        let r = 0, g = 0, b = 0;
        if (s < 0) s = 0;
        if (s > 1) s = 1;
        if (v < 0) v = 0;
        if (v > 1) v = 1;
        h %= 360;
        if (h < 0) h += 360;
        h /= 60;
        i = Math.floor(h);
        f = h - i;
        p1 = v * (1 - s);
        p2 = v * (1 - s * f);
        p3 = v * (1 - s * (1 - f));
        switch(i) {
            case 0: r = v;  g = p3; b = p1; break;
            case 1: r = p2; g = v;  b = p1; break;
            case 2: r = p1; g = v;  b = p3; break;
            case 3: r = p1; g = p2; b = v;  break;
            case 4: r = p3; g = p1; b = v;  break;
            case 5: r = v;  g = p1; b = p2; break;
        }
        return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
    }
    
    //获取头发颜色和眼睛颜色
    function getColorCG(part, colour){
        for(var i = 0;i < part.length;i ++){
            if(part[i].variable == colour){
                var result = part[i].canvasfilter.blend;
                return result;
            };
        }
        
    };
    function getSpecialColorCG(part, colour){
        var result = "#" + part[colour];
        return result;
    }
    
    //获取天杀的衣服色号
    function resolveClothColorCG(wornItem) {
        if (wornItem.colour == "custom") {
            var pc_cloth_hsv = wornItem.colourCustom.match(/\d+(\.\d+)?/g);
            return HSVtoRGB(pc_cloth_hsv[0], pc_cloth_hsv[1] * 78.125, pc_cloth_hsv[2] * 50);
        } 
        else if (wornItem.colour && wornItem.colour !== "primary") {
            return getColorCG(setup.colours.clothes, wornItem.colour);
        } else if (!wornItem.colour && !wornItem.type.includes("naked") && wornItem.colour_combat) {
            return getColorCG(setup.colours.clothes, wornItem.colour_combat);
        } else {
            return getColorCG(setup.colours.clothes, "black");
        }
        return null;
    };
    /*声明插入div的img元素*/
function createPCimgsCG(fileName) {
    var basePath = "img/misc/edenCG/" + V.edenFileName +"/pc";
    var imgElement = document.createElement("img");
    var className = "pc_" + fileName;
    if(fileName == "hair"){
        var hairlength;
        switch (V.hairlengthstage){
            case "short":
                hairlength = "short";
            break;
            case "shoulder":
                hairlength = "short";
            break;
            case "chest":
                hairlength = "middle";
            break;
            case "navel":
                hairlength = "middle";
            break;
            case "thighs":
                hairlength = "long";
            break;
            default:
                hairlength = "feet";
            break;
        };
        imgElement.setAttribute("src", basePath + "/" + hairlength + ".png");
    }
    else{
        imgElement.setAttribute("src", basePath + "/" + fileName + ".png");
    }
    imgElement.setAttribute("class", className);
    return imgElement;
};

var pc_body = createPCimgsCG("body");
var pc_hair = createPCimgsCG("hair");
var pc_left_eye = createPCimgsCG("left_eye");
var pc_right_eye = createPCimgsCG("right_eye");
var pc_shirt = createPCimgsCG("shirt");

/*染色 */
var lil_pc_hair_color = getColorCG(setup.colours.hair, V.haircolour);
		if(V.makeup.eyelenses.right != 0){
			var lil_pc_righteye_color = getSpecialColorCG(tinycolor.names, V.makeup.eyelenses.right);
      if (lil_pc_righteye_color == "#undefined"){
        lil_pc_righteye_color = getColorCG(setup.colours.eyes, V.makeup.eyelenses.right);
      }
		}
		else{
			var lil_pc_righteye_color = getColorCG(setup.colours.eyes, V.rightEyeColour);
		}
		if(V.makeup.eyelenses.left != 0){
			var lil_pc_lefteye_color = getSpecialColorCG(tinycolor.names, V.makeup.eyelenses.left);
      if(lil_pc_lefteye_color == "#undefined"){
        lil_pc_lefteye_color = getColorCG(setup.colours.eyes, V.makeup.eyelenses.left);
      }
		}
		else{
			var lil_pc_lefteye_color = getColorCG(setup.colours.eyes, V.leftEyeColour);
		}

var lil_pc_upper_color = resolveClothColorCG(V.worn.upper);

var pc_all_imgs = [pc_body,pc_hair,pc_left_eye,pc_right_eye];

function createColorCoverCG(element, className, colorProperty, colorValue) {
    var clone = element.cloneNode();
    clone.setAttribute("class", className);

    clone.style.setProperty(colorProperty, colorValue);
    clone.style.setProperty("--width", width);
    return clone;
}


pc_all_imgs.push(createColorCoverCG(pc_hair, "pc_hair_color_cover", "--pc_hair_color", lil_pc_hair_color));
pc_all_imgs.push(createColorCoverCG(pc_left_eye, "pc_lefteye_color_cover", "--pc_lefteye_color", lil_pc_lefteye_color));
pc_all_imgs.push(createColorCoverCG(pc_right_eye, "pc_righteye_color_cover", "--pc_righteye_color", lil_pc_righteye_color));


if (!V.worn.upper.type.includes("naked")) {
    pc_all_imgs.push(pc_shirt, createColorCoverCG(pc_shirt, "pc_shirt_color_cover", "--pc_shirt_color", lil_pc_upper_color));
}

return pc_all_imgs;
}
var pc_all_imgs = appendPC();
const pcCG = document.createElement("div");
pcCG.id = "pcCG";

		for(var i =0;i<pc_all_imgs.length;i++){
		    pcCG.appendChild(pc_all_imgs[i]);
		};

pcCG.style.setProperty("--width", width);
edenCG.appendChild(pcCG);
return pcCG;
    }