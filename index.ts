import app from './server';
import PersonRouter from "./routes/personRouter";
import PetRouter from "./routes/petRouter";

// Rutas
app.use('/person', PersonRouter);
app.use('/pet', PetRouter);

// Servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3000');
}
);