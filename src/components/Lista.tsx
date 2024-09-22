import { useEffect, useState } from "react"
import { IEmpleado } from '../interfaces/IEmpleado';
import { Button, Table } from "reactstrap"
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";


export function Lista() {

    const [empleados, setEmpleados] = useState<IEmpleado[]>([]);

    const obtenerEmpleado = async () => {
        const response = await fetch(`${appsettings.apiUrl}Empleado/Lista`)
        if (response.ok) {
            const data = await response.json();
            setEmpleados(data);
        }
    }


    useEffect(() => {


        obtenerEmpleado()


    }, [])

    const Eliminar = (id: number) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Eliminar empleado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await fetch(`${appsettings.apiUrl}Empleado/Eliminar/${id}`, { method: "DELETE" })
                if (response.ok) await obtenerEmpleado()


            }
        });


    }



    return (
        <Container className="mt-2" >
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4 className="text-center" >Lista de empleados</h4>
                    <hr />
                    <div className="d-flex justify-content-center" >
                        <Link className="btn btn-success btn-lg mb-3 " to="/nuevoempleado" >Nuevo Empleado</Link>
                    </div>


                    <Table bordered striped hover responsive >
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Sueldo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                empleados.map((item) => (
                                    <tr key={item.idEmpleado}>
                                        <td>{item.nombre}</td>
                                        <td>{item.correo}</td>
                                        <td>{item.sueldo}</td>
                                        <td>
                                            <Link className="btn  btn-outline-primary  me-3  " to={`/editarempleado/${item.idEmpleado}`} >Editar</Link>
                                            <Button  color="outline-danger" onClick={() => { Eliminar(item.idEmpleado!) }}>Eliminar</Button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>




                </Col>

            </Row>


        </Container>)
}