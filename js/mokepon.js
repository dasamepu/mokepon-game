const section_seleccionar_ataque = document.getElementById("select_ataque")
const section_reiniciar = document.getElementById("reiniciar")
const boton_mascota = document.getElementById("boton_mascota") 

const botonreiniciar = document.getElementById("boton_reiniciar")

const section_seleccionar_mascota = document.getElementById("seleccionar-mascota")

const span_mascotajugador = document.getElementById("id_mascotajugador")

const span_mascotaenemigo = document.getElementById("id_mascotaenemigo")

const span_vidasjugador = document.getElementById("id_vidas_jugador")
const span_vidasenemigo = document.getElementById("id_vidas_enemigo")

const section_mensajes = document.getElementById("id_resultado")
const ataques_deljugador = document.getElementById("id_ataques_deljugador")
const ataques_delenemigo = document.getElementById("id_ataques_delenemigo")
const contenedor_tarjetas = document.getElementById("id_contenedor_tajetas")
const contenedor_ataques = document.getElementById("id_contenedor_ataques")
const contenedor_ataques_enemigo = document.getElementById("id_contenedor_ataques_enemigo")

const section_ver_mapa = document.getElementById("ver_mapa");
const mapa = document.getElementById("id_mapa")

let jugadorId = null
let mokepones = []
let mokeponesEnemigos = []
let ataque_jugador = []
let ataque_enemigo = []
let opcion_de_mokepones
let opcion_de_ataques
let opcion_de_ataques_enemigo
let input_tarjetas = []
let input_capipepo 
let input_hipodoge 
let input_ratigueya
let mascota_jugador
let mascota_jugador_objeto
let ataques_mokepon_enemigo
let botonagua
let botonfuego
let botontierra
let botones = []
let num_ataque_enemigo
let index_ataque_jugador
let index_ataque_enemigo
let resultado = ""
let victorias_jugador = 0
let victorias_enemigo = 0
let num_vidasjugador = 5
let num_vidasenemigo = 5
let ganador = ""
let lienzo = mapa.getContext("2d")
let intervalo
let mapa_background = new Image()
mapa_background.src = "./assets/mokemap.png"
let altura_que_buscamos
let ancho_del_mapa = window.innerWidth - 20
const ancho_maximo_mapa = 550

if (ancho_del_mapa > ancho_maximo_mapa) {
    ancho_del_mapa = ancho_maximo_mapa - 20

}


altura_que_buscamos = ancho_del_mapa * 600 / 800

mapa.width = ancho_del_mapa
mapa.height = altura_que_buscamos

