const Tarea = require('./tarea');

/**
 * _Listado
 *
 *
 */

class Tareas {

    _Listado = {
        'abc': 123
    };



    get listadoArr(){

        const listado = [] ;
        Object.keys(this._Listado).forEach(  key =>{
            const tarea = this.listado[key];
            listado.push(tarea);

        })

        return  listado;

    }

    constructor() {
        this._Listado = {};
    }
    borrarTarea (id = ''){

        if(this._Listado[id]){
            delete this._Listado[id];
        }
    }



    cargarTareasFromArray(tareas  = [ ]){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

        this._Listado[tarea.id]= tarea;
}

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._Listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) =>{
            const idx = `${i +1.}.green`;
            const { desc,completadoEn} = tarea;
            const estado = ( completadoEn )
                            ?'Completada'.green
                            : 'Pendiente'.red;
            console.log(`${idx} ${desc}::${estado}`);

        });

    }

    ListarPendientesCompletadas ( completadas = true){

        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea, i) =>{
            const idx = `${i +1.}.green`;
            const { desc,completadoEn} = tarea;
            const estado = ( completadoEn )
                ?'Completada'.green
                : 'Pendiente'.red;
            if (completadoEn){
                // mostrar completadas
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green } ${desc}::${completadoEn.blue}`);
                }
            }else {
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc}::${estado}`);
                }
            }

        });

    }
    toggleCompletadas( ids = []){

        ids.forEach(id =>{
            const tarea = this._Listado[id];
            if(!tarea.completadoEn  ){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
        if (!ids.includes(tarea.id) ){
           this._listado[tarea.id].completadoEn = null;

        }

        });


    }



}

module.exports = Tareas;