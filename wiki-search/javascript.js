$(document).ready(function () {
    //Clears input of text
    $('input[type="text"]').click(function (e) {
        $("ul").empty();
    });

    //Ties enter button to search-btn
    document.querySelector("#user-input")
        .addEventListener("keydown", function (event) {
            if (event.keyCode == 13) {
                document.querySelector("#search-btn").click();
                $("ul").empty();
            }
        });
    //Setting the Ajax url to the user's input
    $("#search-btn").click(function () {
        var userInputStr = $("#user-input").val();
        var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + userInputStr + "&format=json&callback=wikiCallback";
        //Ajax call to Wikipedia and appending the articles to the ul
        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            success: function (response) {
        
                var articleList = response[1];
                var description = response[2];
                
                for (var i = 0; i < articleList.length; i++) {
                    articleTitleUrl = articleList[i].replace(/ /g,"_");
                    var url = "http://en.wikipedia.org/wiki/" + articleTitleUrl;
                        
                        $("ul").append("<li><span><a class='article-link' href=" + url + " target=_blank>" + articleList[i] + "<br>" + description[i] + "</a></span></li>");
                }
            }
        })
        $("#user-input").val("");
        $("ul").empty();
    });
});






