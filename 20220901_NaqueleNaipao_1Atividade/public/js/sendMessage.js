const loader = document.querySelector("#loadSendMsg > div");

document.forms.form_contact.onsubmit = async (e) => {
    try {
        e.preventDefault();

        loader.style.display = "block";

        const form = e.target;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            cpf: formData.get("cpf"),
            sex: formData.get("sex"),
            phone: formData.get("phone"),
            rate: formData.get("rate"),
            message: formData.get("message"),
        };

        const isValidName = validName(data.name);
        if (isValidName) {
            closeLoad();
            return alert(isValidName);
        }

        const isValidEmail = validEmail(data.email);
        if (isValidEmail) {
            closeLoad();
            return alert(isValidEmail);
        }

        const isvalidCpf = validCpf(data.cpf);
        if (isvalidCpf) {
            closeLoad();
            return alert(isvalidCpf)
        };

        const isValidSex = validSex(data.sex);
        if (isValidSex) {
            closeLoad();
            return alert(isValidSex);
        } 

        const isValidPhone = validPhone(data.phone);
        if (isValidPhone) {
            closeLoad();
            return alert(isValidPhone);
        }

        const isValidRate = validRate(data.rate);
        if (isValidRate) {
            closeLoad();
            return alert(isValidRate);
        }

        const isValidMessage = validMessage(data.message);
        if (isValidMessage) {
            closeLoad();
            return alert(isValidMessage);
        }

        const request = await fetch("/sendMessage", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await request.json();
        closeLoad();
        e.target.reset();

        if (json.success) {
            alert(json.message);
        } else {
            alert(json.message);
        }
    } catch (err) {
        console.log(err);
        closeLoad();
        alert("Falha ao enviar mensagem, tente novamente mais tarde");
    }
};

const closeLoad = () => {
    loader.style.display = "none";
}

const validName = (value) => {
    if (!value) return "Nome não informado";
    if (value.trim().length <= 3 || value.trim().length > 50)
        return "Nome deve ter entre 3 e 50 caracteres";
    return "";
};

const validEmail = (value) => {
    if (!value) return "Email não informado";
    const reg = /\S+@\S+\.\S+/;
    const result = reg.test(value); 
    if (result)
        return "";
    else
        return "Email inválido"
}

const validCpf = (value) => {
    if (!value) return "Cpf nao informado";

    let sum = 0;
    let rest = 0;
    if (value === "00000000000") return "Cpf inválido";
    if (value === "11111111111") return "Cpf inválido";

    for (let i = 1; i <= 9; i++)
        sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;

    if (rest != parseInt(value.substring(9, 10))) return "Cpf inváido";

    sum = 0;
    for (i = 1; i <= 10; i++)
        sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(10, 11))) return "Cpf inválido";
    return "";
};

const validSex = (value) => {
    if (!["masculino", "feminino"].includes(value)) return "Sexo não informado";

    return "";
};

const validPhone = (value) => {
    if (!value) return "Telefone não informado";
    let regex = new RegExp(
        "^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"
    );
    if (!regex.test(value)) return "Telefone inválido";
    return "";
};

const validRate = (value) => {
    if (value == "-1") return "Selecione uma avaliação";
    return "";
};

const validMessage = (value) => {
    if (!value) return "Mensagem não informada";
    if (value.trim().length <= 3 || value.trim().length > 80)
        return "Mensagem deve ter entre 3 e 80 caracteres";
    return "";
};
