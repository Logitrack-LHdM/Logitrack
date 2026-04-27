package com.logitrack.sistema_logistica.controller;

import com.logitrack.sistema_logistica.model.Camion;
import com.logitrack.sistema_logistica.model.Chofer_Detalle;
import com.logitrack.sistema_logistica.model.Establecimiento;
import com.logitrack.sistema_logistica.repository.CamionRepository;
import com.logitrack.sistema_logistica.repository.Chofer_DetalleRepository;
import com.logitrack.sistema_logistica.repository.EstablecimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/catalogos")
public class CatalogoController {

    @Autowired
    private EstablecimientoRepository establecimientoRepository;

    @Autowired
    private Chofer_DetalleRepository choferDetalleRepository;

    @Autowired
    private CamionRepository camionRepository;

    // 1. Endpoint para llenar el combo de Origen y Destino
    @GetMapping("/establecimientos")
    public List<Establecimiento> getEstablecimientos() {
        return establecimientoRepository.findAll();
    }

    // 2. Endpoint para llenar el combo de Choferes
    @GetMapping("/choferes")
    public List<Chofer_Detalle> getChoferes() {
        return choferDetalleRepository.findAll();
    }

    // 3. Endpoint para llenar el combo de Camiones
    @GetMapping("/camiones")
    public List<Camion> getCamiones() {
        return camionRepository.findAll();
    }
}