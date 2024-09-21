import { ChangeEvent, useState } from "react"
import { IEmpleado } from "../interfaces/IEmpleado"
import { Button, Form } from "reactstrap"
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";
import   './estilos.css';

const initialEmpleado = {
    nombre: "",
    correco: "",
    sueldo: 0
}

export function NuevoEmpleado() {

    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();


    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName, " ", inputValue)
        setEmpleado({ ...empleado, [inputName]: inputValue })

    }

    const guardar = async () => {

        const response = await fetch(`${appsettings.apiUrl}Empleado/Nuevo`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        })

        if (response.ok) {
            navigate("/");


        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error, nose guardo",
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
                    <h4 className="text-center">Nuevo empleado</h4>
                    <hr />
                    <div className="d-flex justify-content-center" >
                    <Form>
                        <FormGroup>
                            <Label className="me-2">Nombre</Label>
                            <input type="text" name="nombre" className="custom-input"  onChange={inputChangeValue} value={empleado.nombre} />
                        </FormGroup>

                        <FormGroup>
                            <Label className="me-2">Correo</Label>
                            <input type="text" name="correco" className="custom-input" onChange={inputChangeValue} value={empleado.correco} />
                        </FormGroup>

                        <FormGroup>
                            <Label className="me-2">Sueldo </Label>
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