const fs = require('fs');
const path = 'C:\\\\Users\\\\harsh\\\\.gemini\\\\antigravity-ide\\\\brain\\\\c1d8bbeb-92fb-447c-9868-f80eaf9515a4\\\\.system_generated\\\\logs\\\\transcript.jsonl';
try {
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  const lastInput = lines.reverse().find(l => {
    if (!l) return false;
    try {
      const parsed = JSON.parse(l);
      return parsed.type === 'USER_INPUT' && parsed.content && parsed.content.includes('in current curebharat suraksha template t&c');
    } catch(e) { return false; }
  });
  if (lastInput) {
    fs.writeFileSync('C:\\\\Users\\\\harsh\\\\Documents\\\\curebharat-crm\\\\user_text.txt', JSON.parse(lastInput).content);
    console.log("Written to user_text.txt");
  } else {
    console.log("Not found.");
  }
} catch(e) {
  console.error(e);
}
