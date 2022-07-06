require('colors');

const {guardarDB,leerDB} = require("./helpers/guardarArchivo");
const  {inquirerMenu,pausa, leerInput, listadoTareasBorrar,confirmar,mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main =async () => {

        let opt = '';
        const tareas = new Tareas();

        const tareasDB = leerDB();

        if(tareasDB){   // Cargar tareas
            tareas.cargarTareasFromArray(tareasDB);
        }

    do{
    // Imprimir el menu

    opt = await inquirerMenu();

    switch (opt){

        case '1':
            // crear opcion
            const desc = await leerInput('Descripcion: ');
            tareas.crearTarea(desc);
    break;

        case '2':
            tareas.listadoCompleto();
        break;

        case '3': // Listar completadas
            tareas.ListarPendientesCompletadas(true);
            break;

        case '4': // Listar pendientes
            tareas.ListarPendientesCompletadas(false);
            break;

        case '5': // Completado o pendiente
         const ids = await  mostrarListadoChecklist(tareas.listadoArr);
            tareas.toggleCompletadas(ids);
            break;

        case '6': // Borrar
            const id = await listadoTareasBorrar(tareas.listadoArr);
            if( id!=='0'){
                const ok = await confirmar('¿Estas seguro?');
                if (ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada');

                }
            }
            break;
    }

   guardarDB(tareas.listadoArr);

    await pausa();

    } while( opt !== '0');



}

main();

