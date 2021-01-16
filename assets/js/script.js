
$('#searchBox').on('click', function() {
    value = document.getElementById("city").value;
    console.log(value);
var obj;

fetch("https://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=ab27f177782f621190cdae30ab462244")
.then(res => res.json())
  .then(data => obj = data)
  .then(() => console.log(obj))

});

    


