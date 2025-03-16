import React, { useState } from 'react';

const MathPopup = ({ onCorrect }) => {
  const [answer, setAnswer] = useState('');
  const [problem] = useState(() => {
    const operations = [
      () => {
        const num1 = Math.floor(Math.random() * 1000) + 100;
        const num2 = Math.floor(Math.random() * 1000) + 100;
        return {
          expression: `${num1} × ${num2}`,
          answer: num1 * num2
        };
      },
      () => {
        const num = Math.floor(Math.random() * 15) + 5;
        return {
          expression: `√${num * num}`,
          answer: num
        };
      },
      () => {
        const num1 = Math.floor(Math.random() * 50) + 10;
        const num2 = Math.floor(Math.random() * 30) + 10;
        const num3 = Math.floor(Math.random() * 20) + 5;
        return {
          expression: `(${num1} × ${num2}) ÷ ${num3}`,
          answer: (num1 * num2) / num3
        };
      },
      () => {
        const base = Math.floor(Math.random() * 10) + 2;
        const exp = Math.floor(Math.random() * 3) + 3;
        return {
          expression: `${base}^${exp}`,
          answer: Math.pow(base, exp)
        };
      }
    ];

    const selectedOperation = operations[Math.floor(Math.random() * operations.length)]();
    return {
      expression: selectedOperation.expression,
      correctAnswer: selectedOperation.answer
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Math.abs(parseFloat(answer) - problem.correctAnswer) < 0.1) {
      onCorrect();
    } else {
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">Solve to continue typing:</h2>
        <p className="text-2xl mb-4">
          {problem.expression} = ?
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="number"
            step="0.01"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 rounded"
            autoFocus
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MathPopup;
