const allGifs = [] 

async function initialiseDoc() {
  const response = await fetch("https://api.github.com/repos/LouieFlint/website/contents/gifs/src/");
  allGifs = await response.json();
  console.log(allGifs)
  $.each(allGifs, function(i) {
    var gif = i.path[i].split('gifs/');
    console.log(gif);
    $("#gif").append("<img src='./" + gif + "'/>");
  }
}
