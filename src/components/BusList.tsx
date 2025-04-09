import React, { useState, useEffect } from 'react';
import { ApiResponse, Bus } from '../utils/types';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import DialogBus from './DialogBus';

const BusList: React.FC = () => {
  const [buses, setBuses] = useState<ApiResponse<Bus>>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const [open, setOpen] = useState(false);
  const [idBus, setIdBus] = useState(0);

  const getBuses = async(page: number, rowsPerPage: number) => {
    fetch(`http://localhost:8080/bus?size=${rowsPerPage}&page=${page}`,{
      method: 'GET',
      //credenciales en base 64
      headers: {
        'Authorization': 'Basic ' + btoa('user:password'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBuses(data)
        setTotalElements(data.totalElements)
      });
  }

  useEffect(() => {
    getBuses(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (id: number) => {
    setIdBus(id);
    setOpen(true);
  }

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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'}}>
      <Typography variant='h4' sx={{marginTop: '1rem'}}>Lista de Buses</Typography>
      <div style={{width: '80%'}}>
      <TableContainer component={Paper} sx={{maxHeight: '75vh'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Número de Bus</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Características</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses?.content.map(bus => (
              <TableRow key={bus.id}>
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.numeroDeBus}</TableCell>
                <TableCell>{bus.placa}</TableCell>
                <TableCell>{bus.caracteristicas}</TableCell>
                <TableCell>{bus.marca.nombre}</TableCell>
                <TableCell>{formatDate(bus.fechaCreacion)}</TableCell>
                <TableCell>{bus.activo ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell><Button variant='contained' onClick={() => handleOpenDialog(bus.id)}>Ver Detalle</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
        <DialogBus open = {open} setOpen={setOpen} idBus={idBus}></DialogBus>
    </div>
  );
};

export default BusList;
