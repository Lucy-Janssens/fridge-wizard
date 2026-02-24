import { Recipe, FormData } from './types';

const API_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function generateRecipe(
  apiKey: string,
  imageBase64: string,
  formData: FormData
): Promise<Recipe> {
  const prompt = `You are a creative home cooking assistant. Look at this fridge photo and create a recipe using what you see.

Additional context:
- Eggs: ${formData.hasEggs === 'unknown' ? 'check photo' : formData.hasEggs}
- Pasta/Rice available: ${formData.hasStarch === 'unknown' ? 'check photo' : formData.hasStarch}
- Dietary restrictions: ${formData.dietary}
- Time limit: ${formData.timeLimit} minutes
- Extra notes: ${formData.extras || 'none'}

Create a recipe that:
1. Uses ingredients visible in the photo
2. Can be made in ${formData.timeLimit} minutes or less
3. Respects dietary restrictions
4. Is realistic for a home cook

Respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "title": "Recipe name (creative/fun)",
  "time": "X minutes",
  "difficulty": "Easy/Medium/Hard",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["Step 1", "Step 2", ...],
  "tips": "A helpful tip or variation"
}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'pixtral-12b-2409',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageBase64 } },
          ],
        },
      ],
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error?.message || 'API error');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = content.match(/```json\s*([\s\S]*?)```/) || 
                    content.match(/```\s*([\s\S]*?)```/) ||
                    content.match(/\{[\s\S]*\}/);
  
  const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
  const recipe: Recipe = JSON.parse(jsonStr.trim());

  return recipe;
}
