export interface IEmpleado {

    idEmpleado?: number,
    nombre: string,
    correo: string,
    sueldo:number,
    idEmpresa: number;
    idEmpresaNavigation?: {
        idEmpresa: number;
        nombre: string;
    };
}