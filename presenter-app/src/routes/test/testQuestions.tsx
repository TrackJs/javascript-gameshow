import { h, Component, ComponentChild } from 'preact';
import { QuestionController } from 'src/controllers/QuestionController';
import AskQuestion from 'src/components/askQuestion';
import { Game } from 'src/controllers/GameController';

export default class TestQuestions extends Component<any, any> {

  render(): ComponentChild {
    let questions = new QuestionController()._questionMap;

    return (
      <div class="route-test-questions">
        {questions.map(question => {
          let isComplete = false;
          return (
            <div class="ask-question-wrap" style="margin: 20px 0">
              <AskQuestion game={{} as Game} question={question} showAnswers={true} onResult={(isCorrect) => console.log(`result: ${isCorrect}`)} />
            </div>
          );
        })}
      </div>
    );
  }


}
