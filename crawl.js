$(document).ready(() => {
var $body = $('body');
//getHTML
function getHTML(url, indent = 1){
  for (let i = 0; i < indent; i++){
    $body.append(`&emsp;`);
  }
  $body.append(`<a href="${url}">${url}</a></br>`);
  $body.append(`</br>`);
  $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(`${url}`) + '&callback=?', function(data){
    console.log(data.contents.length);
    let number = data.contents.length;
    console.log("number = ", number);
    let html = data.contents.replace(/\s/g, "");
    let array = html.match(/<a.*?>/g)
    //console.log(array.length);
    console.log(array);
    console.log(array.length);
    let links = array.map(link => {
      let string = "";
      let quote = 0;
      for (i = 0; i < link.length; i++){
        if (link[i] === `"`){
          quote++;
        }
        if (quote === 1){
          string += link[i];
        }
      }
      return string.slice(1);
    });
    console.log(links);
    console.log(html);
    indent++;
    links.forEach(link => {
      getHTML(link, indent); 
    })
  });
  var url = "http://anyorigin.com/go?url=" + encodeURIComponent(`"${seed}"`) + "&callback=?";
  $.get(url, function(response) {
    console.log(response);
  });
}

//create seed
function createSeed(){
  seed = $("#input").val();
  getHTML(seed);
  //console.log(document.body)
}
//enter key event handler
$("#input").keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13'){
    createSeed();
  }
})

})