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
  await $.each(allGifs, function(i) {
      var gif = allGifs[i].path.split('gifs/')[1];
      if (i % 3) {
        console.log(i);
         $("#gif").append(</div><div class='column'>);
      }
      $("#gif").append("<div class='photo'><img src='./" + gif + "'/></div>");
      
  });
}
