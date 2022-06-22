//Array Abecedario Español
const abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
"ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//Array para palabras dentro de la API DIC
let palabraDic = [];

//Funcion API 
const apiDic = async (palabra, palabraDic) => {

    //Pedido a la API
    const resp = await
    fetch(`https://www.dictionaryapi.com/api/v3/references/spanish/json/${palabra}?key=d56352af-43d9-4103-8d34-eb838adb8fa9`);
    const data = await resp.json();

    let respuesta = "";

    //Obtengo solo la palabra
    if (data[30] === undefined) {
        respuesta = data[0].hwi.hw;
    }

    else {
        respuesta = "noExiste";
    }

    //Pusheo la palabra a mi array
    palabraDic.push(respuesta)

    
};



//Objeto de Arrays  de Palabras por Nivel
const palabras = {
    palabrasFacil: ["abrir", "barra", "perro", "carne", "pollo", "gallo", "koala", "parto", "corto", "zombi", 
    "yerba", "vivir", "verde", "villa", "viejo", "tabla", "truco", "termo", "terco", "techo", "tango", "torta", 
    "tenis", "tecla", "sumar", "silla", "sucio", "suave", "socio", "sobre", "selva", "racha", "radio", "rampa",
    "recto", "regla", "reina", "reino", "queso", "padre", "pasto", "pasta", "patio", "peine", "piano", "pieza",
    "oveja", "oxido", "nafta", "nariz", "nieto", "nieve", "noche", "macho", "madre", "mando", "marco", "metro",
    "labio", "larga", "leche", "lento", "letra", "lindo", "jarra", "joven", "juego", "impar", "igual", "hongo",
    "hacha", "ganar", "genio", "gente", "falso", "feliz", "feria", "ficha", "enano", "etapa", "danza", "droga",
    "ducha", "dulce", "cable", "calor", "campo"],
    palabrasNormal: ["bonos", "bajar", "palco", "andar", "alzar", "karma", "otoño", "señal", "zumba", "yelmo", 
    "vodka", "veloz", "verso", "verbo", "usual", "tumor", "trono", "toser", "tutor", "toldo", "tropa", "tosco", 
    "tieso", "tenso", "tejer", "sushi", "sutil", "sueño", "subir", "sitio", "siglo", "serie", "rabia", "risco",
    "rasgo", "regio", "retro", "ritmo", "robar", "queja", "pagar", "palta", "pañal", "panel", "pelea", "peste",
    "oliva", "opaco", "ocaso", "ozono", "naipe", "nicho", "ninja", "mafia", "magma", "mamut", "marca", "marea",
    "lapso", "larva", "legal", "letal", "licor", "lince", "jerga", "jueza", "jugar", "iluso", "ileso", "hacer",
    "harto", "gaita", "gesto", "girar", "farol", "fatal", "feroz", "fibra", "echar", "errar", "dañar", "dardo",
    "duelo", "dueño", "cacao", "calvo", "canoa"],
    palabrasDificil: ["avaro", "arnés", "anexo", "kebab", "éxito", "aliño", "añejo", "riñón", "zanco", "yacer", 
    "xenón", "voraz", "veraz", "vóley", "vídeo", "útero", "usaje", "unión", "torva", "torno", "tucán", "tenaz", 
    "tapir", "tamal", "sazón", "suite", "suero", "suela", "soplo", "sonda", "solar", "sikus", "sesgo", "rapel",
    "razón", "relax", "rocío", "rodeo", "quena", "pádel", "pauta", "peaje", "pelón", "pixel", "podar", "polen",
    "oasis", "ovino", "omega", "ñandú", "nasal", "navío", "nitro", "macro", "micro", "malta", "matiz", "móvil",
    "labor", "lápiz", "liceo", "lijar", "limón", "lirio", "jalea", "jerez", "jeque", "ícono", "istmo", "héroe",
    "hedor", "geoda", "grumo", "gruta", "facto", "fauna", "fémur", "fénix", "élite", "eluir", "dakar", "debut",
    "dupla", "caché", "cajón", "caspa", "ceder"]
    }
 
    
//Desestructuracion del objeto para facil uso de sus arrays
const {palabrasFacil, palabrasNormal, palabrasDificil} = palabras 

//Funciones

