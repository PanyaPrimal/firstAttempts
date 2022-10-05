
function downloadJson(json) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(json);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'result.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

const input = document.querySelector('#file');
input.addEventListener('change', function(event){
    var reader = new FileReader();
    reader.onload = event => handleConfig(event.target.result);
    reader.readAsText(event.target.files[0]);

});

function handleConfig(json) {
    const service = new Questionnaire(json);
    service.proceedQuestion();
}

class Questionnaire {
    constructor(json) {
        this.questionElement = document.querySelector('#question');

        this.answersElement = document.querySelector('#answers');
        this.submitElement = document.querySelector('#submit-button');
        this.submitElement.addEventListener('click', this.setAnswer.bind(this));
        this.currentQuestion = null;
        this.questions = JSON.parse(json);
    }
  

    proceedQuestion() {
        document.querySelector('.questionnaire').style.display = 'block';
        document.querySelector('.json-uploader').style.display = 'none';
//        console.log('questions1', JSON.parse(JSON.stringify(this.questions)));
        this.askQuestion(this.questions.question, JSON.parse(JSON.stringify(this.questions.answers)));
//        console.log('question2', structuredClone(this.questions));
        this.currentQuestion = JSON.parse(JSON.stringify(this.questions));
//        console.log('currentQuestion1', {...this.currentQuestion});
    } 

    askQuestion(value, answers) {
        this.questionElement.innerText = value;
        answers.forEach(el => {
            let option = document.createElement('option');
            option.value = el.value;
            option.innerText = el.value;
            this.answersElement.appendChild(option);
        });
    }

    setAnswer() {
//        console.log('trigger');
        const answer = this
            .currentQuestion
            .answers
            .find(item => item.value === this.answersElement.value);
            console.log('currentQuestion', this.currentQuestion);
            console.log('answer', answer);
        if(!answer.question) {
            return this.downloadQuestionnairePaths();
        } 
        this.questionElement.innerText = '';
        this.answersElement.innerHTML = '';
        this.currentQuestion = answer;
        this.askQuestion(answer.question, answer.answers);
    }

    downloadQuestionnairePaths() {
        let structure = [{mainQuestion: this.questions.question}];
        const answersHandler = (answers, question, index) => {
            structure[index] = answers.reduce(
                (previousValue, current) => ({...previousValue, [question]: current.value}), 
                {}
            )
            answers.forEach(answer => {
                if(answer.answers) {
                    answersHandler(answer.answers, answer.question, index+1)
                }
            });
        };
        answersHandler(this.questions.answers, this.questions.question, 1);
        console.log(structure);
    }
}
