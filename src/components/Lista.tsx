import { useEffect, useState } from "react"
import { IEmpleado } from "../interfaces/IEmpleado"
import { Button, Form } from "reactstrap"
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";


export function Lista(){


    return(
        <h1>Componente lista</h1>
    )
}