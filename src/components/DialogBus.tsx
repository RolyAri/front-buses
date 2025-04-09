import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Bus } from "../utils/types";
import { Card, CardContent, Typography } from "@mui/material";

interface DialogProps {
    open : boolean,
    setOpen : (value: boolean) => void,
    idBus: number
}

const DialogBus: React.FC<DialogProps> = ({open, setOpen, idBus}) => {
    const [bus, setBus] = React.useState<Bus | null>(null);

    const handleClose = () => {
        setOpen(false);
    };

    const getBusById = async (id: number) => {
        await fetch(`http://localhost:8080/bus/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setBus(data);
        });
    }

    React.useEffect(() => {
        if(idBus != 0) {
            getBusById(idBus)
        }
    }, [idBus])
    
    return (
    <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            
            <DialogTitle>
                {`${bus?.marca.nombre} ${bus?.placa}`}
            </DialogTitle>
            <DialogContent dividers>
                <Card sx={{minWidth: '400px'}}>
                    <CardContent sx={{backgroundColor: 'action.selected'}}>
                        <Typography variant="h5" component="div">{bus?.placa}</Typography>
                        <Typography variant="body2" color="text.secondary">{bus?.caracteristicas}</Typography>
                        <Typography variant="body2" color="text.secondary">{`${bus?.numeroDeBus} ${bus?.activo ? 'Activo' : 'Inactivo'}`}</Typography>
                        <Typography variant="body2" color="text.secondary">{`${bus?.marca.nombre} | ${bus?.marca.descripcion}`}</Typography>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}

export default DialogBus