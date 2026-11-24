const SYS={
bomi:'You are Bomi, a warm, encouraging Korean teacher for English-speaking beginners. Reply in English, under 80 words, and always show Korean with romanization.',
komdori:'You are Komdori, a friendly bear chatting with a Korean beginner. Reply with 1-2 very short, simple Korean sentences, then the English translation in parentheses. Ask a simple question back.'};
module.exports=async(req,res)=>{
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  const gk=process.env.GEMINI_API_KEY,ak=process.env.ANTHROPIC_API_KEY;
  if(!gk&&!ak)return res.status(500).json({error:'No API key set'});
  const b=req.body||{};
  const msgs=(Array.isArray(b.messages)?b.messages:[]).slice(-10).map(m=>({role:m.role==='assistant'?'assistant':'user',content:String(m.content||'').slice(0,500)}));
  while(msgs.length&&msgs[0].role!=='user')msgs.shift();
  if(!msgs.length)return res.status(400).json({error:'No messages'});
  const system=SYS[b.persona]||SYS.bomi;
  try{
    if(gk){
      const model=process.env.GEMINI_MODEL||'gemini-flash-latest';
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',
        headers:{'content-type':'application/json','x-goog-api-key':gk},
        body:JSON.stringify({systemInstruction:{parts:[{text:system}]},
          contents:msgs.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]})),
          generationConfig:{maxOutputTokens:400}})});
      const j=await r.json();
      if(!r.ok)return res.status(502).json({error:'Upstream error'});
      const t=j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts;
      return res.status(200).json({text:(t&&t.map(p=>p.text||'').join(''))||''});
    }
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',
      headers:{'content-type':'application/json','x-api-key':ak,'anthropic-version':'2023-06-01'},
      body:JSON.stringify({model:process.env.CLAUDE_MODEL||'claude-haiku-5-5',max_tokens:300,system,messages:msgs})});
    const j=await r.json();
    if(!r.ok)return res.status(502).json({error:'Upstream error'});
    res.status(200).json({text:(j.content&&j.content[0]&&j.content[0].text)||''});
  }catch(e){res.status(502).json({error:'Request failed'})}
};
