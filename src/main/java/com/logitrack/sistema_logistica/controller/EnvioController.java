package com.logitrack.sistema_logistica.controller;

import com.logitrack.sistema_logistica.dto.EnvioRequestDTO;
import com.logitrack.sistema_logistica.model.Envio;
import com.logitrack.sistema_logistica.repository.EnvioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/envios")
public class EnvioController {

    @Autowired
    private EnvioRepository envioRepository; // Conectamos con la base de datos

    @PostMapping
    public ResponseEntity<Envio> crearEnvio(@RequestBody EnvioRequestDTO envioDto) {
        // 1. Creamos una instancia de la Entidad (Model)
        //if(true) throw new RuntimeException("Error de prueba en LogiTrack");//Ejemplo para proabr si falla
        Envio nuevoEnvio = new Envio();
        
        // 2. Pasamos los datos del DTO al Modelo
        nuevoEnvio.setDescripcion(envioDto.getDescripcion());
        nuevoEnvio.setDestino(envioDto.getDestino());
        nuevoEnvio.setEstado("PENDIENTE"); // Estado inicial por defecto

        // 3. Guardamos en la base de datos usando el repositorio
        Envio envioGuardado = envioRepository.save(nuevoEnvio);
        
        // 4. Devolvemos el objeto guardado (que ahora ya tiene un ID real)
        return ResponseEntity.ok(envioGuardado);
    }

    // Listar todos los envíos
    @GetMapping
    public ResponseEntity<List<Envio>> listarTodos() {
        // Buscamos todos los registros en la tabla de PostgreSQL
        List<Envio> listaEnvios = envioRepository.findAll();
        
        // Devolvemos la lista con un código 200 OK
        return ResponseEntity.ok(listaEnvios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Envio> actualizarEnvio(@PathVariable Long id, @RequestBody EnvioRequestDTO envioDto) {
        // Buscamos el envío existente, si no existe lanzamos un error
        Envio envioExistente = envioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el envío con ID: " + id));

        // Actualizamos los campos con lo que viene del DTO
        envioExistente.setDescripcion(envioDto.getDescripcion());
        envioExistente.setDestino(envioDto.getDestino());
        envioExistente.setEstado(envioDto.getPrioridad());

        Envio envioActualizado = envioRepository.save(envioExistente);
        return ResponseEntity.ok(envioActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarEnvio(@PathVariable Long id) {
        // Verificamos si existe antes de borrar
        if (!envioRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: No existe el envío con ID: " + id);
        }
        
        envioRepository.deleteById(id);
        return ResponseEntity.ok("Envío con ID " + id + " eliminado correctamente.");
    }
}