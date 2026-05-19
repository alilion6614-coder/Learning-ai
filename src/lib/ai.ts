export async function chatWithAI(messages: { role: string; content: string }[]) {
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    return await response.json();
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}

export async function generateNotes(content: string) {
  const messages = [
    { role: "system", content: "You are an expert at creating structured, comprehensive learning notes from any input text. Use Markdown." },
    { role: "user", content: `Please generate detailed notes for the following content: ${content}` }
  ];
  return chatWithAI(messages);
}

export async function generateFlashcards(content: string) {
  const messages = [
    { role: "system", content: "You are an expert at creating effective flashcards. Return a JSON array of objects with 'question' and 'answer' keys. Format: [{\"question\": \"...\", \"answer\": \"...\"}]" },
    { role: "user", content: `Please create flashcards based on this content: ${content}` }
  ];
  const response = await chatWithAI(messages);
  // Extract JSON from response (handling potential markdown wrapping)
  const text = response.choices?.[0]?.message?.content || "";
  try {
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("Flashcard recovery failed:", e);
  }
  return [];
}
