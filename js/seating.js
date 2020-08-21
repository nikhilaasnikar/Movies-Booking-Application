$(document).ready(function(){

      var seatsSelected = [];
      //let row;
      let k =1;
      
    for(let i=1; i<=10; i++){

      let row= "<div class='row seatRow' id='seatRow"+i +"'></div>";
      let addedRowToLeft =$("#seating-left").append(row).find("#seatRow"+i);

      let seats="";

        for(let j=k; j<=(k+11); j++){
          
         seats += "<span class='seat left' id='L" + i + "-" + j + "'>" + i + "-" + j + "</span>";
        }

       k = k + 12;
       addedRowToLeft.append(seats);
       row="";
    }


    let z =1;
      
    for(let i=1; i<=10; i++){

      let row= "<div class='row seatRow' id='seatRow"+i +"'></div>";
      let addedRowTRight =$("#seating-right").append(row).find("#seatRow"+i);

      let seats="";

        for(let j=z; j<=(z+11); j++){
          
         seats += "<span class='seat right' id='R" + i + "-" + j + "'>" + i + "-" + j + "</span>";
        }

       z = z + 11;
       addedRowTRight.append(seats);
       row="";
    } 

    $(".seat").each(function(){
       $(this).on("click", function(event){
        event.stopImmediatePropagation();
        let seatNum = $(this).attr("id");

        if(!seatsSelected.includes(seatNum)){
          seatsSelected.push(seatNum);
          $(this).addClass("selected");
          displaySelection();
        } else {
         let index = seatsSelected.indexOf(seatNum);
          seatsSelected.splice(index, 1);
          $(this).removeClass("selected");
          displaySelection();
        }
        
       })
    })

    $("#continue").click(function(){
  
     let numOfSeats = seatsSelected.length;
      location.href = "booking.html"+location.search+"&numOfSeats="+numOfSeats;

    })

    function displaySelection(){
      $("#displaySelected").html("");
      let selection = $("#displaySelected");
      seatsSelected.filter((seat)=>{
        selection.append("<span class='userSelected'>"+seat+"<span>");
      });

     
    }

});