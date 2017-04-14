// MANIPULANDO DADOS DE LEITURA
//referencia e help henriqueap (https://github.com/henriqueap)

// lendo arq
// ESTA RODANDO
function loadFileAsText(){
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		var trace = textFromFileLoaded;
		interacaoUser(trace);
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}


// MANIPULANDO DADOS DO TRACE

// checar se a instruçao inicia com dois
function checkInfo(n){
  var primeiroValor = n.substring(0, 1); // variavel primeiroValor recebe o primeiro caractere
	if (primeiroValor == "2") {  // testa se ele e dois
		var valor = n.substring(2); // se for vai pegar o hexadecimal referente a ele
	}
 	return valor;	// retornar o hexadecimal
}

// transforma o arquivo trace em vetor(array)
function vetorizarTrace(trace){
	var itemArr = []; // criar vetor itemArr
	var itens = trace.split('\n'); /* a variavel itens, tambem um vetor, vair receber o arq trace
								    criando a cada quebra de linha um elemento de array */
	for (var i=0; i < itens.length; i++) { // for para ter acesso a todos os elementos do array
		itemArr[i] = checkInfo(itens[i]);  // o array itemArr vai receber o array itens já configurado conforme o prof pediu
	} 
	return itemArr; // retorna o array itemArr
}

// a funcao verifica se o num em hexadecimal tem 8 caracteres
// se nao tiver acrescenta zero, na esquerda
function completeHex(num){
    var n = num + ""; 
    while (n.length < 8) n = "0" + n;
    return n;
}


// converter de hexa para binario
function hexTOBin(valor){
  var valorDec = "";
  var valorBin = "";
  var bin_lista = ["0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", 
  "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"];
  
  for (var count = 0; count < 8; count++){
    // convertendo cada letra/dígito do HEX
        if (valor[count].toUpperCase() == "A") {
            valorDec = "10";
        } else if (valor[count].toUpperCase() == "B"){ 
        	valorDec = "11";
        }else if (valor[count].toUpperCase() == "C"){ 
        	valorDec = "12";
        }else if (valor[count].toUpperCase() == "D"){ 
        	valorDec = "13";
        }else if (valor[count].toUpperCase() == "E"){ 
        	valorDec = "14";
        }else if (valor[count].toUpperCase() == "F"){ 
        	valorDec = "15";
        }else{ 
        	valorDec = valor[count];
        }
    		valorBin = valorBin + bin_lista[parseInt(valorDec)];

        if (count < 32)
        	valorBin = valorBin +  ""; 
    }
    return (valorBin); 
}



// interacao com usuario
function interacaoUser(trace){
	// Declaração de variáveis

	var hit = 0; // total de hits
	var miss = 0; // total de miss
	var total = 0; // total de instruções lidas
	var indRow = 0; //indice linha
	var indWords = 0;// indice palavra

	var words = ""; //palavra
	var row = ""; //linha
	var tag = ""; // tag

	var memoCache = new Array(); // declaracao de array


    var qtdLinhas = document.getElementById('qtdL').value; // recebe a qtd de linhas
	var indiceLinhas = Math.log2(qtdLinhas); // transforma qtd de linhas em tamanho de indice de linhas
	var qtdPalavras = document.getElementById('qtdP').value; // recebe a qtd de palavras
	var indicePalavras = Math.log2(qtdPalavras); // transforma qtd de palavras em tamanho de indice de Palavras

	// criacao de matriz inicial
	for (var i = 0; i < qtdLinhas; i++) {
		memoCache[i] = new Array();
		for (var j = 0; j < qtdPalavras; j++) {
		 memoCache[i][j] = "X";
		} 
	} 

// begin teste de HIT e MISS
	var hexa = vetorizarTrace(trace); // chama vetorizar trace
	var hexComplete = []; // vai receber o hexadecimal de oito
	var bin = []; // vai receber o binario

	for (var i = 0; i < hexa.length; i++){ 

		if (hexa[i] != undefined){
			hexComplete[i] = completeHex(hexa[i]); // dou o valor hexa com 8 digitos a variavel hexComplete
			bin[i] = hexTOBin(hexComplete[i]); // dou valor a variavel binario
			//binario[i] = bin[i]
		//	document.write("\n" + bin[i] + "\n");
		

		words = bin[i].substring(32 - indicePalavras);
			//alert(bin[i] + ":::" + words);
		row = bin[i].substring(32 - (indiceLinhas + indicePalavras), 32 - indicePalavras);
			//alert(bin[i] + "  :::  " + words + "  :::  " + row);
		tag = bin[i].substring(0, 32 - (words.length + row.length));
			//alert(bin[i] + "  :::  " + tag + "  :::  " + words + "  :::  " + row);

		indRow = parseInt(row, 2);
		indWords = parseInt(words, 2);
			//alert("indRow:" + indRow + "  indWords: " + indWords);

			if (memoCache[indRow][indWords] == tag){
				hit++;
			} else {
				miss++;
				memoCache[indRow][indWords] = tag;
			}
		}
	}
	total = hit + miss;
	var porcentoAcerto = (100*hit)/total;
	//alert("HIT ::: " + hit + "   MISS ::: " + miss);
	document.getElementById("resp").innerHTML=" Sua cache terá " + qtdLinhas + " linhas e " + qtdPalavras + " palavras." +
		 " Seus indices serao de " + indiceLinhas + " e " + indicePalavras + "\n\n" + 
		 "Resultado: \n" + " Hit = " + hit + " ;  Miss = " + miss + " ;  Total de instrucoes = " + total + 
		 " ;  Taxa de acertos = " + hit+"/"+total + " = "+ parseInt(porcentoAcerto) + "%";

} // termina a funcao intercaoUser

