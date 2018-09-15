$(document).ready(function () {
	$('#decodificar').click(function() {

		// Deixar os outros campos de formulário
		document.getElementById("binarioCodificar").value = "";
		document.getElementById("palavra-binario").value = "";
		
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
				eixoX[k] = k/2;
				eixoY[k] = -1;
				k++;
				eixoX[k] = k/2;
				eixoY[k] = 1;
				k++;
			} else {                     
				eixoX[k] = k/2;
				eixoY[k] = 1;
				k++;
				eixoX[k] = k/2;
				eixoY[k] = -1;
				k++;
			}			
		}
		
		var trace1 = {
			x: eixoX,
			y: eixoY, 
			mode: 'lines+markers', 
			line: {shape: 'vh'}, 
			type: 'scatter'
		};

		var data = [trace1];

		// Chamando função para criar gráfico na div no html
		Plotly.newPlot('manchester', data);
		
	});
	
	// descodificar
	$('#codificar').click(function() {

		var resultado = "";
		var binario = document.getElementById("binarioCodificar").value;

		for (i = 0; i < binario.length; i = i + 8) {
			resultado += String.fromCharCode(parseInt(binario.substr(i,8),2));
		}
		
		document.getElementById("palavra-binario").value = resultado;
	});
})
