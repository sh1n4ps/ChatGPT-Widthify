function updateElements(selector, className) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => element.classList.add(className));
}

function createDiv(id) {
    const newDiv = document.createElement("div");
    newDiv.id = id;
    document.body.appendChild(newDiv);
}

function createSlider(sliderClass, min, max, value, ...targetClasses) {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    if (targetClasses.includes('text-base')) {
        const textBaseElement = document.querySelector('.text-base');
        if (textBaseElement) {
            value = parseInt(getComputedStyle(textBaseElement).maxWidth);
        }
    }

    slider.value = value;
    slider.classList.add(sliderClass);

    targetClasses.forEach(targetClass => {
        slider.addEventListener('input', event => {
            const cexWidth = event.target.value;
            const elements = document.querySelectorAll(`.${targetClass}`);

            if (targetClass === 'cex-side-bar') {
                elements.forEach(element => element.style.width = `${cexWidth}px`);
            } else if (targetClass === 'cex-content') {
                elements.forEach(element => element.style.paddingLeft = `${cexWidth}px`);
            } else if (targetClass === 'text-base') {
                elements.forEach(element => element.style.maxWidth = `${cexWidth}px`);
            }
        });
        document.getElementById('cex-div').appendChild(slider);
    });
}

function applyObserver() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                document.querySelectorAll('.text-base').forEach(element => {
                    element.style.maxWidth = `${document.querySelector('.cex-slider-text').value}px`;
                });

                if (!document.querySelector('.cex-side-bar') && !document.querySelector('.cex-content')) {
                    updateElements('.md\\:w-\\[260px\\]', 'cex-side-bar');
                    updateElements('.md\\:pl-\\[260px\\]', 'cex-content');
                }

                const cexWidth = document.querySelector('.cex-slider-sidebar').value;
                document.querySelectorAll('.cex-side-bar').forEach(element => element.style.width = `${cexWidth}px`);
                document.querySelectorAll('.cex-content').forEach(element => element.style.paddingLeft = `${cexWidth}px`);

            }
        });
    });
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
}

setTimeout(() => {
    updateElements('.md\\:w-\\[260px\\]', 'cex-side-bar');
    updateElements('.md\\:pl-\\[260px\\]', 'cex-content');
    createDiv('cex-div');
    createSlider('cex-slider-sidebar', '200', '800', '260', 'cex-side-bar', 'cex-content');
    createSlider('cex-slider-text', '600', '1800', '680', 'text-base');
    applyObserver();
}, 1000);
