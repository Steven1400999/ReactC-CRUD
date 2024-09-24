import { ChangeEvent, useEffect, useState } from "react";
import { IEmpleado } from "../interfaces/IEmpleado";
import { IEmpresa } from "../interfaces/IEmpresa"; // Asegúrate de tener la interfaz de Empresa
import { Button, Collapse, Form, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";
import './estilos.css';

const initialEmpleado: IEmpleado = {
    idEmpleado: 0,
    nombre: "",
    correo: "",
    sueldo: 0,
    idEmpresa: 0 // Asegúrate de incluir idEmpresa aquí
};

export function EditarEmpleado() {
    const { id } = useParams<{ id: string }>();
    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const [empresas, setEmpresas] = useState<IEmpresa[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerEmpleado = async () => {
            const response = await fetch(`${appsettings.apiUrl}Empleado/Obtener/${id}`);
            if (response.ok) {
                const data = await response.json();
                setEmpleado(data);
            }
        };

        const obtenerEmpresas = async () => {
            const response = await fetch(`${appsettings.apiUrl}Empresa/Lista`);
            if (response.ok) {
                const data = await response.json();
                setEmpresas(data);
            }
        };

        obtenerEmpleado();
        obtenerEmpresas(); // Cargar la lista de empresas
    }, [id]);

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputName = event.target.name;
        const inputValue = inputName === "idEmpresa" ? Number(event.target.value) : event.target.value;
        setEmpleado({ ...empleado, [inputName]: inputValue });
    };

    const guardar = async () => {
        const response = await fetch(`${appsettings.apiUrl}Empleado/Editar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado),
        });

        if (response.ok) {
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error, no se editó el empleado",
                footer: '<a href="#">Why do I have this issue?</a>',
            });
        }
    };

    const volver = () => {
        navigate("/");
    };

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <Container className="mt-2">
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="me-auto">Gestión de empleados</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="me-2" />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/">Inicio</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/nuevoempleado">Nuevo Empleado</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/grafica">Gráfica de Sueldos</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Editar empleado</h4>
                    <hr className="hr1" />
                    <div className="d-flex justify-content-center">
                        <Form>
                            <FormGroup>
                                <Label className="me-2">Nombre</Label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="custom-input"
                                    onChange={inputChangeValue}
                                    value={empleado.nombre}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="me-2">Correo</Label>
                                <input
                                    type="text"
                                    name="correo"
                                    className="custom-input"
                                    onChange={inputChangeValue}
                                    value={empleado.correo}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="me-2">Sueldo</Label>
                                <input
                                    type="number"
                                    name="sueldo"
                                    className="custom-input"
                                    onChange={inputChangeValue}
                                    value={empleado.sueldo}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="me-2">Empresa</Label>
                                <select
                                    name="idEmpresa"
                                    className="custom-input"
                                    onChange={inputChangeValue}
                                    value={empleado.idEmpresa || 0} // Muestra 0 si no hay empresa
                                >
                                    <option value={0}>Seleccione una empresa</option>
                                    {empresas.map(empresa => (
                                        <option key={empresa.idEmpresa} value={empresa.idEmpresa}>
                                            {empresa.nombre}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Form>
                    </div>

                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="outline-secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    );
}
