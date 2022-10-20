function artistResult(artist) {

    // to change to upcoming events change date=upcoming, for all date=all, for past date=past
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";
    // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response)
        
        let arr = [];

        // error message if no upcoming events are available.
        if (response.length === 0) {
            noEvents = $("<p>").text("Oops, it looks like " + artist + " is in quarantine and have no upcoming events")
            $("#artist-upcoming").empty();
            searchArtist(artist)
            $("#artist-upcoming").append(noEvents)
        }
        else {
            artistName = $("<p>").text("Upcoming Events for " + artist)
            $(".similar").empty();
            $("#artist-upcoming").empty();
            $("#artist-upcoming").append(artistName)
        }

        // first start from array of most recently ended events
        for (var i = response.length - 1; i > 0; i--) {
            // if (Array)
                if (i === response.length - 10) { break; }

                arr.push(response[i]);

                // dateTime = response[i].datetime;
                // dateOnly = dateTime.slice(0,9)
    
                var buttons = $('<button>'+ "Save" + '</button>')
                buttons.addClass("saveBtn resultsRow") 
                buttons.appendTo('#saveBtnCol'); 
    
                countryCol = $("<p>").text(response[i].venue.country)
                countryCol.addClass("resultsRow")
                venueCol = $("<p>").text(response[i].venue.name)
                venueCol.addClass("resultsRow")
                dateCol = $("<p>").text(response[i].datetime.slice(0,10))
                dateCol.addClass("resultsRow")
    
                $("#artist-country").append(countryCol)
                $("#artist-venue").append(venueCol)
                $("#artist-date").append(dateCol)
            }
            
            console.log("arr: ", arr);
      });
    }

    //click event for search
$(".searchBtn").on("click", function(event) {
    event.preventDefault();
    inputArtist = $("#artist-input").val().trim();
    scrollDown()
    artistResult(inputArtist);
    });
$(".saveBtn").on('click', function(save){
    let cats = {
        venue: artist-venue,
        location: artist-country,
        
    }
    todos[editing] = cats
    localStorage.setItem('todos', JSON.stringify(todos))
    
})

     //scrolls user to the bottom of the page after clicking search
function scrollDown() {
    window.scrollBy(0, 1500);
}

     //searches artist id from songkick API using aritst input
function searchArtist(artist) {
    var queryURL = "https://api.songkick.com/api/3.0/search/artists.json?apikey=gy9d7Sa5j6mnCzMt&query= " + artist + "";
        $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
      console.log(response)
      id = response.resultsPage.results.artist[0].id
      similarArtist(id)
  });
}

    //grabs the ID and uses it to find similar artist WHEN there are NO UPCOMING EVENTS
function similarArtist(artistID) {

    var queryURL = "https://api.songkick.com/api/3.0/artists/" + artistID + "/similar_artists.json?apikey=gy9d7Sa5j6mnCzMt";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        resultsArtist = response.resultsPage.results.artist
        console.log(resultsArtist)
        for (var r = 0; r < resultsArtist.length; r++) {
            // if (Array)
            if (r === 3) { break; }
            // console.log(response)
            // similarName = $("<button></button>").text(resultsArtist[r].displayName)
            // $(".similar").append(similarName)

            //creates buttons for the top 3 similar artist

           similarBtn = $('<button>'+ resultsArtist[r].displayName + '</button>')
           similarBtn.addClass("similarButton").val(resultsArtist[r].displayName)
           similarBtn.appendTo('.similar'); 
        }
    });
}


// click to display upcoming shows from similar artist

    $(document).on("click", ".similarButton" , function() {
        similarResults = $(this).attr("value");
        console.log(similarResults);
        artistResult(similarResults);
    })