
const popUpThumbnail = document.querySelector(".thumbs");
const mainImage = document.querySelector(".photo");

popUpThumbnail.addEventListener('click', function(event){
  event.preventDefault();
  if(event.target.className!=="thumbs__link") return
  mainImage.innerHTML = `<img src=${event.target.href}>`

})

function getWeather() {
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=london&APPID=6eb8e0a606f302d3694024e89224db53';
  return fetch(url)
  .then(function(response){
    return response.json()
  }).then(function(data){
    const weatherDescription = (data.weather[0]['description']);
    return encodeURI(weatherDescription);
  })
  .catch(function(error){
    console.log('error');
  })
};
//console.log(getWeather());
// getWeather()

function weatherImage (){
  getWeather()
  //console.log(weatherDescription);
  .then(function(description){
    const weatherDescriptionUrl = `https://api.unsplash.com/search/photos?query=${description}&client_id=f685c677520cae68e71ed6aab8dd7505eb31b24ec90d2d97531e0f7c6507a189`;
    return fetch(weatherDescriptionUrl);
  })
  .then(function(response){
    return response.json()
  }).then (function(data){
    const images = data.results.map(function(image){
      // console.log(image.urls);
      return`
      <a href=${image.urls.regular} class="thumbs__link"><img class="thumbs__link__img" src= ${image.urls.thumb}></a>
      `
    })
    thumbs.innerHTML = images;

  })
}
weatherImage();
