/** 
Chains are pre-built workflows for executing specific tasks.
The simplest chain is the LLMChain, a chain which combines a prompt and a model provider.
This example uses LLMChain to use the OpenAI Completions API to generate a poem about the moon.

This example also uses tracing to log the steps of the chain. 
Chains often have many steps, and tracing can help you understand what is happening in your chain.
**/
import dotenv from "dotenv";
dotenv.config();
import {
  OpenAI,
  utils,
  FileLoader,
  promptTemplates,
  SentenceTextSplitter,
  PromptTemplate,
} from "@promptable/promptable";
import chalk from "chalk";
import { CombineDocumentsChain, LLMChain, QAChain } from "./chains";

const apiKey = process.env.OPENAI_API_KEY || "";

export default async function run() {
  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);
  let docs = await loader.load();

  const openai = new OpenAI(apiKey);

  const pt = new PromptTemplate("{{data}}");

  // Summarize each document
  const summarizeChain = new LLMChain(promptTemplates.Summarize, openai, {
    model: "text-davinci-003",
    max_tokens: 500,
  } as any);

  // Combine documents into a single document
  const combineDocumentsChain = new CombineDocumentsChain(
    new SentenceTextSplitter(),
    utils.mergeDocumentsWithSeparator("\n\n"),
    summarizeChain
  );

  // Ask a question about the combined document
  const answerQuestionChain = new LLMChain(promptTemplates.QA, openai, {
    model: "text-davinci-003",
    max_tokens: 2000,
  } as any);

  const qaChain = new QAChain(docs, combineDocumentsChain, answerQuestionChain);

  const response = await qaChain.run(
    "What is the most common startup mistake founders make?"
  );

  console.log(chalk.greenBright("Response: ", response));
}
