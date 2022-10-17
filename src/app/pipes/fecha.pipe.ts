import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    //10-9-2022 20:58:57:394
        //  {{atencion.HC.dia }} {{atencion.HC.hora}}- {{atencion.HC.especialidad}} 
        let indice = value.indexOf(" ");
        let max_len= value.toString().length;
console.log(max_len);
        let fecha_extraida= value.substring(0, indice);
        let hora_extraida= value.substring((indice), (max_len-7) )
          return fecha_extraida+' '+hora_extraida;
           
        }
      

}
