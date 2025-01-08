var allGifs = [] 

function initialiseDoc() {
  return new Promise(async(resolve, reject)=> {
    await getGifDir();
    await createElements();
    await randomURL();
    resolve();
  });
  clickEvents();
}

function clickEvents() {
  $('#copyBtn').on("click", function() {
    let src = $(this).parent().prev().src;
    console.log("click src: " + src);
    //copyToClipboard(src);
  });
}

async function getGifDir() {
  const response = await fetch("https://api.github.com/repos/LouieFlint/website/contents/gifs/src/");
  allGifs = await response.json();
}

async function createElements() {
  var i;
  for (i = 0; i < allGifs.length;) {
      var gif1 = allGifs[i].name;
      var gif2 = allGifs[i+1].name;
      var gif3 = allGifs[i+2].name;
      $("#col1").append(photoClass(gif1));
      $("#col2").append(photoClass(gif2));
      $("#col3").append(photoClass(gif3));
      i = i + 3;
  };
}

function photoClass(gif) {
  //let name = gif.split('.gif')[0];
  return "<div class='photo'><img src='./src/" + gif + "'/><div class='overlay'><img class'copyBtn' src='./icons/copy.png'/></div></div>"
}

function randomURL() {
  let x = Math.floor(Math.random() * allGifs.length);
  let url = allGifs[x].download_url;
  $("#randomURL").attr("href", url);
}


const img = new Image();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

async function copyImage(name) {
  const src = "./src/" + name + ".gif";
  const image = await writeToCanvas(src);
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [image.type]: image,
      })
    ]);
    console.log("Success");
  } catch(e) {
    console.log("Copy failed: " + e);
  }
}

function writeToCanvas(src) {
  return new Promise((resolve, reject) => {
    img.src = src;
    img.onload = function() {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img,0,0)
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    }
  });
}
