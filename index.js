const Alexa = require('ask-sdk-core');

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};

// LaunchRequest(特に指定がない)に関する記述
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'LaunchRequestだよ';

    return handlerInput.responseBuilder
      .speak(speechText)  // 音声応答内容
      .reprompt(speechText)
      .withSimpleCard('ハローワールド', speechText)
      .addDirective({
        type : 'Alexa.Presentation.APL.RenderDocument',
        version: '1.1',
        token: "token",
        document: require('./HelloAPL.json'),
        datasources: {
          "headlineExampleData": {
            "type": "object",
            "backgroundImage": "https://d2o906d8ln7ui1.cloudfront.net/images/BT6_Background.png",
            "logoUrl": "https://d2o906d9ln7ui1.cloudfront.net/images/cheeseskillicon.png",
            "textContent": {
                "primaryText": "Hello, APL",
                "secondaryText": "初めての画面付きスキルです"
            },
            "properties": {
                "hintText": "ハローワールドと言ってみて"
            },
            "transformers": [
                {
                    "inputPath": "hintText",
                    "transformer": "textToHint"
                }
            ]
          }
        }
      })
      .getResponse();
  }
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'HelloWorldIntentだよ！！！！';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('ハローワールド', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'こんにちは、と言ってみてください。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('ハローワールド', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'さようなら';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('ハローワールド', speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //クリーンアップロジックをここに追加します
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`処理されたエラー： ${error.message}`);

    return handlerInput.responseBuilder
      .speak('すみません。コマンドを理解できませんでした。もう一度お願いします。')
      .reprompt('すみません。コマンドを理解できませんでした。もう一度お願いします。')
      .getResponse();
  },
};



