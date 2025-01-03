const allGifs = [] 

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
  console.log(allGifs)
}

async function createElements() {
  await $.each(allGifs, function(i) {
      var gif = i.path[i].split('gifs/');
      console.log(gif);
      $("#gif").append("<img src='./" + gif + "'/>");
  });
}