class Mokepon{
    constructor(nombre, foto, vida, foto_mapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.ancho)
        this.mapa_foto = new Image()
        this.mapa_foto.src = foto_mapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapa_foto,
            this.x,   //posicion en x
            this.y,   //posicion en y
            this.ancho,  //ancho de la imagen
            this.alto   //alto de la imagen
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", num_vidasjugador, "./assets/hipodoge_cabeza.png")

let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", num_vidasjugador, "./assets/capipepo_cabeza.png")

let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png", num_vidasjugador, "./assets/ratigueya_cabeza.png")

let pikachu = new Mokepon("Pikachu", "./assets/pikachu.png", num_vidasjugador, "./assets/pikachu_cabeza.png")

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const PIKACHU_ATAQUES = [
    { nombre: '🌩️', id: 'boton-rayo' },
    { nombre: '🌩️', id: 'boton-rayo' },
    { nombre: '🌩️', id: 'boton-rayo' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

pikachu.ataques.push(...PIKACHU_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya, pikachu)

function iniciarJuego() {

    section_seleccionar_ataque.style.display = "none"
    section_reiniciar.style.display = "none"
    section_ver_mapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcion_de_mokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} class="class_input_tarjetas">
        <label for=${mokepon.nombre} class="tarjeta-de-mokepon">
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `

    contenedor_tarjetas.innerHTML += opcion_de_mokepones

    input_capipepo = document.getElementById("Capipepo")
    input_hipodoge = document.getElementById("Hipodoge")
    input_ratigueya = document.getElementById("Ratigueya")
    input_pikachu = document.getElementById("Pikachu")
    

    })

    boton_mascota.addEventListener("click", seleccionarMascota)

    botonreiniciar.addEventListener("click", reiniciarJuego)
    
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascota() {
    
    section_seleccionar_mascota.style.display = "none"

    if(input_hipodoge.checked){
        span_mascotajugador.innerHTML = input_hipodoge.id
        mascota_jugador = input_hipodoge.id
    }else if(input_capipepo.checked){
        span_mascotajugador.innerHTML = input_capipepo.id
        mascota_jugador = input_capipepo.id
    }else if(input_ratigueya.checked){
        span_mascotajugador.innerHTML = input_ratigueya.id
        mascota_jugador = input_ratigueya.id
    }else if(input_pikachu.checked){
        span_mascotajugador.innerHTML = input_pikachu.id
        mascota_jugador = input_pikachu.id
    }else{
        span_mascotajugador.innerHTML = "NO SELECCIONADA"
    }

    seleccionarMokepon(mascota_jugador)

    extraerAtaques(mascota_jugador)
    section_ver_mapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascota_jugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascota_jugador
        })
    })
}

function extraerAtaques(mascota_jugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota_jugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){

    ataques.forEach((ataque) => {
        opcion_de_ataques = `
        <button id=${ataque.id} class="boton_ataque BAtaque">${ataque.nombre}!!!</button>
        `
        contenedor_ataques.innerHTML += opcion_de_ataques
        
        
    });

    botonfuego = document.getElementById('boton-fuego')
    botonagua = document.getElementById('boton-agua')
    botontierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥!!!") {
                ataque_jugador.push("FUEGO")
                console.log(ataque_jugador, "J");
                boton.style.background = "#345612"
                boton.disabled = true
            } else if (e.target.textContent === "🌧️!!!") {
                ataque_jugador.push("AGUA")
                console.log(ataque_jugador, "J");
                boton.style.background = "#345612"
                boton.disabled = true
            } else if (e.target.textContent === "🌩️!!!") {
                ataque_jugador.push("RAYO")
                console.log(ataque_jugador, "J");
                boton.style.background = "#345612"
                boton.disabled = true
            } else {
                ataque_jugador.push("TIERRA")
                console.log(ataque_jugador, "J");
                boton.style.background = "#345612"
                boton.disabled = true
            }
            /* generarAtaquesDelEnemigo()
            ataqueEnemigo() */
            if (ataque_jugador.length === 5) {
                enviarAtaques()   
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataque_jugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {

    console.log(enemigo);

    span_mascotaenemigo.innerHTML = enemigo.nombre
    ataques_mokepon_enemigo = enemigo.ataques

    num_ataque_enemigo = createArrayOfNumbers(0,ataques_mokepon_enemigo.length-1)

    secuenciaAtaque()
    
}

function ataqueEnemigo() {

    switch (rand_atack_enemi) {
        case rand_atack_enemi:
            ataque_enemigo.push(ataques_mokepon_enemigo[rand_atack_enemi].nombre)
            console.log(ataque_enemigo, "E");
            break;
        
        default:
            console.log("error error");
            break;
    }

    iniciarPelea()
}

function iniciarPelea() {
    if (ataque_jugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
    index_ataque_jugador = ataque_jugador[jugador]
    index_ataque_enemigo = ataque_enemigo[enemigo]
}

function combate() {
    
    for (let index = 0; index < ataque_jugador.length; index++) {
        if (ataque_jugador[index] === ataque_enemigo[index] || ataque_jugador[index]=="RAYO" && ataque_enemigo[index]=="TIERRA" || ataque_jugador[index]=="TIERRA" && ataque_enemigo[index]=="RAYO") {
            indexAmbosOponentes(index,index)
            console.log("Resultado: EMPATE");
            addMensaje()
        } else if(ataque_jugador[index]=="FUEGO" && ataque_enemigo[index]=="TIERRA" ||ataque_jugador[index]=="AGUA" && ataque_enemigo[index]=="FUEGO" || ataque_jugador[index]=="TIERRA" && ataque_enemigo[index]=="AGUA" || ataque_jugador[index]=="RAYO" && ataque_enemigo[index]=="AGUA" || ataque_jugador[index]=="FUEGO" && ataque_enemigo[index]=="RAYO"){
            indexAmbosOponentes(index,index)
            console.log("Resultado: GANASTE");
            addMensaje()
            victorias_jugador++
            span_vidasjugador.innerHTML = victorias_jugador
        }else{
            indexAmbosOponentes(index,index)
            console.log("Resultado: PERDISTE");
            addMensaje()
            victorias_enemigo++
            span_vidasenemigo.innerHTML = victorias_enemigo
        } 
    }
        revisarVidas()
}

function revisarVidas() {
    if (victorias_jugador === victorias_enemigo) {
        decirGanador("no es nadie, esto fue un empate")
    } else if (victorias_jugador > victorias_enemigo) {
        decirGanador("eres tu")
    }else{
        decirGanador("es el enemigo")
    }
}

function addMensaje() {

    let parrafo_ataques_deljugador = document.createElement("p")
    let parrafo_ataques_delenemigo = document.createElement("p")

    
    parrafo_ataques_deljugador.innerHTML = "Jugador atacó con: " + index_ataque_jugador
    parrafo_ataques_delenemigo.innerHTML = "Enemigo atacó con: " + index_ataque_enemigo

    ataques_deljugador.appendChild(parrafo_ataques_deljugador)
    ataques_delenemigo.appendChild(parrafo_ataques_delenemigo)

}

function decirGanador(ganador){
    
    section_mensajes.innerHTML = "El ganador " + ganador

    alert("El ganador " + ganador)

    section_reiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function createArrayOfNumbers(start, end){
    let myArray = [];
    for(let i = start; i <= end; i++) { 
        myArray.push(i);
    }
    return myArray;
}

function generarAtaquesDelEnemigo(){
    if(num_ataque_enemigo.length == 0){
        console.log("se acabaron los ataques del enemigo");
        return;
    }
    let randomIndex = aleatorio(0, num_ataque_enemigo.length-1);
    let randomNumber = num_ataque_enemigo[randomIndex];
    num_ataque_enemigo.splice(randomIndex, 1)
    rand_atack_enemi = randomNumber;
}

function pintarCanvas() {

    mascota_jugador_objeto.x = mascota_jugador_objeto.x + mascota_jugador_objeto.velocidadX
    mascota_jugador_objeto.y = mascota_jugador_objeto.y + mascota_jugador_objeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapa_background,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascota_jugador_objeto.pintarMokepon()

    enviarPosicion(mascota_jugador_objeto.x, mascota_jugador_objeto.y)

    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if (res.ok){
            res.json()
            .then(function ({ enemigos }) {
                console.log(enemigos)
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', num_vidasenemigo, './assets/hipodoge.png')
                    }else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', num_vidasenemigo, './assets/capipepo.png')
                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', num_vidasenemigo, './assets/ratigueya.png')
                    } else if (mokeponNombre === "Pikachu") {
                        mokeponEnemigo = new Mokepon("Pikachu", "./assets/pikachu.png", num_vidasenemigo, "./assets/pikachu_cabeza.png")
                    }
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    return mokeponEnemigo
                })
            })
        }
    })
}

function moverDerechaCapipepo() {
    mascota_jugador_objeto.velocidadX = 5
}

function moverAbajoCapipepo() {
    mascota_jugador_objeto.velocidadY = 5
}

function moverIzquierdaCapipepo() {
    mascota_jugador_objeto.velocidadX = -5
}

function moverArribaCapipepo() {
    mascota_jugador_objeto.velocidadY = -5
}

function detenerMovimiento() {
    mascota_jugador_objeto.velocidadX = 0
    mascota_jugador_objeto.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArribaCapipepo()
            break;
        case "ArrowDown":
            moverAbajoCapipepo()
            break;
        case "ArrowRight":
            moverDerechaCapipepo()
            break;
        case "ArrowLeft":
            moverIzquierdaCapipepo()
            break;
        default:
            
            break;
    }
}

function iniciarMapa(){
    /* mapa.width = 320
    mapa.height = 240 */
    mascota_jugador_objeto = obtenerObjetoMascota(mascota_jugador)
    console.log(mascota_jugador_objeto, mascota_jugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascota_jugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
    
}

function revisarColision(enemigo){
    const arriba_enemigo = enemigo.y
    const abajo_enemigo = enemigo.y + enemigo.alto
    const derecha_enemigo = enemigo.x + enemigo.ancho
    const izquierda_enemigo = enemigo.x

    const arriba_mascota = mascota_jugador_objeto.y
    const abajo_mascota = mascota_jugador_objeto.y + mascota_jugador_objeto.alto
    const derecha_mascota = mascota_jugador_objeto.x + mascota_jugador_objeto.ancho
    const izquierda_mascota = mascota_jugador_objeto.x

    if (
        abajo_mascota < arriba_enemigo || 
        arriba_mascota > abajo_enemigo || 
        derecha_mascota < izquierda_enemigo || 
        izquierda_mascota > derecha_enemigo
    ) {
        return
    }
    detenerMovimiento()
    console.log("se detecto una colision");
    section_seleccionar_ataque.style.display = "flex"
    section_ver_mapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)

}

window.addEventListener("load", iniciarJuego)