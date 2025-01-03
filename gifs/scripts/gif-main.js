const allGifs = [] 

async function initialiseDoc() {
  getGifDir().then(
    $.each(allGifs, function(i) {
      var gif = i.path[i].split('gifs/');
      console.log(gif);
      $("#gif").append("<img src='./" + gif + "'/>");
    });
  )
}

function getGifDir() {
  const response = await fetch("https://api.github.com/repos/LouieFlint/website/contents/gifs/src/");
  allGifs = await response.json();
  console.log(allGifs)
}
