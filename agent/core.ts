import Anthropic from "@anthropic-ai/sdk";

interface Tool {
  name: string;
  description: string;
  input_schema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentConfig {
  model?: string;
  maxIterations?: number;
  temperature?: number;
  systemPrompt?: string;
}

class UniversalAgent {
  private client: Anthropic;
  private tools: Map<string, Function>;
  private conversationHistory: Message[];
  private config: Required<AgentConfig>;

  constructor(config: AgentConfig = {}) {
    this.client = new Anthropic();
    this.tools = new Map();
    this.conversationHistory = [];
    this.config = {
      model: config.model || "claude-3-5-sonnet-20241022",
      maxIterations: config.maxIterations || 10,
      temperature: config.temperature || 0.7,
      systemPrompt:
        config.systemPrompt ||
        `You are a highly capable AI agent that can help with a wide variety of tasks.`,
    };
  }

  registerTool(name: string, handler: Function, description: string, inputSchema: any): void {
    this.tools.set(name, handler);
    console.log(`✓ Tool registered: ${name}`);
  }

  async execute(userMessage: string): Promise<string> {
    this.conversationHistory.push({ role: "user", content: userMessage });

    try {
      const messages = this.conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const apiResponse = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 4096,
        temperature: this.config.temperature,
        system: this.config.systemPrompt,
        messages: messages as any,
      });

      const assistantMessage =
        apiResponse.content[0].type === "text" ? apiResponse.content[0].text : "";

      this.conversationHistory.push({ role: "assistant", content: assistantMessage });
      return assistantMessage;
    } catch (error) {
      throw new Error(`API call failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }

  getHistory(): Message[] {
    return [...this.conversationHistory];
  }
}

export { UniversalAgent, AgentConfig, Tool };
