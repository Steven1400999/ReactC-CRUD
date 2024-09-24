import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { IEmpleado } from '../interfaces/IEmpleado';
import { appsettings } from '../settings/appsettings';
import 'chart.js/auto'; // Importa automáticamente los gráficos de Chart.js
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export function GraficaSueldos() {
    const [empleados, setEmpleados] = useState<IEmpleado[]>([]);

    const obtenerEmpleados = async () => {
        const response = await fetch(`${appsettings.apiUrl}Empleado/Lista`);
        if (response.ok) {
            const data = await response.json();
            setEmpleados(data);
        }
    };

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const data = {
        labels: empleados.map(empleado => empleado.nombre), 
        datasets: [
            {
                label: 'Sueldo',
                data: empleados.map(empleado => empleado.sueldo), 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)', 
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true, 
            },
        },
    };

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
        <Navbar color="faded" light >
            <NavbarBrand href="/" className="me-auto">
            Gestión de empleados
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="me-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">Inicio</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/nuevoempleado">
                            Nuevo Empleado
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/grafica">
                            Gráfica de Sueldos
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>

            <h3 className="text-center">Gráfica de Sueldos</h3>
            <Bar data={data} options={options} />
        </div>
    );
}
