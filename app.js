const defaults={
  services:[
    ["01","Moda & Vestuário","Camisetas, bonés, calças e acessórios africanos, com personalização disponível."],
    ["02","Comércio Geral","Produtos nacionais e importados, revenda e distribuição."],
    ["03","Personalização","Serigrafia, bordados, uniformes e soluções personalizadas para empresas."],
    ["04","Marketing & Branding","Gestão de redes sociais, identidade visual, conteúdos e campanhas."],
    ["05","Eventos & Cultura","Feiras, exposições, eventos promocionais e iniciativas de impacto cultural."]
  ],
  vision:"Ser uma marca moçambicana de referência em multisserviços, reconhecida pela qualidade, diversidade de soluções, identidade africana e impacto positivo no mercado local e regional.",
  mission:"Oferecer produtos e serviços diversificados, acessíveis e personalizados, promovendo a cultura africana, inovação comercial e desenvolvimento sustentável de parcerias e comunidades."
};
function getData(){try{return {...defaults,...JSON.parse(localStorage.getItem("gtcData")||"{}")}}catch(e){return defaults}}
const data=getData();
document.getElementById("vision").textContent=data.vision;
document.getElementById("mission").textContent=data.mission;
const grid=document.getElementById("serviceGrid");
grid.innerHTML=data.services.map(s=>`<article class="service"><div class="num">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("");
document.getElementById("year").textContent=new Date().getFullYear();

const translations={
  pt:{navHome:"Início",navAbout:"Sobre",navServices:"Serviços",navStrategy:"Estratégia",navGallery:"Galeria",navContact:"Contactos",seeServices:"Ver serviços"},
  en:{navHome:"Home",navAbout:"About",navServices:"Services",navStrategy:"Strategy",navGallery:"Gallery",navContact:"Contact",seeServices:"View services"}
};
let lang=localStorage.getItem("gtcLang")||"pt";
function setLang(){
 document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=translations[lang][el.dataset.i18n]});
 document.getElementById("langBtn").textContent=lang==="pt"?"EN":"PT";
 document.documentElement.lang=lang;
}
document.getElementById("langBtn").onclick=()=>{lang=lang==="pt"?"en":"pt";localStorage.setItem("gtcLang",lang);setLang()};
setLang();

document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));

const box=document.getElementById("chatbox"), messages=document.getElementById("chatMessages");
document.getElementById("chatToggle").onclick=()=>box.classList.toggle("open");
document.getElementById("chatClose").onclick=()=>box.classList.remove("open");
function botReply(q){
 const x=q.toLowerCase();
 if(x.includes("serv")||x.includes("produto")||x.includes("moda")) return "A GTC trabalha com Moda & Vestuário, Comércio Geral, Personalização, Marketing & Branding e Eventos & Cultura. Para um orçamento, fale connosco pelo WhatsApp.";
 if(x.includes("contact")||x.includes("whats")||x.includes("telefone")||x.includes("email")) return "Pode contactar +258 84 436 9660 ou +258 86 516 3310 no WhatsApp, ou enviar e-mail para gercumbane20@gmail.com.";
 if(x.includes("empresa")||x.includes("gtc")||x.includes("sobre")) return "A GTC African Style – Multiservice é uma iniciativa moçambicana com foco em identidade africana, inovação comercial, qualidade e soluções multiservice.";
 if(x.includes("preço")||x.includes("preco")||x.includes("orçamento")||x.includes("orcamento")) return "Os preços dependem do produto ou serviço e da quantidade. Envie os detalhes pelo WhatsApp para receber uma cotação.";
 if(x.includes("local")||x.includes("maputo")) return "A GTC está sediada em Maputo, Moçambique, com visão de expansão nacional e regional.";
 return "Posso ajudar com serviços, produtos, contactos, localização e pedidos de orçamento. Experimente perguntar: “Que serviços oferecem?”";
}
function addMsg(text,type){const d=document.createElement("div");d.className=type;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
document.getElementById("chatForm").onsubmit=e=>{e.preventDefault();const input=document.getElementById("chatInput");const q=input.value.trim();if(!q)return;addMsg(q,"user");input.value="";setTimeout(()=>addMsg(botReply(q),"bot"),250)};
document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>{const q=b.dataset.q;addMsg(q==="servicos"?"Quais serviços oferecem?":q==="contacto"?"Como posso contactar a GTC?":"Fale-me sobre a empresa.", "user");setTimeout(()=>addMsg(botReply(q),"bot"),250)});
