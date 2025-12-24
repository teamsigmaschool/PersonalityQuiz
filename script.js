const API_KEY =
  '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';
const hobbyInput = document.getElementById('hobby');
const characterInput = document.getElementById('character');
const colorInput = document.getElementById('color');
const resultDiv = document.getElementById('result');

async function getPersonality() {
  // Get user's answers
  const favHobby = hobbyInput.value;
  const leastFavCharacter = characterInput.value;
  const favColor = colorInput.value;

  // Ask OpenAI for the users personality
  resultDiv.innerHTML = 'Loading...';
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `You are a personality quiz engine based on a deck of cards. Based only on the answers below, assign ONE personality: - Suit: Hearts, Diamonds, Clubs, or Spades - Type: Ace, King, Queen, Jack, or Joker Answers: Favorite color: ${favColor} Favorite hobby: ${favHobby} Least favorite character: ${leastFavCharacter} Give: 1) The final card (e.g. "Queen of Hearts") 2) A brief 2–3 sentence explanation Rules: - Be decisive (no multiple options) - Keep it short - Output plain text only - No formatting, no lists, no emojis`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const personalityMessage = response.data.choices[0].message.content;

  // Display the users personality in the screen
  resultDiv.innerHTML = personalityMessage;
}
