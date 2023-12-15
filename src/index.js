
$(document).ready(function(){
    let quizzes = [];
    
    const urlParams = new URLSearchParams(window.location.search);
    const quizSubjectValue = urlParams.get('quiz-subject');

    $.getJSON("data.json", function(data){
        quizzes = data.quizzes
            
        const subjectData = quizzes.find(data => data.title.toLowerCase() === quizSubjectValue);
        setSelectedSubjectDataHeader(subjectData);

        let questionIndex = 0;
        let selectedOption = 0;
        let score = 0;
        const questions = subjectData.questions;

        showQuestion(questionIndex, questions);

        $("#submit-button").on( "click", function() {
            const buttonText = $("#submit-button div strong").text();

            if (buttonText === "Submit Answer") {
                if(selectedOption > 0) {
                    $(".vertical-menu a").removeClass("selected-option");
                    const selectedText = $(`#option-text-${selectedOption}`).text();
                    const correctAnswerIndex = questions[questionIndex].options.indexOf(questions[questionIndex].answer)+1;
                    $(`#option-${correctAnswerIndex} .menu-item-container`).append(`<div class="correct-icon"><strong>&#x2714;</strong></div>`);
    
                    if(selectedText === questions[questionIndex].answer) {
                        $(`#option-${selectedOption}`).addClass("correct-answer");
                        $(`#option-${selectedOption} .option-icon`).addClass("correct-color");
                        score++;
                    } else {
                        $(`#option-${selectedOption}`).addClass("wrong-answer");
                        $(`#option-${selectedOption} .option-icon`).addClass("error-color");
                        $(`#option-${selectedOption} .menu-item-container`).append(`<div class="error-icon"><strong>x</strong></div>`);
                    }

                    $("#submit-button div strong").text("Next Question");
                } else {
                    $("#error-message").remove();
                    $("aside").append(`<div class="header-container" id="error-message">
                                            <div class="error-icon"><strong>x</strong></div>
                                            <div class="error-message-label">Please select an answer</div>
                                        </div>`);
                }

            } else if (buttonText === "Next Question") {
                $(".vertical-menu a").removeAttr("class");
                $(".correct-icon").remove();
                $(".error-icon").remove();
                $(".option-icon").removeClass("correct-color");
                $(".option-icon").removeClass("error-color");

                if (questionIndex < questions.length-1) {
                    questionIndex++;
                    showQuestion(questionIndex, questions);
                } else {
                    window.location.replace(`./completed.html?quiz-subject=${quizSubjectValue}&score=${score}`);
                }

                $("#submit-button div strong").text("Submit Answer");
            }

            selectedOption = 0;
        });

        for (let i=1; i<=4; i++) {
            $(`#option-${i}`).on("click", function() {
                selectedOption = i;
                $(".vertical-menu a").removeClass("selected-option");
                $(`#option-${selectedOption}`).addClass("selected-option");
                $("#error-message").remove();
            });
        }

    }).fail(function(){
        console.log("An error has occurred.");
    });

    function showQuestion(questionIndex, questions){
        $(".progress-value").css("width", `${(questionIndex / questions.length) * 100}%`);

        $("#question-number").html(`Question ${questionIndex + 1} of ${questions.length}`);
        $("#question-value").html(questions[questionIndex].question);

        for(let i=0; i<questions[questionIndex].options.length; i++) {
            $(`#option-text-${i+1}`).text(questions[questionIndex].options[i]);
        }
    }

    function setSelectedSubjectDataHeader(subjectData){
        $(".subject-icon img").attr("src", subjectData.icon);
        $("#subject-label h3").html(subjectData.title);


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
    }

});