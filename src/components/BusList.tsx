import React, { useState, useEffect } from 'react';
import { Bus } from '../utils/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const BusList: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);

  const getBuses = async() => {
    fetch('http://localhost:8080/bus')
      .then((response) => response.json())
      .then((data) => setBuses(data));
  }

  useEffect(() => {
    getBuses();
  }, []);

  const formatDate = (date: string) => {
    let fecha = new Date(date);

    let fechaFormateada = new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(fecha);
    return fechaFormateada;
  }

  return (
    <div>
      <Typography variant='h4'>Lista de Buses</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Número de Bus</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Características</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map(bus => (
              <TableRow key={bus.id}>
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.numeroDeBus}</TableCell>
                <TableCell>{bus.placa}</TableCell>
                <TableCell>{bus.caracteristicas}</TableCell>
                <TableCell>{bus.marca.nombre}</TableCell>
                <TableCell>{formatDate(bus.fechaCreacion)}</TableCell>
                <TableCell>{bus.activo ? 'Activo' : 'Inactivo'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BusList;
