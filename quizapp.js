const questions=[
    {
        question:'Which is the largest animal in the world?',
        answers:[
            {text:'Shark',correct:false},
            {text:'blue whale',correct:true},
            {text:'elephant',correct:false},
            {text:'giraffe',correct:false},
        ]
    },
    {
        question:'which is the smallest country in the world?',
        answers:[
            {text:'vatican city',correct:true},
            {text:'bhutan',correct:false},
            {text:'nepal',correct:false},
            {text:'shri lanka',correct:false},
        ]
    },
    {
        question:'Which is the largest desert in the world?',
        answers:[
            {text:'kalahari',correct:false},
            {text:'gobi',correct:false},
            {text:'sahara',correct:true},
            {text:'antartica',correct:false},
        ]
    },
    {
        question:'which is the smallest continent in the world?',
        answers:[
            {text:'asia',correct:false},
            {text:'australia',correct:true},
            {text:'arctic',correct:false},
            {text:'africa',correct:false},
        ]
    }
];

const questionelement=document.getElementById('question');
const answerbutton=document.getElementById('answer-buttons');
const nextbutton=document.getElementById('next-btn');

let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML='next';
    showqestions();
}


function showqestions(){
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionno=currentquestionindex+1;
    questionelement.innerHTML=questionno+'. '+currentquestion.question;


    currentquestion.answers.forEach(answers=>{
        const button=document.createElement('button');
        button.innerHTML=answers.text;
        button.classList.add('btn');
        answerbutton.appendChild(button);
        if(answerbutton.correct){
            button.dataset.correct=answers.correct;
        }
        button.addEventListener('click',selectanswer);
    })
}

function resetstate(){
    nextbutton.style.display='none';
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==='true';
    if(iscorrect){
        selectedbtn.classList.add('correct');
        score++;
    }
    else{
        selectedbtn.classList.add('incorrect');
    }
    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });
    nextbutton.style.display='block';

}

function showscore(){
    resetstate(); 
    questionelement.innerHTML=`you scored${score} out of ${questions.length}!`;
    nextbutton.innerHTML='play again';
    nextbutton.style.display='block';
}

function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showqestions()
    }else{
        showscore();
    }
}
nextbutton.addEventListener('click',()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }else{
        startquiz();
    }
})
startquiz()