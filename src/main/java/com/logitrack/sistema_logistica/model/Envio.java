package com.logitrack.sistema_logistica.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity // Esto le dice a Spring: "Crea una tabla basada en esta clase"
@Data   // Esto (de Lombok) crea los Getters y Setters automáticamente
public class Envio {

    @Id // Indica que este atributo es la clave primaria (Primary Key) de la tabla
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura el ID para que sea autoincremental (la base de datos le suma 1 cada vez)
    private Long id; // Identificador único del envío (usamos Long por capacidad de almacenamiento)

    private String descripcion;
    private String destino;
    private String estado; // Ejemplo: "Pendiente", "En viaje", "Entregado"
}
