import { MagnusOpusEngine } from './magnus_opus_engine.js';
import { ReasoningKernel } from './reasoning_kernel.js';
import { KnowledgeRouter } from './knowledge_router.js';

// Initialize the Sovereign Trinity
const router = new KnowledgeRouter({ 
  corporaIndex: { fetch: (hints) => `Axioms for ${hints.join(", ")}` } 
});
const kernel = new ReasoningKernel({ maxDepth: 5 });
const engine = new MagnusOpusEngine({ 
  knowledgeRouter: router, 
  reasoningKernel: kernel,
  evaluators: { 
    assess: async (draft) => ({ refined_answer: draft.answer, diagnostics: "Passed logic gate." }) 
  }
});

console.log(":: MAGNUS OPUS: SOVEREIGN ENGINE AWAKENED ::");

// Link to the Global Interface
window.Magnus = engine;
