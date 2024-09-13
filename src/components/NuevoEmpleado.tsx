import { ChangeEvent, useState } from "react"
import { IEmpleado } from "../interfaces/IEmpleado"
import { Button, Form } from "reactstrap"
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";



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
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Nuevo empleado</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <input type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Correo</Label>
                            <input type="text" name="correco" onChange={inputChangeValue} value={empleado.correco} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Sueldo</Label>
                            <input type="number" name="sueldo" onChange={inputChangeValue} value={empleado.sueldo} />
                        </FormGroup>

                    </Form>

                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>

                    <Button color="secondary" onClick={volver}>Volver</Button>

                </Col>

            </Row>


        </Container>

    )
}