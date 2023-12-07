/*
master.js - 
Author(s): Michelle Wang
Date: 06 December, 2023
*/
// Loading Screen

const loadingScreen = function () {
    // Simulate loading delay (replace this with your actual loading logic)
    $("#loading-screen").fadeIn("slow");
    setTimeout(function () {
        // Hide the loading screen when the loading is complete
        $("#loading-screen").fadeOut("slow");
    }, 500); // Replace 500 with the desired delay in milliseconds
}

// Call the loading screen function when the document is ready
$(document).ready(loadingScreen);

// Reusable function for handling mouse events
// From ChatGPT (Simplified the code I made for both button and icons)
function handleMouseEvents(element, hoverClass, clickClass) {
    // Change appearance on mouse enter
    element.on("mouseenter", function () {
        $(this).addClass(hoverClass);
    });

    // Revert on mouse leave
    element.on("mouseleave", function () {
        $(this).removeClass(hoverClass);
    });

    // Change appearance on mouse click
    element.on("mousedown", function () {
        $(this).addClass(clickClass);

        // Bind mouseup to the document to handle cases where the mouse is released outside the button
        $(document).on("mouseup", function () {
            element.removeClass(clickClass);
            // Unbind the mouseup event after it's been triggered once
            $(document).off("mouseup");
        });
    });
}

// Apply the function to buttons
handleMouseEvents($("button"), "buttonHover", "buttonClick");

// Apply the function to icons
handleMouseEvents($(".icon"), "iconHover", "iconClick");

// Tutorial

$("#tutorial-button").click(function () {
    $("#tutorial-screen").removeClass("hide");
});

$("#tutorial-exit").click(function () {
    $("#tutorial-screen").addClass("hide");
});

// Play

$("#play").click(function () {
    // Show loading screen
    loadingScreen();
    setTimeout(function () {
        $("#questions-screen").removeClass("hide");
        $("#landing-page").addClass("hide");
        changeState();
    }, 700)
});

//Working Code for 6 Questions

