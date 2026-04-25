package com.logitrack.sistema_logistica.dto;

import lombok.Data;

@Data
public class EnvioRequestDTO {
    private String descripcion;
    private String destino;
    private String prioridad; // ALTA, MEDIA, BAJA
    private String tipoGrano; // Maíz, Trigo, soja (según el informe)
    private Double pesoToneladas;
}