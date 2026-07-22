// JavaScript source code
const operation = document.getElementById('operation');
const num2 = document.getElementById('num2');
const label2 = document.getElementById('label2');

operation.addEventListener('change', () => {
    if (operation.value === 'power') {
        num2.classList.remove('hidden');
        label2.classList.remove('hidden');
    } else {
        num2.classList.add('hidden');
        label2.classList.add('hidden');
    }
});

// --- Функции вычислений ---

// Факториал через BigInt (чтобы не терять точность на больших числах)
function factorial(n) {
    if (n < 0) throw new Error('Факториал отрицательного числа не определён');
    if (!Number.isInteger(n)) throw new Error('Факториал определён только для целых чисел');
    let result = 1n;
    for (let i = 2n; i <= BigInt(n); i++) result *= i;
    return result;
}

// n-е число Фибоначчи (F(0)=0, F(1)=1)
function fibonacci(n) {
    if (n < 0) throw new Error('Число Фибоначчи для отрицательного n не определено');
    if (!Number.isInteger(n)) throw new Error('n должно быть целым числом');
    let a = 0n, b = 1n;
    for (let i = 0; i < n; i++) [a, b] = [b, a + b];
    return a;
}

// Возведение в степень ( BigInt^n )
function power(a, n)
{
    if (!Number.isInteger(n)) throw new Error('Показатель степени должен быть целым');
    if (n < 0) {
        // Для отрицательной степени возвращаем обычное число
        return Math.pow(a, n);
    }
    let result = 1n;
    const base = BigInt(a);
    for (let i = 0; i < n; i++) result *= base;
    return result;
}

// --- Главная функция ---
function calculate()
{
    const resultBox = document.getElementById('result');
    resultBox.classList.remove('error');

    const op = operation.value;
    const a = document.getElementById('num1').value.trim();
    const b = document.getElementById('num2').value.trim();

    try
    {
        if (a === '' || (op === 'power' && b === ''))
        {
            throw new Error('Заполните все поля');
        }

        const n1 = Number(a);
        let output = '';

        switch (op)
        {
            case 'factorial':
                output = `${n1}! = ${factorial(n1)}`;
            break;
            case 'fibonacci':
                output = `F(${n1}) = ${fibonacci(n1)}`;
            break;
            case 'power':
                const n2 = Number(b);
                output = `${n1}^${n2} = ${power(n1, n2)}`;
            break;
        }

        resultBox.textContent = output;
    }
    catch (e)
    {
        resultBox.classList.add('error');
        resultBox.textContent = 'Ошибка: ' + e.message;
    }
}