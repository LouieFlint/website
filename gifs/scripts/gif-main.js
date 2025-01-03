function initialiseDoc() {
  console.log('hit');
  const xhr = new XMLHttpRequest();
  const url = "https://api.github.com/repos/LouieFlint/website/contents/gifs/src/"
  xhr.open('GET', URL, true);
  xhr.onload = function() {
      const data = JSON.parse(this.response);
      console.log(data);
  }
}