const questions = [
    {
      question: "What type of date are you most interested in?", 	// q1
      replies: [
        "A cozy night in with homemade dinner.", //(Love)
        "A fancy restaurant with exquisite cuisine.", //(Money)
        "A cultural event like a museum or theater.", //(Balanced)
        "A spontaneous road trip to explore new places.", //(Love)
        "A high-end concert or entertainment event." //(Money)
      ]
    },
    {
        question: "Describe your dream vacation.", // q2
        replies: [
            "Exploring a romantic European city.", //(Love)
            "Relaxing on a luxurious tropical island.", //(Money)
            "Visiting historical landmarks and cultural sites.", //(Balanced)
            "Experiencing a traditional cultural festival.", //(Love)
            "Going on a luxury cruise or an exclusive resort." //(Money)
        ]
      },
      {
        question: "How do you handle conflicts in a relationship?", // q3
        replies: [
        "Open communication and understanding.", //(Love)
        "Avoid confrontation and enjoy harmony.", //(Money)
        "Seeking professional advice or counseling.", //(Balanced)
        "Addressing issues immediately to find resolution.", //(Love)
        "Giving each other time and space to reflect." //(Money)
        ]
      },
      {
        question: "What qualities are you looking for in a partner?", // q4
        replies: [
        "Compassion and emotional connection.", //(Love)
        "Financial success and stability.", //(Money)
        "Spontaneity and a sense of adventure.", //(Balanced)
        "Sense of humor and the ability to make me laugh.", //(Love)
        "Ambition and drive for personal and professional success." //(Money)
        ]
      },
      {
        question: "What role does career play in your life?", // q5
        replies: [
        "It's important, but personal connections come first.", //(Love)
        "It's a top priority for success and financial stability.", //(Money)
        "I prioritize passion and fulfillment over financial gain.", //(Balanced)
        "Career success is intertwined with personal happiness.", //(Love)
        "I find purpose and identity through professional achievements." //(Money)
        ]
      },
      {
        question: "How do you express affection in a relationship?", // q6
        replies: [
        "Through words, gestures, and quality time.", //(Love)
        "Through grand gestures and material gifts.", //(Money)
        "Through acts of service and thoughtful favors.", //(Balanced)
        "Physical touch and intimate moments are essential.", //(Love)
        "Gifting luxurious items or experiences." //(Money)
        ]
      },
      {
        question: "If I told you I'm queer, would you still love me?", // q7
        replies: [
        "I love you for who you are, not who you love.", //(Love)
        "I value our relationship, irrespective of your identity.", //(Money)
        "Your identity doesn't impact the love and support I have for you.", //(Balanced)
        "Of course, your queerness is just another wonderful part of you.", //(Love)
        "Our connection goes beyond labels; it's about us." //(Money)
        ]
      },
  ];

  const repliesLog = [];
  let currentQuestionIndex = 0; // Assuming the first question is displayed initially

  function randReply(questionIndex) {
    const question = questions[questionIndex];
    const index = Math.floor(Math.random() * question.replies.length);
    const reply = question.replies[index];
    // console.log(index)
    // console.log(reply)
    // Log only the chosen reply
    logReply(index);
    return reply;
  }

  function logReply(index) {
    repliesLog.push(index);
}

  function handleButtonClick(buttonId, questionIndex) {
    let isLeft = true;
    let clickCount = 0;
  
    $(buttonId).click(function () {
      if (clickCount >= 1) {
        return;
      }
  
      const question = questions[questionIndex].question;
      let newReply = randReply(questionIndex);
  
      const outputText = isLeft ? `${question}<br>${newReply}` : `${newReply}<br>${question}`;
      $("#output").append('<div class="text-' + (isLeft ? 'left' : 'right') + '"><p>' + outputText + '</p></div>');
      $("#output").append('<div style="clear:both;"></div>');
  
      isLeft = !isLeft;
  
      clickCount++;
      currentQuestionIndex++;
      
    //   console.log(currentQuestionIndex)
    //   console.log(questions.length)
    //   console.log(currentQuestionIndex === questions.length)
    //   console.log(repliesLog)
      if (clickCount === 1) {
        // Hide the button when clicked once
        $(buttonId).hide();
      }

      function calculateAIDecision(repliesLog) {
        let loveCount = 0;
        let moneyCount = 0;
      
        repliesLog.forEach(index => {
            // Determine the category based on specific indices
            if (index === 0 || index === 3) {
                loveCount++;
            } else if (index === 1 || index === 4) {
                moneyCount++;
            }
            // console.log(loveCount)
            // console.log(moneyCount)
            // You may need to adjust the conditions based on your specific replies
        });
      
        if (loveCount > moneyCount) {
          return "love";
        } else if (moneyCount > loveCount) {
          return "money";
        } else {
          return "balanced";
        }
      }

      if (currentQuestionIndex === questions.length) {
        // Log the replies
        console.log("Replies log:", repliesLog);
    
        // Calculate AI decision
        const aiDecision = calculateAIDecision(repliesLog); // Implement this function
    
        console.log("AI decision:", aiDecision);
    
        // Introduce a delay before prompting the user
        setTimeout(() => {
            // Prompt the user to decide if the blind date is "love" or "money"
            const userDecision = prompt(
                "The blind date is over. Was it more about love or money? Type 'love' or 'money'"
            );
    
            // Compare the user's decision with the AI's answers
            console.log("User decision:", userDecision);
            console.log("AI decision:", aiDecision);
    
            // Show the result
            if (userDecision && userDecision.toLowerCase() === aiDecision) {
                alert("Congratulations! You successfully accessed their intentions!");
            } else {
                alert("Sorry, you lose. Better luck next time.");
            }
        }, 1000); // Adjust the delay duration as needed (1000 milliseconds or 1 second in this example)
    }
    });
  }


// Call the function for each button and specify the question index
handleButtonClick("#q1", 0); // Question 1
handleButtonClick("#q2", 1); // Question 2
handleButtonClick("#q3", 2); // Question 3
handleButtonClick("#q4", 3); // Question 4
handleButtonClick("#q5", 4); // Question 5
handleButtonClick("#q6", 5); // Question 6
handleButtonClick("#q7", 6); // Question 7


// // Working Code for Q1
// const sentences = [
//     "A cozy night in with homemade dinner.", //(Love)
//     "A fancy restaurant with exquisite cuisine.", //(Money)
//     "An adventurous outdoor activity.", //(Balanced)
//     "A cultural event like a museum or theater.", //(Balanced)
//     "A spontaneous road trip to explore new places.", //(Love)
//     "A high-end concert or entertainment event." //(Money)
//   ];
  
//   function randReply() {
//     const index = Math.floor(Math.random() * sentences.length);
//     return sentences[index];
//   }
  
//   let isLeft = true;
  
//   let clickCount =0;

//   $("#q1").click(function(){
//    if(clickCount>=2){
//      return;
//    }
   
//    const question ="Describe your dream vacation.";
//    let newReply=randReply()
   
   
//    $("#output").append('<div class="text-' + (isLeft ? 'left' : 'right') +'"><p>' +(isLeft?question:newReply)+ '</p></div>');
//    $("#output").append('<div style="clear:both;"></div>');
  
//    isLeft=!isLeft;
  
//    clickCount++;

//    if (clickCount ===2) {
//     // Hide the button when clicked twice 
//   $('#q1').hide();
// }
  
//   });