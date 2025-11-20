document.addEventListener("DOMContentLoaded", () => {

    const animationDelay = 2500;
    const barAnimationDelay = 3800;
    const barWaiting = barAnimationDelay - 3000;
    const lettersDelay = 50;
    const typeLettersDelay = 150;
    const selectionDuration = 500;
    const typeAnimationDelay = selectionDuration + 800;
    const revealDuration = 600;
    const revealAnimationDelay = 1500;

    initHeadline();

    function initHeadline() {
        const words = document.querySelectorAll(".cd-headline.letters b");
        singleLetters(words);

        const headlines = document.querySelectorAll(".cd-headline");
        animateHeadline(headlines);
    }

    function singleLetters(words) {
        words.forEach(word => {
            const text = word.textContent.trim().split("");
            const isVisible = word.classList.contains("is-visible");

            const letters = text.map(letter => {
                if (word.closest(".rotate-2")) {
                    return `<i><em>${letter}</em></i>`;
                }
                return isVisible ? `<i class="in">${letter}</i>` : `<i>${letter}</i>`;
            });

            word.innerHTML = letters.join("");
            word.style.opacity = 1;
        });
    }

    function animateHeadline(headlines) {
        let duration = animationDelay;

        headlines.forEach(headline => {
            const wrapper = headline.querySelector(".cd-words-wrapper");

            if (headline.classList.contains("loading-bar")) {
                duration = barAnimationDelay;
                setTimeout(() => wrapper.classList.add("is-loading"), barWaiting);

            } else if (headline.classList.contains("clip")) {
                wrapper.style.width = wrapper.offsetWidth + 10 + "px";

            } else if (!headline.classList.contains("type")) {
                const words = wrapper.querySelectorAll("b");
                let maxWidth = 0;

                words.forEach(w => {
                    const wordWidth = w.offsetWidth;
                    if (wordWidth > maxWidth) maxWidth = wordWidth;
                });

                wrapper.style.width = maxWidth + "px";
            }

            setTimeout(() => hideWord(wrapper.querySelector(".is-visible")), duration);
        });
    }

    function hideWord(word) {
        const nextWord = takeNext(word);
        const headline = word.closest(".cd-headline");

        if (headline.classList.contains("type")) {
            const wrapper = word.parentElement;
            wrapper.classList.add("selected");
            wrapper.classList.remove("waiting");

            setTimeout(() => {
                wrapper.classList.remove("selected");
                word.classList.remove("is-visible");
                word.classList.add("is-hidden");

                word.querySelectorAll("i").forEach(i => {
                    i.classList.remove("in");
                    i.classList.add("out");
                });

            }, selectionDuration);

            setTimeout(() => showWord(nextWord, typeLettersDelay), typeAnimationDelay);

        } else if (headline.classList.contains("letters")) {
            const longer = word.children.length >= nextWord.children.length;

            hideLetter(word.querySelector("i"), word, longer, lettersDelay);
            showLetter(nextWord.querySelector("i"), nextWord, longer, lettersDelay);

        } else if (headline.classList.contains("clip")) {

            const wrapper = word.closest(".cd-words-wrapper");
            wrapper.style.transition = `${revealDuration}ms`;

            wrapper.style.width = "2px";

            setTimeout(() => {
                switchWord(word, nextWord);
                showWord(nextWord);
            }, revealDuration);

        } else if (headline.classList.contains("loading-bar")) {

            const wrapper = word.closest(".cd-words-wrapper");
            wrapper.classList.remove("is-loading");

            switchWord(word, nextWord);

            setTimeout(() => hideWord(nextWord), barAnimationDelay);
            setTimeout(() => wrapper.classList.add("is-loading"), barWaiting);

        } else {

            switchWord(word, nextWord);
            setTimeout(() => hideWord(nextWord), animationDelay);
        }
    }

    function showWord(word, duration) {
        const headline = word.closest(".cd-headline");

        if (headline.classList.contains("type")) {
            showLetter(word.querySelector("i"), word, false, duration);

            word.classList.add("is-visible");
            word.classList.remove("is-hidden");

        } else if (headline.classList.contains("clip")) {
            const wrapper = word.closest(".cd-words-wrapper");
            wrapper.style.width = word.offsetWidth + 10 + "px";

            setTimeout(() => hideWord(word), revealAnimationDelay);
        }
    }

    function hideLetter(letter, word, bool, duration) {
        if (!letter) return;

        letter.classList.remove("in");
        letter.classList.add("out");

        const next = letter.nextElementSibling;

        if (next) {
            setTimeout(() => hideLetter(next, word, bool, duration), duration);
        } else if (bool) {
            setTimeout(() => hideWord(takeNext(word)), animationDelay);
        }
    }

    function showLetter(letter, word, bool, duration) {
        if (!letter) return;

        letter.classList.add("in");
        letter.classList.remove("out");

        const next = letter.nextElementSibling;

        if (next) {
            setTimeout(() => showLetter(next, word, bool, duration), duration);
        } else {
            const headline = word.closest(".cd-headline");

            if (headline.classList.contains("type")) {
                setTimeout(() => word.parentElement.classList.add("waiting"), 200);
            }

            if (!bool) {
                setTimeout(() => hideWord(word), animationDelay);
            }
        }
    }

    function takeNext(word) {
        return word.nextElementSibling || word.parentElement.children[0];
    }

    function takePrev(word) {
        return word.previousElementSibling || word.parentElement.lastElementChild;
    }

    function switchWord(oldWord, newWord) {
        oldWord.classList.remove("is-visible");
        oldWord.classList.add("is-hidden");

        newWord.classList.remove("is-hidden");
        newWord.classList.add("is-visible");
    }

});