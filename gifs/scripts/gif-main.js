var allGifs = [] 

function initialiseDoc() {
  return new Promise(async(resolve, reject)=> {
    await getGifDir();
    await createElements();
    await randomURL();
    resolve();
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
      $("#col1").append(photoClass(gif1, i));
      $("#col2").append(photoClass(gif2, i+1));
      $("#col3").append(photoClass(gif3, i+2));
      i = i + 3;
  };
}

function photoClass(gif, i) {
  return "<div class='photo'><img src='./src/" + gif + "'/><div class='overlay'><img onClick='copyImage(" + i + ")' src='./icons/copy.png'/></div></div>"
}

function randomURL() {
  let x = Math.floor(Math.random() * allGifs.length);
  let url = allGifs[x].download_url;
  $("#randomURL").attr("href", url);
}

/*TODO: FIX ONE-CLICK COPY FOR GIFS*/

const img = new Image();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

async function copyImage(i) {
  let src = './' + allGifs[i].path.split('gifs/')[1];
  console.log('src: ' + src);
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
      }, 'image/gif');
    }
  });
}
