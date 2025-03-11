function generateInputs() {

    document.getElementById("nama").disabled=true;
    document.getElementById("jumlahPilihan").disabled=true;
    document.getElementById("OK1").hidden=true;
    let jumlahPilihan = document.getElementById("jumlahPilihan").value;
    let container = document.getElementById("inputContainer");
    container.innerHTML = "";
    
    for (let i = 1; i <= jumlahPilihan; i++) {
        let label = document.createElement("label");
        label.textContent = "Pilihan " + i + ":";
        let input = document.createElement("input");
        input.name = "Pilihan" + i;
        input.required=true;
        
        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }
    
    document.getElementById("submitSection").style.display = "block";

}

function generateOptions() {

    document.querySelectorAll("button").forEach(btn => btn.style.display = "none");
    
    let container = document.getElementById("inputContainer");
    let inputs = container.getElementsByTagName("input");
    for (let input of inputs) {
        if (!input.checkValidity()) {
            alert("Semua pilihan harus diisi!");
            return;
        }
    }
    
    let pilihanContainer = document.getElementById("pilihanContainer");
    pilihanContainer.innerHTML = "";

    let radioDiv = document.createElement("div");
    let dropdown = document.createElement("select");
    dropdown.name = "dropdownPilihan";
    dropdown.id = "dropdownPilihan";
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
    
    for (let i = 0; i < inputs.length; i++) {
        let value = inputs[i].value;
        
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "radioPilihan";
        radio.id = "Rd" + i;
        radio.value = value;
        
        let radioLabel = document.createElement("label");
        radioLabel.textContent = value;
        
        radioDiv.appendChild(radio);
        radioDiv.appendChild(radioLabel);
        radioDiv.appendChild(document.createElement("br"));
        
        let option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
        
        radio.addEventListener("change", function () {
            dropdown.value = radio.value;
        });
    }

    dropdown.addEventListener("change", function () {
        let selectedValue = dropdown.value;
        let radios = document.getElementsByName("radioPilihan");
        for (let radio of radios) {
            if (radio.value === selectedValue) {
                radio.checked = true;
                break;
            }
        }
    });
    
    pilihanContainer.appendChild(document.createElement("h3")).textContent = "Pilihan : ";
    pilihanContainer.appendChild(radioDiv);
    pilihanContainer.appendChild(document.createElement("br"));
    pilihanContainer.appendChild(dropdown);
    pilihanContainer.appendChild(document.createElement("br"));
    
    let finalSubmit = document.createElement("button");
    finalSubmit.textContent = "Submit";
    finalSubmit.onclick = showResult;
    pilihanContainer.appendChild(finalSubmit);
    
}

function showResult() {

    let nama = document.getElementById("nama").value;
    let jumlahPilihan = document.getElementById("jumlahPilihan").value;
    let inputs = document.getElementById("inputContainer").getElementsByTagName("input");
    let pilihan = document.querySelector('input[name="radioPilihan"]:checked')?.value || document.getElementById("dropdownPilihan").value;
    
    
    let teksPilihan = [];
    for (let i = 0; i < inputs.length; i++) {
        teksPilihan.push(inputs[i].value);
    }

    let radioButtons = document.querySelectorAll('input[name="radioPilihan"]');
    radioButtons.forEach(radio => radio.disabled = true);

    document.getElementById("dropdownPilihan").disabled=true;

    document.querySelectorAll("button").forEach(btn => btn.style.display = "none");
    
    let hasil = `Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlahPilihan} pilihan yaitu ${teksPilihan.join(", ")}, dan saya memilih ${pilihan}.`;
    
    document.getElementById("resultContainer").textContent = hasil;
}