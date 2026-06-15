import java.sql.Connection;
import java.sql.DriverManager;

public class TestDB {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://dpg-c8nolepo3t8c73d1771g-a.oregon-postgres.render.com:5432/catalogx_db?ssl=true&sslmode=require&sslfactory=org.postgresql.ssl.NonValidatingFactory";
        String user = "catalogx_db_user";
        String pass = "9HVDrIDTZ26bjgTnRl324PbSMnImERDZ";
        try {
            System.out.println("Connecting...");
            Connection conn = DriverManager.getConnection(url, user, pass);
            System.out.println("Connected!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
