$(() => {
  $(".info").html("<p class='loading'>. . . . </p>")

  $(".btn-i").click(() => {
    prepareData("imperial", "°F")
  })

  $(".btn-m").click(() => {
    prepareData("metric", "°C")
  })

  const prepareData = (unit, unitMeasure) => {
    let cityName = $(".text").val().trim()
    const API_KEY = "c933bac99e074c3df1427010c63af3ef"
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
    if(cityName && cityName != ""){
      $.getJSON(url, (data) => {
        fetchData(data, unitMeasure)
      })
    }else{
      alert("Please enter city name")
    }
  }

  //weather[0] "icon":"04d"

  function fetchData(data, unitMeasure){
    let cityName = data.city.name
    let country = data.city.country
    let html = `<h3 class="title">${cityName}, ${country}</h3>`
    let div = ""
    let date
    $(".title").html(html)
    data.list.slice(0, 3).forEach((item) => {
      date = item.dt_txt.split(" ")[1].split(":")
      console.log(item);
      div += `
        <div class="box">
          <p class="time">${date[0] + ":" + date[1]}</p>
          <img class="img" src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" />
          <p class="temp">${Math.round(item.main.temp) + " " + unitMeasure}</p>
        </div>
      `
    })
    $(".info").html(div)
  }
})
