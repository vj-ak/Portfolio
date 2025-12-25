import mistakesToStrengths from './posts/mistakes-to-strengths.json';
import hostingerDeploy from './posts/hostinger-deploy.json';
import orchestratingIntelligence from './posts/orchestrating-intelligence.json';

export const blogPosts = [
    hostingerDeploy,
    mistakesToStrengths,
    orchestratingIntelligence
].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
