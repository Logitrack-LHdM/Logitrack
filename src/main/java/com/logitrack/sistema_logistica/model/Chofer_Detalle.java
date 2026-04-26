package com.logitrack.sistema_logistica.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Choferes_Detalle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chofer_Detalle {

    @Id
    private Integer id_chofer; 

   
    @OneToOne(fetch = FetchType.EAGER)
    @MapsId 
    @JoinColumn(name = "id_chofer")
    private Persona persona_asociada; 

    @Column(nullable = false, length = 50)
    private String nro_licencia;

    @Column(nullable = false)
    private LocalDate vto_licencia;

    @Column(nullable = false)
    private LocalDate vto_linti;
}