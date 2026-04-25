// Este es el esqueleto para que el pipeline no tire error
public class LogiTrackBase {
    public boolean login(String u, String p) { return true; }
    public boolean crearEnvio() { return true; }
    public String listarEnvios() { return "Tabla con datos"; }
}
