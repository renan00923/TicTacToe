/*
	O código foi baseado essencialmente em .target, getAtrribute, querySelector, data-*, display: none e display: flex, .reload
*/

var cont = 1; // contador recebe 1
var ganhador = false // ganhador
var jogador = 'X';  // jogador recebe o X
var maquina = 'O';  // maquina recebe O
var exibeTabela = document.getElementById('tabela'); // variável para exibir a tabela
var vencedor = null; // variável 
var dificuldade = 'facil'; // dificuldade começa como fácil

// tabela espelho do jogo
var tabela = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];
// combinações em sequência de 3*3 para definir se alguém ganhou
var combinacoesVencedoras = [
	[[0, 0], [0, 1], [0, 2]], // combinacao[0]
	[[1, 0], [1, 1], [1, 2]], // combinacao[1]
	[[2, 0], [2, 1], [2, 2]], // combinacao[2]
	[[0, 0], [1, 0], [2, 0]], // combinacao[3]
	[[0, 1], [1, 1], [2, 1]], // combinacao[4]
	[[0, 2], [1, 2], [2, 2]], // combinacao[5]
	[[0, 0], [1, 1], [2, 2]], // combinacao[6]
	[[0, 2], [1, 1], [2, 0]]  // combinacao[7]
];

// funcao inicial para o jogador escolher seu personagem
function escolherPersonagem(event) {
	const click = event.target; // a constante click pega o elemento selecionado
	var personagem = click.getAttribute("data-personagem"); // o personagem vai receber o botao selecionado onde será lido o atributo data-personagem atribuido no html
	var inicio = document.getElementById('inicio'); // variável pega o id inicio para futuramente atribuir display: none
	
	// se o jogador escolher explosao
	if (personagem == 'explosao') {
		jogador = 'X';
		maquina = 'O';
		cont = 1;
	}
	// se o jogador escolher bomba
	else if (personagem == 'bomba') {
		jogador = 'O';
		maquina = 'X';
	}
	// após a escolha, entra a tabela em cena
	inicio.style.display = 'none';
	exibeTabela.style.display = 'flex';
}
// parte essencial do jogo, onde as coisas começam
function jogo(event) {
    const click = event.target; // constante click pega o elemento selecionado
    var img = click.querySelector('img'); // a img vai receber o local da imagem clicada
    const row = parseInt(click.getAttribute("data-row"));
    const col = parseInt(click.getAttribute("data-col"));

    if (!img || img.style.display === 'flex' || ganhador) {
        return; 
    }

    img.style.display = 'flex';
    img.src = jogador === 'X' ? "explosao.jpg" : "bomba.png";
    tabela[row][col] = jogador;
	cont++;

    verificaGanhador();
    exibeResultado();

    if (!ganhador && cont % 2 == 0) {
        setTimeout(jogaMaquina, 300);
    }
}


function verificaGanhador() {
	for (var i = 0; i < combinacoesVencedoras.length; i++) {
		
		var combinacao = combinacoesVencedoras[i];

		var a = tabela[combinacao[0][0]][combinacao[0][1]];
		var b = tabela[combinacao[1][0]][combinacao[1][1]];
		var c = tabela[combinacao[2][0]][combinacao[2][1]];

		if (a === b && b === c && a !== '') {
			ganhador = true;
			vencedor = a;
			return ganhador;
		}
	}

}

function exibeResultado() {

	var boxResultado = document.getElementById('box')
	var bomb = document.getElementById('bomb')
	var explosion = document.getElementById('explosion')
	var draw = document.getElementById('draw')
	exibeTabela = document.getElementById('tabela');

	if (ganhador == true && vencedor == 'X') {
		exibeTabela.style.display = 'none';
		boxResultado.style.display = 'flex';
		explosion.style.display = 'flex';
	}
	else if (ganhador == true && vencedor == 'O') {
		exibeTabela.style.display = 'none';
		boxResultado.style.display = 'flex';
		bomb.style.display = 'flex';
	}

	else if (cont >= 9 && ganhador == false) {
		exibeTabela.style.display = 'none';
		boxResultado.style.display = 'flex';
		draw.style.display = 'flex';
	}
}

function newGame() {
	location.reload();
}

function jogaMaquina() {
    if (ganhador || cont >= 9) return; 

    var celulasVazias = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (tabela[i][j] === '') {
                celulasVazias.push([i, j]); 
            }
        }
    }
	if (dificuldade == 'facil') {
		if (celulasVazias.length > 0) {
			var escolha = Math.floor(Math.random() * celulasVazias.length);
			var posicao = celulasVazias[escolha];
			var row = posicao[0];
			var col = posicao[1];
	
			tabela[row][col] = maquina;
			
			var img = document.querySelector(`[data-row="${row}"][data-col="${col}"] img`);
			img.style.display = 'flex';
			img.src = maquina === 'X' ? "explosao.jpg" : "bomba.png";
			console.log(dificuldade);
		}
	}
	else if (dificuldade == 'medio') {
		if (celulasVazias.length > 0) {
			var escolha = Math.floor(Math.random() * celulasVazias.length);
			var posicao = celulasVazias[escolha];
			var row = posicao[0];
			var col = posicao[1];
			
			tabela[row][col] = maquina;
			
			var img = document.querySelector(`[data-row="${row}"][data-col="${col}"] img`);
			img.style.display = 'flex';
			img.src = maquina === 'X' ? "explosao.jpg" : "bomba.png";
			console.log(dificuldade);
		}
	}

        verificaGanhador();
        exibeResultado();
        cont++; 
}
function escolherDificuldade(event) {
    const click = event.target; 
    dificuldade = click.getAttribute("data-dificuldade"); 

    if (dificuldade == 'facil') {
        click.innerHTML = 'Médio'; 
		dificuldade = 'medio';
        click.setAttribute("data-dificuldade", 'medio'); 
    } else if (dificuldade == 'medio') {
        click.innerHTML = 'Difícil';
		dificuldade = 'dificil';
        click.setAttribute("data-dificuldade", 'dificil');
    } else if (dificuldade == 'dificil') {
        click.innerHTML = 'Fácil';
		dificuldade = 'facil';
        click.setAttribute("data-dificuldade", 'facil');
    }
}


