//const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { AzureOpenAI } = require("openai");
const logger = require("../libs/logger");
const { config } = require("dotenv");
// Load environment variables
config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint url>>";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "api_key";
const apiVersion = "2024-02-01";
const deployment = "gpt-35-turbo"; // (version:2024-07-18). The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.


const inferAIVitalsSvc = async (vitals) => {
  try {
    logger.info(JSON.stringify(vitals));
    console.log("== Get completions Sample ==");
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
    const result = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a assistant" },
        { role: "user", content: "Predict my health with these vitals - "+JSON.stringify(vitals) },
        { role: "assistant", content: "Yes, let me check?" },
        { role: "user", content: "Do I need any preventive measures?" },
      ],
      model: "",
    });
    let inferences = "AI seems to be not responding or timing out. Please try again later.";
    for (const choice of result.choices) {
      inferences = choice.message.content;
      logger.info(choice.message);
    }
    return ({
      success: true,
      message: "Vitals Inferred - " + inferences
    });
  } catch (error) {
    logger.error(JSON.parse(error));
    return ({
      success: false,
      message: "Error in Infering Vitals",
    });
  }
};

module.exports = {
  inferAIVitalsSvc,
};
