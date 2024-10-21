const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

// Uso de forEach para iterar sobre los nodos
keys.forEach(key => {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		switch (value) {
		case "clear":
			input = "";
			displayInput.textContent = "";   // Usar textContent para borrar
			displayOutput.textContent = "";  // Usar textContent para borrar
			break;
		case "backspace":
			input = input.slice(0, -1);
			displayInput.textContent = input;  // Mostrar el texto sin formatear
			break;
		case "=":
			try {
			const result = eval(prepareInput(input));
			displayOutput.innerHTML = cleanOutput(result);  // Formato HTML para el resultado
			} catch (error) {
			displayOutput.textContent = "Error";  // Mostrar mensaje de error con textContent
			}
			break;
		case "brackets":
			handleBrackets();
			displayInput.textContent = input;  // Mostrar el texto sin formatear
			break;
		default:
			if (validateInput(value)) {
			input += value;
			displayInput.textContent = input;  // Mostrar el texto sin formatear
			}
			break;
		}
	});
});

// Formatear la entrada antes de mostrar el resultado (solo para el resultado final)
const cleanInput = input => {
	return input
		.replace(/\*/g, '<span class="operator">x</span>')
		.replace(/\//g, '<span class="operator">÷</span>')
		.replace(/\+/g, '<span class="operator">+</span>')
		.replace(/\-/g, '<span class="operator">-</span>')
		.replace(/\(/g, '<span class="brackets">(</span>')
		.replace(/\)/g, '<span class="brackets">)</span>')
		.replace(/%/g, '<span class="percent">%</span>');
};

// Formatear la salida de los resultados
const cleanOutput = output => {
	const [integer, decimal] = output.toString().split(".");
	const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

// Validar entradas del usuario
const validateInput = value => {
	const lastInput = input.slice(-1);
	const operators = ["+", "-", "*", "/"];

	if (value === "." && lastInput === ".") return false;
	if (operators.includes(value) && operators.includes(lastInput)) return false;

	return true;
};

// Preparar la entrada para cálculos
const prepareInput = input => input.replace(/%/g, "/100");

// Manejar el uso de paréntesis
const handleBrackets = () => {
	const openBracketCount = (input.match(/\(/g) || []).length;
	const closeBracketCount = (input.match(/\)/g) || []).length;

	if (openBracketCount === closeBracketCount || input.endsWith("(")) {
		input += "(";
	} else {
		input += ")";
	}
};
