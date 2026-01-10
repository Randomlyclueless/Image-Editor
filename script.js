let filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },

    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },

    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
};



const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d")
let file=null
let image=null
const filtersContainer=document.querySelector(".filters");

const resetButton =  document.querySelector("#reset-btn");

const downloadButton = document.querySelector("#download-btn");

const presetsContainer = document.querySelector(".presets");


function createFilterElement(name,unit="%", value,min,max){
    const div = document.createElement("div")
    div.classList.add("filter");

    const input = document.createElement("input")
    input.type = "range"
    input.min=min
    input.max = max
    input.value=value
    input.id=name

    const p= document.createElement("p")
    p.innerText=name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input",(event)=>{
        filters[name].value = input.value
        applyFilters()
    })

    return div;
}
function createFilters(){
    Object.keys(filters).forEach(key =>{
        const filterElement = createFilterElement(key,filters[key].unit, filters[key].value , filters[key].min, filters[key].max)
        filtersContainer.appendChild(filterElement);
    })
}

createFilters()

imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imagePlaceholder = document.querySelector(".placeholder");
    imagePlaceholder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        applyFilters(); // draw once initially
    };
});

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `
    canvasCtx.drawImage(image, 0, 0)
}

resetButton.addEventListener("click",(event)=>{
    filters={
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },

    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },

    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    }
    applyFilters()

    filtersContainer.innerHTML=""

    
    createFilters()
})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        opacity: 100,
    },

    bright: {
        brightness: 120,
        contrast: 105,
        saturation: 110,
        opacity: 100,
    },

    soft: {
        brightness: 110,
        contrast: 90,
        saturation: 95,
        opacity: 100,
    },

    punchy: {
        brightness: 105,
        contrast: 130,
        saturation: 130,
        opacity: 100,
    },

    faded: {
        brightness: 115,
        contrast: 85,
        saturation: 75,
        opacity: 100,
    },

    dark: {
        brightness: 85,
        contrast: 120,
        saturation: 95,
        opacity: 100,
    },

    cinematic: {
        brightness: 95,
        contrast: 140,
        saturation: 110,
        opacity: 100,
    },

    pastel: {
        brightness: 120,
        contrast: 90,
        saturation: 80,
        opacity: 100,
    },

    vivid: {
        brightness: 110,
        contrast: 120,
        saturation: 150,
        opacity: 100,
    },

    muted: {
        brightness: 100,
        contrast: 95,
        saturation: 60,
        opacity: 100,
    }
};


Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener('click', () => {
        const preset = presets[ presetName ]

        Object.keys(preset).forEach(filterName => {
            filters[ filterName ].value = preset[ filterName ]
        })

        applyFilters()
    })
})