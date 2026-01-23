const chatBody = document.querySelector('.chat-body');
const userInput = document.querySelector('.chat-footer input');
const sendBtn = document.querySelector('.chat-footer button');

function addMessage(sender, html) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.innerHTML = html;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Mensagem inicial
const chatDescription = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Lato:wght@400;700&display=swap');
        
        .message {
            font-family: 'Lato', quicksand;
            font-size: 15px;
        }
        strong {
            font-family: 'ubuntu', montserrat, sans-serif;
        }
        .tour-btn {
            background: linear-gradient(to right, #005c99, #009933);
            border: none;
            border-radius: 20px;
            color: white;
            padding: 10px 20px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        .tour-btn:hover {
            transform: scale(1.05);
        }
        .tour-point {
            display: block;
            width: fit-content;
            margin: 5px auto;
            padding: 10px;
            border: 2px solid transparent;
            border-radius: 15px;
            background-image: linear-gradient(white, white), linear-gradient(to right, #009933, #ff9800);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            transition: all 0.3s;
        }
        .tour-point:hover {
            background-image: linear-gradient(#009933, #009933), linear-gradient(to right, #009933, #ff9800);
            color: white;
        }
        .tooltip {
            position: relative;
            display: inline-block;
        }
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: #d4edda;
            color: #155724;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
        .tooltip-orange .tooltiptext {
            background-color: #ffe0b2;
            color: #bf360c;
        }
        @keyframes titleAnim {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .tour-header-anim {
            animation: titleAnim 0.6s ease-out;
            background: linear-gradient(to right, #004d00, #009d00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .intro-box {
            margin-top: 15px;
            padding: 15px;
            display: inline-block;
            border: 2px solid transparent;
            border-radius: 10px;
            background-image: linear-gradient(white, white), linear-gradient(to right, #005c99, #009933);
            background-origin: border-box;
            background-clip: padding-box, border-box;
        }
    </style>
    <div style="text-align: center;">
        <strong>✈️ O Chat que te ajuda a planejar suas viagens dentro do estado! </strong><br>
        <div class="intro-box">
            Seu embarque começa aqui!<br><br>
            Pontos turísticos, hotéis e passagens em um só lugar.<br>
            Digite o nome do estado que deseja visitar para prosseguirmos.
        </div>
    </div>
`;
addMessage('bot', chatDescription);

// Estados + pontos turísticos
const brazilPlaces = {
    "acre":["Rio Acre", "Parque Chico Mendes"],
    "alagoas":["Praia do Francês", "Maceió", "Maragogi"],
    "amapá":["Macapá", "Marco Zero do Equador"],
    "amazonas":["Manaus", "Encontro das Águas", "Teatro Amazonas"],
    "bahia":["Salvador", "Pelourinho", "Chapada Diamantina"],
    "ceará":["Fortaleza", "Praia do Futuro", "Canoa Quebrada"],
    "distrito federal":["Brasília", "Praça dos Três Poderes", "Catedral de Brasília"],
    "espírito santo":["Vitória", "Ilha das Caieiras", "Convento da Penha"],
    "goiás":["Goiânia", "Chapada dos Veadeiros", "Cidade de Goiás"],
    "maranhão":["São Luís", "Lençóis Maranhenses"],
    "mato grosso":["Cuiabá", "Pantanal Matogrossense"],
    "mato grosso do sul":["Campo Grande", "Bonito", "Pantanal Sul"],
    "minas gerais":["Belo Horizonte", "Inhotim", "Ouro Preto"],
    "pará":["Belém", "Ilha do Marajó", "Mercado Ver-o-Peso"],
    "paraíba":["João Pessoa", "Praia de Tambaú", "Areia"],
    "paraná":["Curitiba", "Jardim Botânico", "Foz do Iguaçu"],
    "pernambuco":["Recife", "Olinda", "Porto de Galinhas"],
    "piauí":["Teresina", "Parque Nacional da Serra da Capivara"],
    "rio de janeiro":["Rio de Janeiro", "Cristo Redentor", "Pão de Açúcar", "Copacabana"],
    "rio grande do norte":["Natal", "Genipabu", "Praia de Ponta Negra"],
    "rio grande do sul":["Porto Alegre", "Gramado", "Canela"],
    "rondônia":["Porto Velho", "Parque Natural de Pacaás Novos"],
    "roraima":["Boa Vista", "Monte Roraima", "Parque Nacional do Viruá"],
    "santa catarina":["Florianópolis", "Balneário Camboriú", "Beto Carrero World"],
    "são paulo":["Avenida Paulista", "Parque Ibirapuera", "Museu do Futebol", "Zoológico de São Paulo - O maior Zoo da América Latina!"],
    "sergipe":["Aracaju", "Praia de Atalaia", "Ilha dos Namorados"],
    "tocantins":["Palmas", "Jalapão", "Lagoa do Japonês"]
};

// Melhores épocas para visita
const brazilBestTime = {
    "acre": "Maio a Setembro (período seco).",
    "alagoas": "Setembro a Março (mar mais cristalino).",
    "amapá": "Agosto a Novembro (menos chuvas).",
    "amazonas": "Junho a Novembro (menos chuvas).",
    "bahia": "O ano todo! Mas de Dezembro a Março é mais agitado.",
    "ceará": "Julho a Dezembro (muito sol e ventos bons).",
    "distrito federal": "Maio a Setembro (época da seca, céu azul).",
    "espírito santo": "Dezembro a Março (verão e praias).",
    "goiás": "Maio a Setembro (ideal para cachoeiras).",
    "maranhão": "Junho a Setembro (lagoas cheias e sol).",
    "mato grosso": "Maio a Setembro (melhor para observar animais no Pantanal).",
    "mato grosso do sul": "Maio a Setembro (águas mais cristalinas em Bonito).",
    "minas gerais": "Abril a Setembro (clima ameno e seco).",
    "pará": "Junho a Novembro (verão amazônico).",
    "paraíba": "Setembro a Março (mar caribenho).",
    "paraná": "Março a Maio ou Setembro a Novembro (clima agradável).",
    "pernambuco": "Setembro a Março (sol garantido).",
    "piauí": "Maio a Agosto (menos calor excessivo).",
    "rio de janeiro": "Abril a Junho ou Agosto a Novembro (foge do calorão e chuvas).",
    "rio grande do norte": "Setembro a Março (sol forte).",
    "rio grande do sul": "Novembro a Março (praias) ou Junho/Julho (frio na serra).",
    "rondônia": "Maio a Setembro (época seca).",
    "roraima": "Setembro a Março (menos chuva).",
    "santa catarina": "Dezembro a Março (verão) ou Julho (neve na serra).",
    "são paulo": "Abril a Setembro (menos chuva, bom para passeios).",
    "sergipe": "Setembro a Março (praias lindas).",
    "tocantins": "Maio a Setembro (ideal para o Jalapão)."
};

// Eventos culturais
const brazilEvents = {
    "acre": "Expoacre (Julho/Agosto) - A maior feira de negócios e entretenimento do estado.",
    "alagoas": "São João de Maceió (Junho) - Forró e tradição à beira-mar.",
    "amapá": "Ciclo do Marabaixo (Maio a Junho) - Dança e cantos de origem africana.",
    "amazonas": "Festival de Parintins (Junho) - O duelo dos bois Garantido e Caprichoso.",
    "bahia": "Carnaval de Salvador (Fevereiro) - A energia dos trios elétricos.",
    "ceará": "Fortal (Julho) - Micareta animada em Fortaleza.",
    "distrito federal": "Aniversário de Brasília (Abril) - Shows na Esplanada.",
    "espírito santo": "Festa da Penha (Abril) - Devoção no Convento da Penha.",
    "goiás": "Procissão do Fogaréu (Semana Santa) - Tradição na Cidade de Goiás.",
    "maranhão": "Bumba Meu Boi (Junho) - Folclore vibrante em São Luís.",
    "mato grosso": "Festival de Inverno (Julho) - Cultura em Chapada dos Guimarães.",
    "mato grosso do sul": "Festival de Bonito (Julho) - Arte e natureza.",
    "minas gerais": "Inverno de Ouro Preto (Julho) - Artes nas ladeiras históricas.",
    "pará": "Círio de Nazaré (Outubro) - Fé e emoção em Belém.",
    "paraíba": "São João de Campina Grande (Junho) - O Maior São João do Mundo.",
    "paraná": "Festival de Teatro (Março) - Artes cênicas em Curitiba.",
    "pernambuco": "Carnaval de Olinda (Fevereiro) - Bonecos gigantes e frevo.",
    "piauí": "Festival de Pedro II (Junho) - Jazz e blues na serra.",
    "rio de janeiro": "Carnaval (Fevereiro) - Desfiles na Sapucaí.",
    "rio grande do norte": "Carnatal (Dezembro) - A maior micareta do Brasil.",
    "rio grande do sul": "Natal Luz (Outubro-Janeiro) - Magia em Gramado.",
    "rondônia": "Arraial Flor do Maracá (Junho) - Quadrilhas e comidas típicas.",
    "roraima": "Boa Vista Junina (Junho) - O maior arraial da região.",
    "santa catarina": "Oktoberfest (Outubro) - Tradição alemã em Blumenau.",
    "são paulo": "Virada Cultural (Maio) - Arte por toda a cidade.",
    "sergipe": "Forró Caju (Junho) - O melhor do forró em Aracaju.",
    "tocantins": "Cavalhadas (Junho) - Batalhas medievais a cavalo."
};

// Coordenadas das capitais para cálculo de distância
const capitalCoordinates = {
    "acre": {lat: -9.97, lon: -67.81},
    "alagoas": {lat: -9.66, lon: -35.73},
    "amapá": {lat: 0.03, lon: -51.07},
    "amazonas": {lat: -3.11, lon: -60.02},
    "bahia": {lat: -12.97, lon: -38.50},
    "ceará": {lat: -3.73, lon: -38.52},
    "distrito federal": {lat: -15.79, lon: -47.88},
    "espírito santo": {lat: -20.31, lon: -40.31},
    "goiás": {lat: -16.68, lon: -49.26},
    "maranhão": {lat: -2.53, lon: -44.30},
    "mato grosso": {lat: -15.60, lon: -56.09},
    "mato grosso do sul": {lat: -20.46, lon: -54.62},
    "minas gerais": {lat: -19.91, lon: -43.93},
    "pará": {lat: -1.45, lon: -48.50},
    "paraíba": {lat: -7.11, lon: -34.86},
    "paraná": {lat: -25.42, lon: -49.27},
    "pernambuco": {lat: -8.05, lon: -34.88},
    "piauí": {lat: -5.09, lon: -42.80},
    "rio de janeiro": {lat: -22.90, lon: -43.17},
    "rio grande do norte": {lat: -5.79, lon: -35.20},
    "rio grande do sul": {lat: -30.03, lon: -51.22},
    "rondônia": {lat: -8.76, lon: -63.90},
    "roraima": {lat: 2.82, lon: -60.67},
    "santa catarina": {lat: -27.59, lon: -48.54},
    "são paulo": {lat: -23.55, lon: -46.63},
    "sergipe": {lat: -10.94, lon: -37.07},
    "tocantins": {lat: -10.17, lon: -48.33}
};

// Links das companhias aéreas
const flightsLinks = [
    { url: "https://www.latam.com/pt_br/apps/personas/latam/home", name: "Latam" },
    { url: "https://www.voeazul.com.br/", name: "Azul" },
    { url: "https://www.voegol.com.br/", name: "Gol" }
];

// Link de hotéis
const hotelsLink = "https://www.booking.com/";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(0);
}

let chatStage = 0; // 0: Destino, 1: Origem
let selectedDest = "";

function respondTravel(input) {
    let text = input.trim().toLowerCase();

    if (chatStage === 0) {
        for (let place in brazilPlaces) {
            if (text.includes(place)) {
                selectedDest = place;
                chatStage = 1;
                return `Legal, vamos planejar sua viagem para <strong>${place.charAt(0).toUpperCase() + place.slice(1)}</strong>.<br>Primeiro, me diga: <strong>qual é o seu estado de origem?</strong>`;
            }
        }
        return "<div style='text-align: center;'>Desculpe, não consegui identificar o estado ou cidade. Tente digitar o nome corretamente, ex: 'Rio de Janeiro' ou 'São Paulo'.</div>";
    } else if (chatStage === 1) {
        let origin = "";
        for (let place in brazilPlaces) {
            if (text.includes(place)) {
                origin = place;
                break;
            }
        }

        if (origin) {
            chatStage = 0; // Reset
            const place = selectedDest;
            const points = brazilPlaces[place];

            // Ordena os pontos turísticos pelo tamanho do nome (maior para o menor)
            points.sort((a, b) => b.length - a.length);

            const flightsButtons = flightsLinks.map(f => {
                return `
                    <div style="margin:5px; text-align:center;">
                        <button class="tour-btn" onclick="window.open('${f.url}', '_blank')">Veja passagens aqui (${f.name})</button>
                    </div>
                `;
            }).join("");

            const pointsHTML = points.map(point => {
                const googleImagesLink = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(point)}`;
                return `
                    <div class="tour-point tooltip" style="text-align: center; display: block;">
                        <a href="${googleImagesLink}" target="_blank" style="text-decoration: none; color: inherit;">
                            <strong>${point}</strong>
                        </a>
                        <span class="tooltiptext">Clique e veja imagens</span>
                    </div>
                `;
            }).join("");

            const bestTime = brazilBestTime[place] || "O ano todo é uma boa opção!";
            const events = brazilEvents[place] || "Consulte a agenda local.";
            
            let distanceDisplay = "Indisponível";
            if (capitalCoordinates[place] && capitalCoordinates[origin]) {
                const dist = getDistanceFromLatLonInKm(capitalCoordinates[origin].lat, capitalCoordinates[origin].lon, capitalCoordinates[place].lat, capitalCoordinates[place].lon);
                distanceDisplay = `${dist} km`;
            }

            return `
                <div style="text-align: center;">
                    <strong class="tour-header-anim">Passeios em ${place.charAt(0).toUpperCase() + place.slice(1)}</strong><br>
                    <div style="margin: 10px 0;">
                        Distância: <strong>${distanceDisplay}</strong>
                    </div><br>
                    <strong>Pontos turísticos principais:</strong><br><br>
                    ${pointsHTML}<br>
                    <div class="tooltip tooltip-orange">
                        <button class="tour-btn" style="background: linear-gradient(to right, #ff9800, #ff5722);">Melhores épocas para visita</button>
                        <span class="tooltiptext">${bestTime}</span>
                    </div><br>
                    <div class="tooltip tooltip-orange">
                        <button class="tour-btn" style="background: linear-gradient(to right, #ff9800, #ff5722);">Eventos Culturais</button>
                        <span class="tooltiptext">${events}</span>
                    </div><br><br>
                    <div style="margin-top:10px;">
                        ${flightsButtons}
                    </div>
                    <br>
                    <div style="margin-top:10px;">
                        <button class="tour-btn" style="background-color:#d32f2f;" onclick="window.open('${hotelsLink}','_blank')">Ver hotéis aqui!</button>
                    </div><br>
                    Pesquisar passagens e hospedagens com antecedência garante os melhores preços e evita imprevistos na sua viagem!
                </div>
            `;
        } else {
            return "Não entendi o estado de origem. Por favor, digite o nome do estado onde você está (ex: Minas Gerais).";
        }
    }
}

// Eventos
sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage('user', text);
    const reply = respondTravel(text);
    setTimeout(() => addMessage('bot', reply), 300);
    userInput.value = "";
});

userInput.addEventListener('keypress', e => {
    if (e.key === "Enter") sendBtn.click();
});

// Scroll inteligente
chatBody.addEventListener('scroll', () => {
    if (chatBody.scrollTop < 50) chatBody.scrollTop = 0;
    else if (chatBody.scrollTop + chatBody.clientHeight >= chatBody.scrollHeight - 50)
        chatBody.scrollTop = chatBody.scrollHeight;
});