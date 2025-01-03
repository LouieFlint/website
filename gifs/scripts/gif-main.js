var allGifs = [] 

function initialiseDoc() {
  return new Promise(async(resolve, reject)=> {
    await getGifDir();
    await createElements();
    resolve();
  });
}

async function getGifDir() {
  const response = await fetch("https://api.github.com/repos/LouieFlint/website/contents/gifs/src/");
  allGifs = await response.json();
}

async function createElements() {
  var colEnd = 0
  await $.each(allGifs, function(i) {
      var gif1 = allGifs[i].path.split('gifs/')[1];
      var gif2 = allGifs[i+1].path.split('gifs/')[1];
      var gif3 = allGifs[i+2].path.split('gifs/')[1];
      console.log("before:"+i);
      $("#gif").append("<div class='column'><div class='photo'><img src='./" + gif1 + "'/></div><div class='photo'><img src='./" + gif2 + "'/></div><div class='photo'><img src='./" + gif3 + "'/></div></div>");
      i = i + 3;
      console.log("after:"+i);
  });
}