//Introducir LocalStorage
function agregarAlocalStorage (situacion) {
    
    //Obtengo JugadasGuardadas
    const jugadasGuardadas = localStorage.getItem("jugadasGuardadas");


    //Simplifico con el OPERADOR OR mis dos asignaciones
    let jugadasParseadas = JSON.parse(jugadasGuardadas) || {jugadas: 0,
                                                            ganadas: 0,
                                                            perdidas: 0};
    
    //Sumo Jugada y Ganada o Perdida segun el Caso
    if (situacion == "ganar") {
        jugadasParseadas.jugadas++
        jugadasParseadas.ganadas++
    }
    
    else if (situacion == "perder") {
        jugadasParseadas.jugadas++
        jugadasParseadas.perdidas++
    }


    //Seteo con los cambios hechos
    localStorage.setItem("jugadasGuardadas", JSON.stringify(jugadasParseadas));
}

//Palabra Valida
function corroborarPalabra(ingresoUsuario, nivel, palabraDic) {

    //Array letras validas y obtengo <p>error<p>
    let letrasValidas = [];
    let textoError = document.getElementById("error");

    //Corroborar si palabra dentro de diccionario
    if (palabraDic.includes(ingresoUsuario) || palabrasFacil.includes(ingresoUsuario) || palabrasNormal.includes(ingresoUsuario) || palabrasDificil.includes(ingresoUsuario)) {
        //Iteracion por letra y PUSH
        if (ingresoUsuario.length === 5) {
            for (l of ingresoUsuario) {

                //Nivel Dificil con Acentos
                if (nivel == "dificil") {

                 letrasValidas.push(l);

                }

                //Nivel Facil o Normal
                else {

                    if ((abecedario.includes(l)) === false) {
                        //Letra fuera del Abecedario
                        textoError.innerHTML = `<font color="red"> <p id="error" >No puedes usar tildes en este nivel.</p><br>`;
                        break;
                    }

                    else {
                        //Se añade cada letra Valida al array
                        letrasValidas.push(l);
                    }

                }    

            }
        }

        else {
            //No tiene 5 caracteres el texto ingresado
            textoError.innerHTML = `<font color="red"><p id="error">La palabra no tiene 5 letras</p><br>`;
        }

    }

    else {
        //No forma parte del diccionario
        textoError.innerHTML = `<font color="red"><p id="error">Esta palabra no esta en el diccionario.</p><br>`;
    }


    if (letrasValidas.length == 5) {
        //Return si todas las letras estan Validas
        textoError.innerHTML = "";
        return letrasValidas;
    }
    
}   


//Comprobar Aciertos en el Ingreso
function corroborarAciertos(ingresoCorroborado, palabra) {  
    //Indice y array de respuesta  
    let indice = 0;
    let respuesta = [];

    if (ingresoCorroborado) {

        //Bucle de Aciertos
        ingresoCorroborado.forEach( (letra) => {

            if (letra === palabra[indice]) {
                respuesta.push("Green");
            }

            else if (palabra.includes(letra)) {
                respuesta.push("Yellow");
            }

            else {
                respuesta.push("Grey");
            }

            indice ++;

        } );
        
        return respuesta;

    }
}


//Boton para volver al Menu
function botonVolver () {
        //Creacion BotonVolver
        let divVolver = document.getElementById("volver");
        let contenedor = document.createElement("button");
        contenedor.innerText = `Volver al menu`
        let atributoVolver = document.createAttribute(`style`);
        atributoVolver.value = `background-color:#DEB887; color:black; FONT-SIZE: 11pt; width:100px; height:50px `;
        contenedor.setAttributeNode(atributoVolver);
        divVolver.appendChild(contenedor);
        
        
        //Asignar funcionalidad al BotonVolver
        let divJuego = document.getElementById("juego")
        let botonVolver = document.getElementsByTagName("button");
        botonVolver[0].addEventListener("click", () => {
                divJuego.innerHTML = "";
                divVolver.innerHTML = "";
                menuFuncional();
            });
}


