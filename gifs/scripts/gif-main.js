var allGifs = [] 

function initialiseDoc() {
  return new Promise(async(resolve, reject)=> {
    await getGifDir();
    await createElements();
    $("#randomBtn").click(openRandomGif());
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
      console.log("before:"+i);
      var gif1 = allGifs[i].path.split('gifs/')[1];
      var gif2 = allGifs[i+1].path.split('gifs/')[1];
      var gif3 = allGifs[i+2].path.split('gifs/')[1];
      console.log("before:"+i);
      $("#col1").append("<div class='photo'><img src='./" + gif1 + "'/></div>");
      $("#col2").append("<div class='photo'><img src='./" + gif2 + "'/></div>");
      $("#col3").append("<div class='photo'><img src='./" + gif3 + "'/></div>");
      i = i + 3;
      console.log("after:"+i);
  };
}

function openRandomGif() {
  var x = Math.random() * allGifs.length;
  var url = allGifs[x].download_url;
  window.open(url, '_blank').focus();
}
