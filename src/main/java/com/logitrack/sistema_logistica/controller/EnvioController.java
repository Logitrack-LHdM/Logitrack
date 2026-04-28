package com.logitrack.sistema_logistica.controller;

import com.logitrack.sistema_logistica.model.Envio;
import com.logitrack.sistema_logistica.service.EnvioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/envios")
public class EnvioController {

    @Autowired
    private EnvioService envioService; // Llamamos al servicio, no al repositorio directamente

    // Endpoint para listar todos los envíos
    @GetMapping
    public ResponseEntity<List<Envio>> listarTodos() {
        // El controlador le pide la lista al Service
        List<Envio> envios = envioService.obtenerTodos();
        
        // Retornamos la lista con un estado 200 OK
        return ResponseEntity.ok(envios);
    }
}