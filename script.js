$(() => {
  $(".info").html("<p class='loading'>. . . . </p>")

  $(".btn-i").click(() => {
    prepareData("imperial", "F°")
  })

  $(".btn-m").click(() => {
    prepareData("metric", "C°")
  })

  const prepareData = (unit, unitMeasure) => {
    console.log(1);
    let cityName = $(".text").val().trim()
    const API_KEY = "c933bac99e074c3df1427010c63af3ef"
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
    if(cityName && cityName != ""){
      $.getJSON(url, (data) => {
        fetchData(data, unitMeasure)
      })
    }else{
      alert("Please enter city name")
    }
  }

  function fetchData(data, unitMeasure){
    let cityName = data.city.name
    let country = data.city.country
    let html = `<h3 class="title">${cityName}, ${country}</h3>`
    let div = ""
    let date
    $(".title").html(html)
    data.list.slice(0, 3).forEach((item) => {
      console.log(item);
      date = item.dt_txt.split(" ")
      console.log(date);
      console.log(cityName);
      div += `
        <div class="box">
            <p class="date">${date[0]}</p>
            <p class="temp">${Math.round(item.main.temp) + " " + unitMeasure}</p>
            <p class="time">${date[1]}</p>
        </div>
      `
    })
    $(".info").html(div)
  }
}