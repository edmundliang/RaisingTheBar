package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByRole(String role);
}
