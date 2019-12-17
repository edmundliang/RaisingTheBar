
package darkpurple.hw2.database.entity;

import org.springframework.data.annotation.Id;

public class Glass {
         
    private String name;
    
    public String getType() {
        return name;
    }
    
    public void setType(String type) {
        this.name = type;
    }
    
    
    
}
