export interface AIResponseOptions {
  conversationHistory?: Array<{ sender: 'user' | 'assistant'; text: string }>;
  context?: string;
}

// Paste your Colab ngrok URL here (keep /api/chat at the end)
const API_URL = "https://gratitude-answering-obtuse.ngrok-free.dev/api/chat";

export async function getAIResponse(
  message: string,
  _options?: AIResponseOptions
): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("MedGemma backend error:", error);
    return "Unable to reach the medical assistant server right now. Please make sure the Google Colab notebook is running and the ngrok URL is up to date.";
  }
}