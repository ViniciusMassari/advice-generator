"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API = 'https://api.adviceslip.com/advice';
const idNumber = document.querySelector('.idNumber');
const advice = document.querySelector('.advice');
const adviceGenerator = document.querySelector('.dice-img');
const errorMessage = document.querySelector('.error');
const events = ['click', 'touchstart'];
let intervalId;
function adviceFetch(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (adviceGenerator && !intervalId) {
            adviceGenerator.disabled = true;
            adviceGenerator.style.cursor = 'wait';
            try {
                const response = yield fetch(API);
                const data = yield response.json();
                if (idNumber && advice) {
                    idNumber.innerText = data.slip.id;
                    advice.innerText = `"${data.slip.advice}"`;
                }
            }
            catch (error) {
                if (error instanceof Error && errorMessage) {
                    errorMessage.style.display = 'block';
                }
            }
            finally {
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
            adviceGenerator === null || adviceGenerator === void 0 ? void 0 : adviceGenerator.addEventListener(userEvent, adviceFetch);
        });
    });
}
events.forEach((userEvent) => {
    adviceGenerator === null || adviceGenerator === void 0 ? void 0 : adviceGenerator.addEventListener(userEvent, adviceFetch);
});
