window.onload = function() {
  const response = await fetch("https://api.github.com/repos/LouieFlint/website/contents/gifs/src/");
  const todos = await response.json();
  console.log(todos);
}
