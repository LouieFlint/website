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
      $("#col1").append("<div class='photo'><img src='./" + gif1 + "'/><div class='overlay'></div></div>");
      $("#col2").append("<div class='photo'><img src='./" + gif2 + "'/><div class='overlay'></div></div>");
      $("#col3").append("<div class='photo'><img src='./" + gif3 + "'/><div class='overlay'></div></div>");
      i = i + 3;
  };
}

function randomURL() {
  let x = Math.floor(Math.random() * allGifs.length);
  let url = allGifs[x].download_url;
  $("#randomURL").attr("href", url); 
}
