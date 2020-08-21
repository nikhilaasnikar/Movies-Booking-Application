// Name= NIKHIL VENKAT AASNIKAR
// ID=10360623


$(document).ready(function(){

//Load weekdays
var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
var dayIndex = new Date().getDay();   
var max = 7 + (dayIndex);
$("#weekDays li a").each(function(){
    if(dayIndex < max){
    if(dayIndex > 6){
        dayIndex= dayIndex-7;
    }    
    $(this).html(weekDays[dayIndex]);
    $(this).attr("href", "#"+weekDays[dayIndex]);
    dayIndex++;
}
});

dayIndex = new Date().getDay();    
$("#tab-content div").each(function(){
    if(dayIndex < max){
        if(dayIndex > 6){
            dayIndex= dayIndex-7;
        }  

    $(this).attr("id",weekDays[dayIndex]);
    if(dayIndex === new Date().getDay()){
        $(this).addClass("in active");
    }
    dayIndex++;
    }
});


$.get("https://college-movies.herokuapp.com/", function(data){

var movies = data;


$("#tab-content div p").each(function(){

    let thisDay = $(this).closest('div').attr('id').substring(0, 3).toLowerCase();    
    let movieList = $(this).append('<table class="table table-striped col-sm-12 movieTable"></table>').find('table');
    movieList.append("<tr><th scope='col'>Name</th><th scope='col'>Cast</th><th scope='col'>Genre</th><th scope='col'>Timings</th></tr>");
    for(var i =0; i< movies.length; i++) {
        
       if(!movies[i].runningTimes[thisDay]) {
           break;
       }
        let row ="<tr><td scope='col'>"+ movies[i].title+"</td>";
        row+="<td scope='col'>"+ movies[i].cast+"</td>";
        row+="<td scope='col'>" +movies[i].genre +"</td>";
        row+="<td scope='col'>" + movies[i].runningTimes[thisDay] +"</td>"
        row+="<td scope='col'><button type='button' class='book-now btn btn-primary' value='"+movies[i].title+"'>Book Now</button></td></tr>"
        movieList.append(row);
    }

    $(".book-now").each(function(){
        $(this).on("click", function(event){
            event.stopImmediatePropagation();
            let movieName = this.value;
            let timings;
            
            movies.map((movie)=>{
                if(movie.title === movieName)
                timings = movie.runningTimes[thisDay];
            })
            
            location.href="booking.html?movie=" + movieName +"&timing="+ encodeURI(timings);
        })
        })
   });
  });


});