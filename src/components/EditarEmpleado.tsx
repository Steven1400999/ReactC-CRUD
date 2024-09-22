import { ChangeEvent, useEffect, useState } from "react"
import { IEmpleado } from "../interfaces/IEmpleado"
import { Button, Form } from "reactstrap"
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";
import   './estilos.css';

const initialEmpleado = {
    idEmpleado: 0,
    nombre: "",
    correo: "",
    sueldo: 0
}

export function EditarEmpleado() {


    const { id } = useParams<{ id: string }>()
    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerEmpleado = async () => {
            const response = await fetch(`${appsettings.apiUrl}Empleado/Obtener/${id}`)
            if (response.ok) {
                const data = await response.json();
                setEmpleado(data);
            }
        }


        obtenerEmpleado()

    }, [])

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;
        setEmpleado({ ...empleado, [inputName]: inputValue })

    }

    const guardar = async () => {

        const response = await fetch(`${appsettings.apiUrl}Empleado/Editar`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        })

        if(response.ok){
            navigate("/");


        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error, no se editó el empleado",
                footer: '<a href="#">Why do I have this issue?</a>'
              }); 

        }


    }

    const volver = () => {
        navigate("/");

    }

    return (
        <Container className="mt-2">
        <Row>
            <Col sm={{ size: 8, offset: 2 }}>
                <h4>Editar empleado</h4>
                <hr />
                <div className="d-flex justify-content-center" >
                <Form>
                    <FormGroup>
                        <Label className="me-2">Nombre</Label>
                        <input type="text" name="nombre" className="custom-input" onChange={inputChangeValue} value={empleado.nombre} />
                    </FormGroup>

                    <FormGroup>
                        <Label className="me-2">Correo</Label>
                        <input type="text" name="correo" className="custom-input" onChange={inputChangeValue} value={empleado.correo} />
                    </FormGroup>

                    <FormGroup>
                        <Label className="me-2">Sueldo</Label>
                        <input type="number" name="sueldo" className="custom-input" onChange={inputChangeValue} value={empleado.sueldo} />
                    </FormGroup>

                </Form>
                </div>

                <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>

                <Button color="outline-secondary" onClick={volver}>Volver</Button>

            </Col>

        </Row>


    </Container>
)
}