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
  CombineDocumentsChain,
  utils,
  FileLoader,
  prompts,
  LLMChain,
  SentenceTextSplitter,
} from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

export default async function run() {
  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);
  let docs = await loader.load();

  const openai = new OpenAI(apiKey);

  const summarizeChain = new LLMChain(prompts.summarize(), openai, {
    model: "text-davinci-003",
    max_tokens: 500,
  });

  const combineDocumentsChain = new CombineDocumentsChain(
    new SentenceTextSplitter(),
    utils.mergeDocumentsWithSeparator("\n\n"),
    summarizeChain
  );

  const result = await combineDocumentsChain.run(docs, {
    chunk: true,
    chunkSize: 100,
  });

  console.log("result", result);
}