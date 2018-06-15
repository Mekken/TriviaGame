$(document).ready(function(){
    
    let intervalId = undefined;
    let timelimit = 90000; //timelimit in ms
    let question_idx = 0;
    let incorrect_ans = 0;
    let correct_ans = 0;
    let QAList = [{
        question: "Which Marvel Character speaks in a Cajun Accent, and originates from Lousiana?",
        answers: {
            ans1: "Wolverine",
            ans2: "Jubilee",
            ans3: "Mister Sinister",
            ans4: "Gambit"
        },
        correct_ans: 4
    },
    {
        question: "The U.N.'s counter terrorism agency is called 'S.H.E.I.L.D'. What is Britain counter terrorism agency?",
        answers: {
            ans1: "B.L.A.D.E",
            ans2: "S.T.R.I.K.E",
            ans3: "H.Y.D.R.A",
            ans4: "D.E.S.T.I.N.Y"
        },
        corret_ans: 2 
    },
    {
        question: "Which love interest of DareDevil lead the ancient originization known as 'The Hand'?",
        answers: {
            ans1: "Elektra",
            ans2: "Stick",
            ans3: "Storm",
            ans4: "Typhoid Mary"
        },
        correct_ans: 1
    }]

    function displayQuestionsAnswers(){
        $('#questions').text(QAList[question_idx].question);
        
        let answerList = QAList[question_idx].answers,
            answerRadio = $('<form>');
        
        answerList.forEach(function(ans,idx) {
            let inputElem = $(`<input class='answer-${idx}'>`).text(ans);
            answerRadio.append(inputElem); 
        })
        $('#answers').append(answerRadio);
    }

    function displayResults() {
        //TODO: Display Correct/Incorrect Answers
    }

    function resetGame(){
        intervalId = undefined;
        timelimit = 90;
        question_idx = 0;
        correct_ans = 0;
        incorrect_ans = 0;
    }

    function timeLeft() {
        if(timelimit > 0)
        {
            //TODO: Display Time Left
            $('#timeLimit').text(`Time Left: ${timeLimit}`);
            //TODO: Decrement Timelimit by 1
            timelimit -= 1;
        }
        else
        {
            //TODO: Display Time's Up!
            $('#timeLimit').text("TIME'S UP!");
            //TODO: Move to Next Question if Index < Questions.Length
            if(question_idx < QAList.lenth){
                ++question_idx
            }
            //TODO: Else Stop Interval and Display Game Over Screen 
            else {

            }
        }
    }

    function startGame()
    {
        resetGame();
        displayQuestionsAnswers();
        
        //Start Interval Timer
        intervalId = window.setInterval(timeLeft,1000);
    }

    startGame();
});
