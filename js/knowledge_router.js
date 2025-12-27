/**
 * KNOWLEDGE ROUTER (v2.7) // THE SOVEREIGN FORGE
 * Logic: Query Detection -> Domain Mapping -> Document Retrieval
 */
export class KnowledgeRouter {
  constructor({ corporaIndex }) {
    this.corporaIndex = corporaIndex;
  }

  async route(query, context) {
    console.log(":: ROUTER: DETECTING KNOWLEDGE DOMAINS ::");
    const domainHints = this.detectDomains(query, context);
    
    // In production, this links to the corpora files we created earlier
    const relevantDocs = this.corporaIndex ? this.corporaIndex.fetch(domainHints) : [];
    
    return { domainHints, relevantDocs };
  }

  detectDomains(query, context) {
    const hints = [];

    if (/architecture|system|protocol|stack/i.test(query)) {
      hints.push("systems_architecture");
    }
    if (/mythic|sovereign|citadel|vault/i.test(query)) {
      hints.push("mythic_frameworks");
    }
    if (/ux|cinematic|visual/i.test(query)) {
      hints.push("ux_cinematics");
    }

    return [...new Set(hints)];
  }
}
