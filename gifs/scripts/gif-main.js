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
      var gif1 = allGifs[i].path.split('gifs/')[1];
      var gif2 = allGifs[i+1].path.split('gifs/')[1];
      var gif3 = allGifs[i+2].path.split('gifs/')[1];
      $("#col1").append(photoClass(gif1));
      $("#col2").append(photoClass(gif2));
      $("#col3").append(photoClass(gif3));
      i = i + 3;
  };
}

function photoClass(gif) {
  return "<div class='photo'><img src='./" + gif + "'/><div class='overlay'><img src='./icons/copy.png'/></div></div>"
}

function randomURL() {
  let x = Math.floor(Math.random() * allGifs.length);
  let url = allGifs[x].download_url;
  $("#randomURL").attr("href", url);
}
