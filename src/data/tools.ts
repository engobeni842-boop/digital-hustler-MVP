import type React from 'react';
import {
  FileText,
  Image,
  Video,
  Code,
  Music,
  Briefcase,
  BookOpen,
  MessageSquare,
  Globe,
  Calculator,
  TrendingUp,
  ShieldCheck,
  WandSparkles,
} from 'lucide-react';

export type ToolType = 'text' | 'image' | 'video';
export type UserPlan = 'trial' | 'premium';

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  type: ToolType;
  credits: number;
  sponsored?: boolean;
  trending?: boolean;
  premium?: boolean;
}

export const trialDaysByLocation = {
  southAfrica: 30,
  international: 3,
};

export const categories = [
  'All',
  'Writing',
  'Visual',
  'Development',
  'Audio',
  'Business',
  'Education',
  'Communication',
  'Language',
  'Trading',
  'Security',
];

export const aiTools: AITool[] = [
  {
    id: 'ai-writer',
    name: 'AI Writer',
    description: 'Generate articles, blogs, captions, and content.',
    icon: FileText,
    category: 'Writing',
    type: 'text',
    credits: 1,
  },
  {
    id: 'image-generator',
    name: 'Image Generator',
    description: 'Create AI images, mockups, posters, and concepts.',
    icon: Image,
    category: 'Visual',
    type: 'image',
    credits: 1,
    sponsored: true,
  },
  {
    id: 'video-creator',
    name: 'Video Creator',
    description: 'Generate AI-powered short video ideas and scripts.',
    icon: Video,
    category: 'Visual',
    type: 'video',
    credits: 5,
    sponsored: true,
    premium: true,
  },
  {
    id: 'code-assistant',
    name: 'Code Assistant',
    description: 'Write, debug, and explain code with AI.',
    icon: Code,
    category: 'Development',
    type: 'text',
    credits: 1,
  },
  {
    id: 'music-composer',
    name: 'Music Composer',
    description: 'Create song ideas, hooks, lyrics, and music concepts.',
    icon: Music,
    category: 'Audio',
    type: 'text',
    credits: 1,
  },
  {
    id: 'business-planner',
    name: 'Business Planner',
    description: 'Generate business plans, strategies, and monetization ideas.',
    icon: Briefcase,
    category: 'Business',
    type: 'text',
    credits: 1,
  },
  {
    id: 'tutor-ai',
    name: 'Tutor AI',
    description:
      'Learn topics, summarize notes, and explain difficult concepts.',
    icon: BookOpen,
    category: 'Education',
    type: 'text',
    credits: 1,
  },
  {
    id: 'chat-assistant',
    name: 'Chat Assistant',
    description: 'Generate replies, messages, and conversation ideas.',
    icon: MessageSquare,
    category: 'Communication',
    type: 'text',
    credits: 1,
  },
  {
    id: 'translator',
    name: 'Translator',
    description: 'Translate and rewrite text for different languages.',
    icon: Globe,
    category: 'Language',
    type: 'text',
    credits: 1,
  },
  {
    id: 'math-solver',
    name: 'Math Solver',
    description: 'Solve math problems and explain calculations.',
    icon: Calculator,
    category: 'Education',
    type: 'text',
    credits: 1,
  },
  {
    id: 'trending-scanner',
    name: 'Trending Scanner',
    description:
      'Find trending digital products, AI tools, and online hustles.',
    icon: TrendingUp,
    category: 'Trading',
    type: 'text',
    credits: 2,
    trending: true,
    premium: true,
  },
  {
    id: 'security-watch',
    name: 'Security Watch',
    description: 'Future app safety scanner for suspicious updates and risks.',
    icon: ShieldCheck,
    category: 'Security',
    type: 'text',
    credits: 2,
    premium: true,
  },
  {
    id: 'prompt-builder',
    name: 'Prompt Builder',
    description: 'Turn weak ideas into strong AI prompts.',
    icon: WandSparkles,
    category: 'Writing',
    type: 'text',
    credits: 1,
    trending: true,
  },
];

export function getCreditCost(
  tool: AITool,
  videoDuration: '1min' | '2min' = '1min'
): number {
  if (tool.type === 'video') {
    return videoDuration === '2min' ? 9 : 5;
  }

  return tool.credits;
}

export function canUseTool(tool: AITool, plan: UserPlan): boolean {
  if (!tool.premium) return true;
  return plan === 'premium';
}

export function filterTools(
  tools: AITool[],
  searchQuery: string,
  selectedCategory: string
): AITool[] {
  return tools.filter((tool) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      tool.name.toLowerCase().includes(search) ||
      tool.description.toLowerCase().includes(search) ||
      tool.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

export function generateFakeResult(
  tool: AITool,
  prompt: string,
  creditsUsed: number
): string {
  return `✅ ${tool.name} completed successfully.

Prompt:
"${prompt}"

Result:
This is a demo output for ${tool.name}. Real AI API connection will be added later.

Credits used: ${creditsUsed}`;
}
export const tools = aiTools;
