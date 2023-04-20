const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: "org-N33acOxlQdsFdAJ7CqkX43SX",
  apiKey: process.env.openAI_API,
});

const openai = new OpenAIApi(configuration);

var openAiConfig = {
  model: "text-davinci-003",
  max_tokens: 100,
  temperature: 0.5,
  n: 1,
};

async function getResponse(Question) {
  const ans = await openai.createCompletion({
    prompt: Question,
    ...openAiConfig,
  });

  var separateLines = ans.data.choices[0].text.split(/\r?\n|\r|\n/g);

  return separateLines;
}

async function askGPT(question) {
  //   if (isRelevant == 0) {
  //     return "This question is not related to customer service";
  //   } else if (isRelevant == 1) {
  //     return "This question is related to customer service";
  //   }

  const response = await getResponse(question);

  // const answer = await getHints(question);
  //Here answer is an array containing hints at index = 2,4,and 6
  return response;
}
// default export askGPT;

export default askGPT;
