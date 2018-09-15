$(document).ready(function () {
	$('#decodificar').click(function() {

		// Deixar os outros campos de formulário
		var binarioDescodificar = document.getElementById("binarioDescodificar");
		binarioDescodificar.value = "";
		var palavraDescodificar = document.getElementById("palavraDescodificar");
		palavraDescodificar.value = "";
		
		// codificar
		var textoBinario = document.getElementById("binario");
		var textoPalavra = document.getElementById("palavra").value;
		textoBinario.value = ""; // se textoBinario já estiver com valor

		for (let i = 0; i < textoPalavra.length; i++) {
			var decimal = textoPalavra[i].charCodeAt(0); // transforma cada char em seu valor em decimal
			var final = ""; // iniciando variável

			do { // transformando cada char em binário
				var mod = decimal % 2; // mod recebe 0 ou 1
				decimal = (decimal - mod) / 2;
				final = mod + final;
			} while (decimal != 0);

			while (final.length < 8) { // se final for menor que 8 acresenta 0s na frente para completar 8
				final = `0` + final;
			}

			textoBinario.value += final;
		}

		// gerar gráfico

		var binario = $('#binario').val(); // recebe o valor que está no formulário no html com id igual a binario
		
		vetorBinario = binario.toString(); // vetorBinario recebe binario transformado em String
		
		// vetores eixoX e eixoY
		var eixoX = [];
		var eixoY = [];

		var i = 0;
		// k -> variável que vai ser incrementada para cada posição dos eixos
		var k = 0;

		/* 
		*  verificação do primeiro bit
		*  se for 0 o eixo y começa a partir do 1
		*  se for 1 o eixo y começa a partir do -1
		*/
		
		if (vetorBinario[0] == "0") {
			eixoX[0] = 0;
			eixoY[0] = 1;
			k++;
		} else {
			eixoX[0] = 0;
			eixoY[0] = -1;
			k++;
		}

		for (var i = 0; i < vetorBinario.length; i++) {	

			if (vetorBinario[i] == "1") {	                        
				eixoX[k] = k;
				eixoY[k] = -1;
				k++;
				eixoX[k] = k;
				eixoY[k] = 1;
				k++;
			} else {                     
				eixoX[k] = k;
				eixoY[k] = 1;
				k++;
				eixoX[k] = k;
				eixoY[k] = -1;
				k++;
			}			
		}

		var copia_eixoX = []; // vetor que recebera cópia de eixo x

		/*
		*  variável pos é a que indica onde cada bit tem seu fim na representação no gráfico
		*  inicia em 0.5 pois é onde o primeiro bit termina
		*  durante o laço de repetição - for - a variável vai sendo incrementada em seu valor mais 0.5 cada vez
		*/

		var pos = 0.5;
		copia_eixoX[0] = 0;
		
		for (var i = 0; i < eixoX.length; i++) {
			if (i != 0) { // apenas se if for diferente de 0 pois a variável já está settada em 0.5 e a posição 0 recebe 0.5
				copia_eixoX[i] = pos; // copia_eixoX na posição atual recebe pos
				pos += 0.5;
			}
		}
		
		// settando especificações do gráfico

		var trace4 = {
			x: copia_eixoX, 
			y: eixoY, 
			mode: 'lines+markers', 
			name: 'vh', 
			line: {shape: 'vh'}, 
			type: 'scatter'
		};

		var data = [trace4];

		var layout = {legend: {
			y: 0, 
			traceorder: 'reversed', 
			font: {size: 16}, 
			yref: 'paper'
		}};

		// Chamando função para criar gráfico na div no html
		Plotly.newPlot('manchester', data, layout);
		
	});
	
	// descodificar
	$('#codificar').click(function() {

		var resultado = "";
		var binario = document.getElementById("binarioDescodificar").value;

		for (i = 0; i < binario.length; i = i + 8) {
			resultado += String.fromCharCode(parseInt(textoBinario.substr(i,8),2));
		}
		
		document.getElementById("palavraDescodificar").value = resultado;
	});
})
