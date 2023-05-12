const API = 'https://api.adviceslip.com/advice';

const idNumber: HTMLSpanElement | null = document.querySelector('.idNumber');
const advice: HTMLParagraphElement | null = document.querySelector('.advice');
const adviceGenerator: HTMLButtonElement | null =
  document.querySelector('.dice-img');
const errorMessage: HTMLParagraphElement | null =
  document.querySelector('.error');
const events = ['click', 'touchstart'];

let intervalId: NodeJS.Timeout | null;

async function adviceFetch(e: Event) {
  e.preventDefault();

  if (adviceGenerator && !intervalId) {
    adviceGenerator.disabled = true;
    adviceGenerator.style.cursor = 'wait';
    try {
      const response = await fetch(API);
      const data = await response.json();
      if (idNumber && advice) {
        idNumber.innerText = data.slip.id;
        advice.innerText = `"${data.slip.advice}"`;
      }
    } catch (error: unknown) {
      if (error instanceof Error && errorMessage) {
        errorMessage.style.display = 'block';
      }
    } finally {
      if (adviceGenerator) {
        intervalId = setTimeout(() => {
          adviceGenerator.disabled = false;
          adviceGenerator.style.cursor = 'pointer';
          intervalId = null;
        }, 1000);
      }
    }
  }
  events.forEach((userEvent) => {
    adviceGenerator?.addEventListener(userEvent, adviceFetch);
  });
}

events.forEach((userEvent) => {
  adviceGenerator?.addEventListener(userEvent, adviceFetch);
});
