$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
    
  })
  var k = 0;
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'Which US state is named on the label of a Jack Daniels bottle?',
      q2: 'A phlebotomist extracts what from the human body?',
      q3: 'Which singer’s real name is Stefani Joanne Angelina Germanotta?',
      q4: 'A couple celebrating their crystal wedding anniversary have been married for how many years?',
      q5: "Which instrument did Louis Armstrong play?",
      q6: 'How many men have walked on the moon?',
      q7: "Which is the world’s second largest country in land area?"
    },
    options: {
      q1: ['Tennesse', 'Kentucky', 'Ohio', 'South Carolina'],
      q2: ['Saliva', 'Demons', 'Blood', 'Stool'],
      q3: ['Beyonce', 'Lady Gaga', 'Adele', 'Shakira'],
      q4: ['3', '8', '15', '6'],
      q5: ['Harmonica','Clarinet','Saxophone','Trumpet'],
      q6: ['2','12','6','10'],
      q7: ['Canada', 'Asia', 'Egypt','Antartica']
    },
    answers: {
      q1: 'Tennesse',
      q2: 'Blood',
      q3: 'Lady Gaga',
      q4: '15',
      q5: 'Trumpet',
      q6: '12',
      q7: 'Canada'
    },
    
    startGame: function(){
      // reset
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      $("#question").css("filter", "blur()");

      $('#game').show();
      
      $('#results').html("");
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
    },
     
    nextQuestion : function(){
      
      trivia.timer = 30;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];

      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>You missed out because you were throwing up. The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'.</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){

        $('#results')
          .html('<h3>Thanks for playing! Let me call you a cab.</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unanswered: '+ trivia.unanswered +'</p>');
     
        $('#game').hide();
        
        $('#start').show();
      }
    },
    
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
   
      if($(this).text() === currentAnswer){

        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct! Great job!</h3>');
        k--;
        $("#question").css("filter", "blur("+k+"px)");
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>You are cut off! The correct answer was '+ currentAnswer +'.</h3>');
        k++;
        $("#question").css("filter", "blur("+k+"px)");

      } 
    },
    
    guessResult : function(){
   
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
    
      trivia.nextQuestion();
    }
  }