const {chromium}=require('playwright');
const {PDFDocument}=require('pdf-lib');
const fs=require('node:fs/promises');
const crypto=require('node:crypto');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1400,height:1100},timezoneId:'Europe/Zurich'});
 await page.goto('http://127.0.0.1:8080/mittag.html',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const dates=await page.evaluate(()=>Array.from({length:5},(_,n)=>iso(add(monday(zurichToday()),7*n))));
 const entries=[];await fs.mkdir('pdf-bibliothek',{recursive:true});
 for(const date of dates){
  await page.goto('http://127.0.0.1:8080/mittag.html?woche='+date,{waitUntil:'networkidle'});
  const base64=await page.evaluate(async()=>{await document.fonts.ready;await pdfLogoMask.decode();const blob=await createPdf('screen');return await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.readAsDataURL(blob)})});
  const data=Buffer.from(base64,'base64');const pdf=await PDFDocument.load(data);
  if(pdf.getPageCount()!==1||data.length<10000)throw Error('Invalid PDF '+date);
  const hash=crypto.createHash('sha256').update(data).digest('hex').slice(0,12);
  const file=`Wochenplan-${date}-${hash}.pdf`;await fs.writeFile('pdf-bibliothek/'+file,data);
  await page.screenshot({path:'pdf-bibliothek/check-'+date+'.png',fullPage:true});
  entries.push({week:date,file,bytes:data.length});
 }
 await fs.writeFile('pdf-bibliothek/index.json',JSON.stringify({generatedAt:new Date().toISOString(),weeks:entries},null,2));
 const links=entries.map(e=>`<li><a href="${e.file}">Wochenplan ab ${e.week}</a></li>`).join('');
 await fs.writeFile('pdf-bibliothek/index.html',`<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Wochenplan-Bibliothek</title><body style="background:#141414;color:#f6d77e;font:18px Arial;padding:24px"><h1>Wochenplan-Bibliothek</h1><ul>${links}</ul><a href="../index.html">Zum Webshop</a><style>a{color:#f6d77e}li{margin:20px 0}</style></body></html>`);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