//Boton pantalla Tutorial
function tutorial() {

    //Borro la pantalla anterior
    let divMenu = document.getElementById("menu");
    divMenu.innerHTML = "";

    //Obtengo Div Juego
    let divJuego = document.getElementById("juego");
    

    //Boton Volver
    botonVolver();

    //Pantalla Tutorial
    divJuego.innerHTML = `<h2>Posición correcta y letra correcta:</h2> 
    <button style="background-color:green; color:white; FONT-SIZE: 14pt; 
    FONT-FAMILY: Verdana; border-color:grey; width:50px; height:50px">A</button>
    <h2>Posición incorrecta y letra correcta:</h2> 
    <button style="background-color:#CBAC14; color:white; FONT-SIZE: 14pt; 
    FONT-FAMILY: Verdana; border-color:grey; width:50px; height:50px">A</button>
    <h2>Posición incorrecta y letra incorrecta:</h2> 
    <button style="background-color:#575450; color:white; FONT-SIZE: 14pt; 
    FONT-FAMILY: Verdana; border-color:grey; width:50px; height:50px">A</button>`

}

//Mostrar respuestas, definir ganador y perdedor, boton volver
function respuestasColoridas(respuesta, ingreso, intentos, palabra) {

    //Si Respuesta ya esta validada
    if (respuesta) {

        let indice = 0;
        intentos++;

        //Obtengo el div para poner la respuesta
        textoRespuesta = document.getElementById(`res-${intentos}`)
        for (letra of ingreso) {

            //Creacion del boton
            contenedor = document.createElement("button");
            contenedor.innerText = letra.toUpperCase();

            //Creacion de atributo y como se va a ver cada boton de respuesta
            atributo = document.createAttribute(`style`);

            if (respuesta[indice] == "Green") {
                atributo.value = `background-color:green; color:white; FONT-SIZE: 14pt; FONT-FAMILY: Verdana; border-color:grey; width:50px; height:50px`;
            }
    
            else if (respuesta[indice] == "Yellow") {
                atributo.value = `background-color:#CBAC14; color:white; FONT-SIZE: 14pt; FONT-FAMILY: Verdana; border-color:grey; width:50px; height:50px`;
            }
    
            else {
                atributo.value = `background-color:#575450; color:white; FONT-SIZE: 14pt; FONT-FAMILY: Verdana; border-color:grey; width:50px; height:50px`;
            }

            //Agrego todo al div de Respuesta
            contenedor.setAttributeNode(atributo);
            textoRespuesta.appendChild(contenedor);
            indice++;
        }

    }
    //Resultado Perder o Ganar
    if (ingreso === palabra || intentos === 6) {

        //Elimino input y boton
        let divJuego = document.getElementById("juego");
        let botonEnviar = document.getElementById("btn-enviar");
        input = document.getElementById("input");
        divJuego.removeChild(botonEnviar);
        divJuego.removeChild(input);
        let textoTerminado = document.getElementById("error"); 

        if (ingreso === palabra) {
            //Sumo una Ganada
            agregarAlocalStorage ("ganar")
            textoTerminado.innerHTML = `<h1>¡Felicidades! <i>${palabra.toUpperCase()}</i> era la palabra ganadora!</h1>
            <h4>Adivinaste en ${intentos} intentos.`;
            Swal.fire({
                
                title: `Ganaste!`,
                text: `Tu palabra era ${palabra.toUpperCase()}!`,
                width: 600,
                padding: '7em',
                color: "#41343C",
                background: '#fff url(/fotos/bigwin.jpg)',
                confirmButtonColor: "#41343C",
                confirmButtonText: 'Sí, gane!',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/fotos/banana-mario.gif")
                  left top
                  no-repeat
                `
            })
        }

        else if (intentos === 6) {
            //Sumo una Perdida
            agregarAlocalStorage("perder")
            textoTerminado.innerHTML = `<h1>¡Perdiste! <i>${palabra.toUpperCase()}</i> era la palabra ganadora! </h1>`;
            Swal.fire({
                width: 480,
                confirmButtonColor:"#E8003F",
                confirmButtonText: ":(",
                background: "#000000",
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/fotos/gameover.gif")
                  top
                  no-repeat
                `
              })
            
        }


       //Boton Volver
        botonVolver();

    }

    //Retorno Intentos
    return intentos

}


