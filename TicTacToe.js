var cont = 1;
var ganhador = false
var jogador = 'X'; 
var maquina = 'O'; 
var exibeTabela = document.getElementById('tabela');
var vencedor = null;
var dificuldade = 'facil';

var tabela = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];

var combinacoesVencedoras = [
	[[0, 0], [0, 1], [0, 2]],
	[[1, 0], [1, 1], [1, 2]],
	[[2, 0], [2, 1], [2, 2]],
	[[0, 0], [1, 0], [2, 0]],
	[[0, 1], [1, 1], [2, 1]],
	[[0, 2], [1, 2], [2, 2]],
	[[0, 0], [1, 1], [2, 2]],
	[[0, 2], [1, 1], [2, 0]]
];

function escolherPersonagem(event) {
	const click = event.target;
	var personagem = click.getAttribute("data-personagem");
	var inicio = document.getElementById('inicio');
	
	if (personagem == 'explosao') {
		jogador = 'X';
		maquina = 'O';
		cont = 1;
	}
	else if (personagem == 'bomba') {
		jogador = 'O';
		maquina = 'X';
	}
	inicio.style.display = 'none';
	exibeTabela.style.display = 'flex';
}
function jogo(event) {
    const click = event.target;
    var img = click.querySelector('img');
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


