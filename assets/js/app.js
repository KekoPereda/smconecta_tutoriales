const btnDocentes = document.getElementById("btnDocentes");
const btnEstudiantes = document.getElementById("btnEstudiantes");
const docentes = document.getElementById("tutorialesDocentes");
const estudiantes = document.getElementById("tutorialesEstudiantes");
const tituloCategoria = document.querySelector(".categoria");


btnDocentes.addEventListener("click", () => {
    docentes.style.display = "block";
    estudiantes.style.display = "none";
    btnDocentes.style.backgroundColor = "#3A97E1";
    btnEstudiantes.style.backgroundColor = "#8a8a8c";
    tituloCategoria.textContent = "Videotutoriales para docentes";

});

btnEstudiantes.addEventListener("click", () => {
    docentes.style.display = "none";
    estudiantes.style.display = "block";
    btnEstudiantes.style.backgroundColor = "#3A97E1";
    btnDocentes.style.backgroundColor = "#8a8a8c";
    tituloCategoria.textContent = "Videotutoriales para estudiantes";
});

// Cargar video en modal dinámicamente
document.querySelectorAll(".abrir-modal-video").forEach((enlace) => {
    enlace.addEventListener("click", function () {
        const titulo = this.getAttribute("data-title");
        const videoURL = this.getAttribute("data-video");

        document.getElementById("modalTitulo").textContent = titulo;
        document.getElementById("videoIframe").src = videoURL;
    });
});







fetch('assets/data/tutoriales.json')
    .then(res => res.json())
    .then(data => {
        const docentesRow = document.querySelector('#tutorialesDocentes .row');
        const estudiantesRow = document.querySelector('#tutorialesEstudiantes .row');

        data.forEach(tutorial => {
            const tarjeta = document.createElement('div');
            tarjeta.className = "col-md-6 col-lg-4 col-sm-12 d-flex tarjetita";

            tarjeta.innerHTML = `
                <div class="card mb-5">
                    <a href="#" class="abrir-modal-video"
                    data-bs-toggle="modal"
                    data-bs-target="#videoModal"
                    data-title="${tutorial.titulo}"
                    data-video="${tutorial.video}">
                    <div class="ficha">
                        <img src="assets/img/play2.svg" class="btn_play" alt="Play">
                        <img src="${tutorial.imagen}" class="card-img-top" alt="${tutorial.titulo}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${tutorial.titulo}</h5>
                        <p class="card-text">${tutorial.descripcion}</p>
                    </div>
                    </a>
                </div>
                `;


            if (tutorial.tipo === "docente") {
                docentesRow.appendChild(tarjeta);
            } else {
                estudiantesRow.appendChild(tarjeta);
            }
        });

        // Reasignar eventos a los enlaces para abrir modal
        document.querySelectorAll('.abrir-modal-video').forEach(enlace => {
            enlace.addEventListener('click', function () {
                const titulo = this.getAttribute('data-title');
                const videoURL = this.getAttribute('data-video');

                document.getElementById('modalTitulo').textContent = titulo;
                document.getElementById('videoIframe').src = videoURL;
            });
        });
    });

// Limpiar iframe al cerrar modal
document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('videoIframe').src = '';
});

function mostrarSeccion(seccion) {
    docentes.style.opacity = 0;
    estudiantes.style.opacity = 0;

    setTimeout(() => {
        docentes.style.display = seccion === "docente" ? "block" : "none";
        estudiantes.style.display = seccion === "estudiante" ? "block" : "none";

        setTimeout(() => {
            (seccion === "docente" ? docentes : estudiantes).style.opacity = 1;
        }, 100);
    }, 200);
}