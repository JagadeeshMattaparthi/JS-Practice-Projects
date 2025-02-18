const questionEl= document.getElementById("question");
const questionFormEl=document.getElementById("questionForm");
const scoreEl=document.getElementById("score");
let storedAnswer;
//let score=localStorage.getItem("score");
let score=0;
const randomNumber=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
};

const generateQuestion=()=>{
    const randomNumber1=randomNumber(1,10);
    const randomNumber2=randomNumber(1,10);
    const questionType=randomNumber(1,4);

    let firstNum;
    let secondNum;

    if(randomNumber1>randomNumber2 && questionType>2){
        firstNum=randomNumber1;
        secondNum=randomNumber2;
    }else{
        firstNum=randomNumber2;
        secondNum=randomNumber1;
    }

    let question;
    let answer;

    switch(questionType){
        case 1:
            question=`Q. what is ${firstNum} multiply by ${secondNum}?`;
            answer=firstNum*secondNum;
            break;
        case 2:
            question=`Q. what is ${firstNum} Add to ${secondNum}?`;
            answer=firstNum+secondNum;
            break;
        case 3:
            question=`Q. what is ${secondNum} subtract from ${firstNum}?`;
            answer=firstNum-secondNum;
            break;
        // case 4:
        //     question=`Q. what is ${firstNum} divide by ${secondNum}?`;
        //     answer=firstNum/secondNum;
        //     break;
        default:
            question=`Q. what is ${firstNum} multiply by ${secondNum}?`;
            answer=firstNum*secondNum;
            break;
    }
    return{question, answer};
};
const showQuestion=()=>{
    const{question, answer}=generateQuestion();
    questionEl.innerText=question;
    scoreEl.innerText=score;
    storedAnswer=answer;
};
showQuestion();

const checkAnswer=(event)=>{
    event.preventDefault();
    const formData=new FormData(questionFormEl);

    const userAnswer= +formData.get("answer");
    if(userAnswer===storedAnswer){
        score +=1;
        Toastify({
            text: `Your are right and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
    }else{
        score -=1;
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e33217, #ff001e)",
            },
          }).showToast();
    }
    scoreEl.innerText=score;
    localStorage.setItem("score",score);
    event.target.reset();
    showQuestion();
    console.log("answer",userAnswer);
};

