export const builtInTools = {
  calculate: async (input: { expression: string }): Promise<string> => {
    try {
      const result = new Function(`return ${input.expression}`)();
      return `Result: ${result}`;
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },

  processText: async (input: {
    text: string;
    operation: "uppercase" | "lowercase" | "reverse" | "count";
  }): Promise<string> => {
    const { text, operation } = input;
    switch (operation) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "reverse":
        return text.split("").reverse().join("");
      case "count":
        return `Length: ${text.length}, Words: ${text.split(" ").length}`;
      default:
        return "Unknown operation";
    }
  },

  validateData: async (input: {
    data: any;
    type: "email" | "phone" | "url" | "number" | "string";
  }): Promise<string> => {
    const { data, type } = input;
    let isValid = false;

    switch (type) {
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data));
        break;
      case "phone":
        isValid = /^[\d\s\-\+\(\)]+$/.test(String(data)) && String(data).length >= 10;
        break;
      case "url":
        try {
          new URL(String(data));
          isValid = true;
        } catch {
          isValid = false;
        }
        break;
      case "number":
        isValid = !isNaN(Number(data));
        break;
      case "string":
        isValid = typeof data === "string";
        break;
    }

    return `${type}: ${isValid ? "✓ Valid" : "✗ Invalid"}`;
  },

  parseJSON: async (input: { json: string }): Promise<string> => {
    try {
      const parsed = JSON.parse(input.json);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },

  arrayOperation: async (input: {
    array: any[];
    operation: "sum" | "average" | "max" | "min" | "sort" | "unique";
  }): Promise<string> => {
    const { array, operation } = input;
    let result: any;

    switch (operation) {
      case "sum":
        result = array.reduce((a, b) => a + b, 0);
        break;
      case "average":
        result = array.reduce((a, b) => a + b, 0) / array.length;
        break;
      case "max":
        result = Math.max(...array);
        break;
      case "min":
        result = Math.min(...array);
        break;
      case "sort":
        result = [...array].sort();
        break;
      case "unique":
        result = [...new Set(array)];
        break;
      default:
        return "Unknown operation";
    }

    return `Result: ${JSON.stringify(result)}`;
  },

  dateOperation: async (input: {
    operation: "now" | "format" | "add";
    date?: string;
    days?: number;
  }): Promise<string> => {
    const { operation } = input;
    switch (operation) {
      case "now":
        return new Date().toISOString();
      case "format":
        return new Date(input.date || Date.now()).toLocaleString();
      case "add":
        const date = new Date(input.date || Date.now());
        date.setDate(date.getDate() + (input.days || 0));
        return date.toISOString();
      default:
        return "Unknown operation";
    }
  },

  encodeBase64: async (input: { text: string }): Promise<string> => {
    return Buffer.from(input.text).toString("base64");
  },

  decodeBase64: async (input: { encoded: string }): Promise<string> => {
    return Buffer.from(input.encoded, "base64").toString("utf-8");
  },

  stringSearch: async (input: {
    text: string;
    pattern: string;
  }): Promise<string> => {
    const regex = new RegExp(input.pattern, "g");
    const matches = input.text.match(regex);
    return `Found ${matches ? matches.length : 0} matches`;
  },
};

export type BuiltInToolName = keyof typeof builtInTools;
