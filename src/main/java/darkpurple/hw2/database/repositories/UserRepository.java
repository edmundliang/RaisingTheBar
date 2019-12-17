package darkpurple.hw2.database.repositories;

import darkpurple.hw2.database.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
    User findByResetToken(String resetToken);
}
