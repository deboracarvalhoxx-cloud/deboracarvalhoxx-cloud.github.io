const produtos = [
  {id:1,nome:"Blusa Básica",preco:79.90,categoria:"Roupas",icone:"👚"},
  {id:2,nome:"Calça Alfaiataria",preco:149.90,categoria:"Roupas",icone:"👖"},
  {id:3,nome:"Vestido Midi",preco:139.90,categoria:"Roupas",icone:"👗"},
  {id:4,nome:"Blazer Alongado",preco:179.90,categoria:"Roupas",icone:"🧥"},
  {id:5,nome:"Tênis Casual",preco:159.90,categoria:"Calçados",icone:"👟"},
  {id:6,nome:"Bolsa Estruturada",preco:129.90,categoria:"Acessórios",icone:"👜"},
  {id:7,nome:"Óculos Fashion",preco:89.90,categoria:"Acessórios",icone:"🕶️"},
  {id:8,nome:"Conjunto Elegante",preco:189.90,categoria:"Roupas",icone:"✨"}
];

let filtro = "Todos";
let carrinho = [];

function dinheiro(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});}

function renderProdutos(){
  const busca = (document.getElementById("busca").value || "").toLowerCase();
  const lista = produtos.filter(p =>
    (filtro==="Todos" || p.categoria===filtro) &&
    p.nome.toLowerCase().includes(busca)
  );
  document.getElementById("filtroAtual").textContent = filtro==="Todos" ? "" : "Categoria: "+filtro;
  document.getElementById("products").innerHTML = lista.map(p => `
    <article class="product">
      <div class="product-img">${p.icone}</div>
      <div class="product-info">
        <h3>${p.nome}</h3>
        <div class="price">${dinheiro(p.preco)}</div>
        <button class="buy" onclick="adicionar(${p.id})">Comprar pelo WhatsApp</button>
      </div>
    </article>
  `).join("");
}

function filtrar(cat){
  filtro=cat;
  renderProdutos();
}

function adicionar(id){
  const p=produtos.find(x=>x.id===id);
  carrinho.push(p);
  abrirWhatsApp(p.nome);
}

function abrirWhatsApp(produto=""){
  const numero="5500000000000"; // TROCAR pelo WhatsApp da loja
  const texto=produto
    ? `Olá! Vi o produto "${produto}" no site da UZE DEBS e gostaria de saber mais.`
    : `Olá! Vim pelo site da UZE DEBS e gostaria de conhecer os produtos.`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,"_blank");
}

function abrirCarrinho(){
  const modal=document.getElementById("cartModal");
  const box=document.getElementById("cartItems");
  if(!carrinho.length){
    box.innerHTML="<p>Seu carrinho está vazio.</p>";
  }else{
    box.innerHTML=carrinho.map((p,i)=>`<div class="cart-row"><span>${p.nome}</span><span>${dinheiro(p.preco)}</span></div>`).join("");
  }
  document.getElementById("cartTotal").textContent=carrinho.length
    ? "Total: "+dinheiro(carrinho.reduce((s,p)=>s+p.preco,0))
    : "";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}
function fecharCarrinho(){
  document.getElementById("cartModal").classList.remove("open");
  document.getElementById("cartModal").setAttribute("aria-hidden","true");
}
function finalizarPedido(){
  if(!carrinho.length){abrirWhatsApp();return;}
  const itens=carrinho.map(p=>`• ${p.nome} — ${dinheiro(p.preco)}`).join("\n");
  const total=dinheiro(carrinho.reduce((s,p)=>s+p.preco,0));
  const texto=`Olá! Quero fazer um pedido na UZE DEBS:\n${itens}\nTotal: ${total}`;
  window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(texto)}`,"_blank");
}
renderProdutos();
