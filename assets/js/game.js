$(document).ready(function(){
    
    let intervalId = undefined;
    let timeCounter = 0; //timeCounter in seconds
    let maxTime = 120;
    let unanswered_ans = 0;
    let incorrect_ans = 0;
    let correct_ans = 0;

    let QAList = [{
        question: "Which Marvel Character speaks in a Cajun Accent, and originates from Lousiana?",
        answers: ["Wolverine","Jubilee","Mister Sinister","Gambit"],
        correct_ans: "Gambit"
    },
    {
        question: "The U.N.'s counter terrorism agency is called 'S.H.E.I.L.D'. What is Britain counter terrorism agency?",
        answers: ["B.L.A.D.E","S.T.R.I.K.E","H.Y.D.R.A","D.E.S.T.I.N.Y"],
        correct_ans: "S.T.R.I.K.E"
    },
    {
        question: "Which love interest of DareDevil lead the ancient originization known as 'The Hand'?",
        answers: ["Elektra","Stick","Storm","Typhoid Mary"],
        correct_ans: "Elektra"
    },
    {
        question: " Who is S.H.I.E.L.D.s highest ranking agent?",
        answers: ["Tony Stark","Steve Rogers","Nick Fury","Natalia Romanova"],
        correct_ans: "Nick Fury"
    },
    {
        question: "Captain America was frozen in which war?",
        answers: ["World War I","World War II","Cold War","America Civil War"],
        correct_ans: "World War II"
    },
    {
        question: "The term Vampire use to describe Blade is which of the following?",
        answers: ["Day Walker","Night Stalker","Vampire Killer","Blade of Death"],
        correct_ans: "Day Walker"
    },
    {
        question: "Ghost Rider is known as which of the following?",
        answers: ["The Spirit of Hate","The Spirit Of Vengeance","The Guardian Devil","The Red Skull"],
        correct_ans: "The Spirit Of Vengeance"
    }]

    function displayQuestionsAnswers(){
        QAList.forEach(function(elem,idx) {
            // query #question-section
            let qaSection = $('.qa-section');
            // create new div with class questions
            let questionDiv = $("<div class='questions'>");
            questionDiv.text(elem.question);
            // create new div with class answers
            let answersDiv = $(`<div class='answers-${idx}'>`);
            // create new form with for each answer
            let ansArr = elem.answers;
            let answerForm = $('<form>');
            ansArr.forEach(function(ans,idx) {
                let noSpaceStr = ans.replace(/\s/g,'');
                answerForm.append(`<input type="radio" name="answer" value=${noSpaceStr}>${ans}`);
            })

            answersDiv.append(answerForm);
            qaSection.append(questionDiv);
            qaSection.append(answersDiv);
        })
    }

    function calcScore() {
        QAList.forEach(function(qaItem,idx) {
            console.log($(`.answers-${idx} input:checked`));
            let checked_ans = $(`.answers-${idx} input:checked`).val();
            let item_ans = qaItem.correct_ans.replace(/\s/g,'');

            console.log(`qaItem-${idx}: ${item_ans}`);
            console.log(`checked_ans: ${checked_ans}`);
            
            if(item_ans === checked_ans)
                ++correct_ans;
            else if(checked_ans == undefined)
                ++unanswered_ans;
            else
                ++incorrect_ans;
        })
    }

    function checkInput(){
        $('#gameBtn').off('click').on('click',function() {
            calcScore();
            displayResults();
        })
    }

    function displayResults() {
        clearInterval(intervalId);
        $('#timeLimit').text('Here are the Results:');
        
        let qaSectionElem = $('.qa-section');
        qaSectionElem.empty();

        let correctAnsElem = $('<p>').text(`Correct Answers: ${correct_ans}`);
        let incorrectAnsElem =  $('<p>').text(`Incorrect Answers: ${incorrect_ans}`);
        let unansweredElem = $('<p>').text(`Unanswered: ${unanswered_ans}`);

        qaSectionElem.append(correctAnsElem);
        qaSectionElem.append(incorrectAnsElem);
        qaSectionElem.append(unansweredElem);

        $('#gameBtn').text("Play Again");
        $('#gameBtn').off('click').on('click',function() {
            qaSectionElem.empty();
            startGame();    
        })
    }

    function resetGame(){
        $('#gameBtn').text('Finished');
        $('#timeLimit').text('GAME ON!');
        clearInterval(intervalId);
        timeCounter = maxTime;
        correct_ans = 0;
        incorrect_ans = 0;
        unanswered_ans = 0;
    }

    function timeLeft() {
        if(timeCounter > 0){
            $('#timeLimit').text(`Time Remaining: ${timeCounter}`);
            timeCounter -= 1;
        }
        else{
            displayResults();  
        }
    }

    function startGame()
    {
        resetGame();
        displayQuestionsAnswers();
        intervalId = window.setInterval(timeLeft,1000);
        checkInput();
    }

    startGame();
});
