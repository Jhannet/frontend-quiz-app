$( document ).ready(function() {
 
    const urlParams = new URLSearchParams(window.location.search);
    const quizSubjectValue = urlParams.get('quiz-subject');
    const quizScore = urlParams.get('score');
    
    $.getJSON("data.json", function(data){
        const subjectData = data.quizzes.find(data => data.title.toLowerCase() === quizSubjectValue);

        switch(subjectData.title) {
            case "HTML": $(".subject-icon").addClass("html-icon");
                break;
            case "CSS": $(".subject-icon").addClass("css-icon");
                break;
            case "JavaScript": $(".subject-icon").addClass("js-icon");
                break;
            case "Accessibility": $(".subject-icon").addClass("accessibility-icon");
                break;
        }

        $(".subject-icon img").attr("src", subjectData.icon);
        $("#subject-label h3").html(subjectData.title);

        $("#score-value").html(quizScore);
        $("#score-text").html(`out of ${subjectData.questions.length}`);

    }).fail(function(){
        console.log("An error has occurred.");
    });

});