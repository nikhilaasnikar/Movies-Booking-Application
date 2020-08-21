// Name= NIKHIL VENKAT AASNIKAR
// ID=10360623


$(document).ready(function(){

    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

    $("#selectSeats").click(function(e){
        e.stopImmediatePropagation();
        e.preventDefault();
        let movieString = location.search;
        location.href= "seating.html?" + movieString;

  })

  if(location.search.includes("numOfSeats")){
    let numOfSeatsParam = location.search.split("&");
    let numOfSeats = numOfSeatsParam[2].split("=")[1];
    $("#tickets").attr("value",numOfSeats);
  }

  if(location.search.includes("movie")){
    let movieParam;
      if(location.search.includes("&"))
       movieParam = location.search.split("&")[0];
       else
       movieParam = location.search;

    let movieName = movieParam.split("=")[1];
    movieName = decodeURI(movieName)
    $("#movie").append("<option selected value='"+movieName+"'>"+ movieName + "</option>");
  }

  if(location.search.includes("timing")){
    let timingParam = location.search.split("&");
    console.log(timingParam);
    let timing = timingParam[1].split("=")[1];
    timing = decodeURI(timing);
    timing = timing.split(",");
   let selectEle = $("#timing")

   timing.map((time)=>{
       selectEle.append("<option value='"+time+"'>"+time+"</option>");
   })
  }

  $.get("https://college-movies.herokuapp.com/", function(data){

var movies = data;
let todayIndex = new Date().getDay();
let today = weekDays[todayIndex].substring(0, 3).toLowerCase()
let moveiObj={};
movies.map((movie)=>{
moveiObj[movie.title]= movie.runningTimes;
});

if(!location.search.includes("movie")){

let movieNames = Object.keys(moveiObj);
let moveiSelector = $("#movie");
movieNames.map((movieName)=>{
moveiSelector.append("<option selected value='"+movieName+"'>"+ movieName + "</option>");
})

}

$("#movie").change(addTiming);

if(!location.search.includes("timing")){
    addTiming();
  }

  function addTiming(){
    let moveiSelected = $("#movie").val();
   
    if(moveiSelected){ 
    let timing = moveiObj[moveiSelected] [today];  
    let selectEle = $("#timing");
    selectEle.html("");
 
    timing.map((time)=>{
        selectEle.append("<option value='"+time+"'>"+time+"</option>");
    })
 }
  }


  });



$("#booking-form").submit(function(e){
    e.preventDefault();    
    if(!$("#name").val()){
    $("#name-required").css("display","inline-block");
    return false;
    } else{
        $("#name-required").css("display","none");
    }

    if(!$("#user-email").val()){
        $("#email-required").css("display","inline-block");
        return false;
        }else {
            $("#email-required").css("display","none");
        }
    
        if(parseInt($("#tickets").val()) < 1){
            $("#tickets-required").css("display","inline-block");
            return false;
            }else {
                $("#tickets-required").css("display","none");
            }

   location.href="booking-confirmation.html";
})

});