//Juego Visual y Funciones al apretar boton Enviar
function jugar(nivel) {

    //Borro la pantalla anterior
    let divMenu = document.getElementById("menu");
    divMenu.innerHTML = "";

    //Creo la nueva pantalla
    let divJuego = document.getElementById("juego");

    //Numero aleatorio para palabra
    let aleatorio = Math.random();

    let palabra = "";
    
    //Visual Segun Nivel
    if (nivel === "facil") {
        palabra = palabrasFacil[Math.floor(aleatorio * palabrasFacil.length)];
        divJuego.innerHTML = `<h1>Word-World</h1>
        <p>Bienvenido al nivel fácil.</p>
        <p>Deberías adivinar sin ningun problema...</p><br>
        <input type="text" placeholder="Escriba su respuesta" id="input" size="22" maxlength="5">
        <button type="button" id="btn-enviar">Enviar</button>
        <p id="error"></p><br>
        <div id="res-1"></div><br>
        <div id="res-2"></div><br>
        <div id="res-3"></div><br>
        <div id="res-4"></div><br>
        <div id="res-5"></div><br>
        <div id="res-6"></div>`;
    }

    else if (nivel === "normal") {
        palabra = palabrasNormal[Math.floor(aleatorio * palabrasNormal.length)];
        divJuego.innerHTML = `<h1>Word-World</h1>
        <p>Bienvenido al nivel normal.</p>
        <p>Este es un desafío respetable!</p><br>
        <input type="text" placeholder="Escriba su respuesta" id="input" size="22" maxlength="5">
        <button type="button" id="btn-enviar">Enviar</button>
        <p id="error"></p><br>
        <div id="res-1"></div><br>
        <div id="res-2"></div><br>
        <div id="res-3"></div><br>
        <div id="res-4"></div><br>
        <div id="res-5"></div><br>
        <div id="res-6"></div>`;
    }

    else {
        palabra = palabrasDificil[Math.floor(aleatorio * palabrasNormal.length)];
        divJuego.innerHTML =`<h1>Word-World</h1>
        <p>Bienvenido al nivel dificil!</p>
        <p>En este nivel tu palabra puede tener acentos, ¡Suerte!</p><br>
        <input type="text" placeholder="Escriba su respuesta" id="input" size="22" maxlength="5">
        <button type="button" id="btn-enviar">Enviar</button>
        <p id="error"></p><br>
        <div id="res-1"></div><br>
        <div id="res-2"></div><br>
        <div id="res-3"></div><br>
        <div id="res-4"></div><br>
        <div id="res-5"></div><br>
        <div id="res-6"></div>`;
    }


    //Configuracion del botonEnviar
    let intentos = 0;
    botonEnviar = document.getElementById("btn-enviar");
    botonEnviar.addEventListener("click", () => {

        //Obtengo informacion de la palabra en la API del diccionario
        let ingreso = document.getElementById("input").value;
        apiDic(ingreso.toLowerCase(), palabraDic);

        //setTimeout para que cargue la API y todo se ejecute de manera correcta
        setTimeout(function timeout() {
            respuesta = corroborarAciertos(corroborarPalabra(ingreso.toLowerCase(), nivel, palabraDic), palabra);
            intentos = respuestasColoridas(respuesta, ingreso.toLowerCase(), intentos, palabra);
        }, 500 );

     });
}



//Menu en HTML 
function menuVisual() {
    //Obtengo los datos de localStorage para mostrar en pantalla
    let jugadasGuardadas = JSON.parse(localStorage.getItem("jugadasGuardadas"));



    //Creacion de los botones y menu HTML(Actualizado con condicional de jugadas)
    let divMenu = document.getElementById("menu");
    divMenu.innerHTML = `<h1>Word-World</h1>
    <h3>Acierta la palabra de 5 letras en solo 6 intentos!</h3><br>
    <h4>---------------------JUGAR---------------------</h4>
    <p3>Niveles:</p3>
    <button>Facil</button>
    <button>Normal</button>
    <button>Dificil</button>
    <button>Tutorial</button>
    <h4>Contador de Partidas:</h4>
    <h4>Partidas Jugadas: ${jugadasGuardadas?.jugadas || 0}<h4>
    <h4>Partidas Ganadas: ${jugadasGuardadas?.ganadas || 0}<h4>
    <h4>Partidas Perdidas: ${jugadasGuardadas?.perdidas || 0}<h4></h4>`;
}


//Asignando funcionalidad a los botones del Menu
function menuFuncional() {

    //Agrego el Menu Visual y establezco las partidas jugadas
    menuVisual();
    
    //Asignando Clicks a Botones
    let botones = document.getElementsByTagName("button");
    botones[0].addEventListener("click", () => {
        jugar("facil");
        });
    botones[1].addEventListener("click", () => {
        jugar("normal");
        });
    botones[2].addEventListener("click", () => {
        jugar("dificil");
        });
    botones[3].addEventListener("click", () => {
        tutorial();
        });
    

}


//Ejecucion
menuFuncional();